"use client";

import { useState } from "react";
import {
  Form,
  Card,
  Button,
  Input,
  InputGroup,
  TextArea,
  TextField,
  Label,
  Select,
  ListBox,
  Spinner,
  Avatar,
  Chip,
} from "@heroui/react";
import {
  Factory,
  Globe,
  Persons,
  Pin,
  ArrowUpFromLine,
  Pencil,
  CircleCheck,
  TrashBin,
} from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { createCompany } from "@/lib/actions/companies";

/* ----------------------------- constants ----------------------------- */

const INDUSTRY_OPTIONS = [
  { key: "Technology", label: "Technology" },
  { key: "Finance", label: "Finance" },
  { key: "Healthcare", label: "Healthcare" },
  { key: "E-commerce", label: "E-commerce" },
  { key: "Education", label: "Education" },
];

const EMPLOYEE_RANGES = [
  { key: "1-10 employees", label: "1-10 employees" },
  { key: "11-50 employees", label: "11-50 employees" },
  { key: "51-200 employees", label: "51-200 employees" },
  { key: "201-500 employees", label: "201-500 employees" },
  { key: "500+ employees", label: "500+ employees" },
];

const STATUS_META = {
  Approved: {
    color: "success",
    note: "Your company is verified. You can post jobs.",
  },
  Pending: {
    color: "warning",
    note: "We're reviewing your profile. You can post jobs once it's approved.",
  },
  Rejected: {
    color: "danger",
    note: "Your profile was rejected. Update the details and save again.",
  },
};

const DESCRIPTION_LIMIT = 500;
const MAX_LOGO_SIZE = 5 * 1024 * 1024;

const EMPTY_FORM = {
  name: "",
  industry: "Technology",
  website: "",
  location: "",
  employeeCount: "1-10 employees",
  logo: "",
  description: "",
};

/* ------------------------------ helpers ------------------------------ */

// ImgBB upload (needs NEXT_PUBLIC_IMAGE_API in .env.local)
async function uploadToImgBB(file) {
  const body = new FormData();
  body.append("image", file);
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_API}`,
    { method: "POST", body }
  );
  const data = await res.json();
  if (!data.success) throw new Error("ImgBB upload failed");
  return data.data.url;
}

const toHref = (url) =>
  url ? (url.startsWith("http") ? url : `https://${url}`) : undefined;

// Reusable select for HeroUI v3
function AppSelect({ label, items, value, onChange, name, isRequired, placeholder = "Select" }) {
  return (
    <Select
      name={name}
      isRequired={isRequired}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    >
      <Label>{label}</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {items.map((item) => (
            <ListBox.Item key={item.key} id={item.key} textValue={item.label}>
              {item.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}

// A titled block inside the form, so the long form reads as clear sections
function FormSection({ title, description, children }) {
  return (
    <section className="grid grid-cols-1 gap-x-8 gap-y-4 py-6 first:pt-0 last:pb-0 md:grid-cols-[220px_1fr]">
      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted">{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

// One fact in the profile view
function InfoTile({ icon: Icon, label, children }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-default/30 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted">{label}</p>
        <div className="truncate text-sm font-medium text-foreground">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------ component ----------------------------- */

export default function CompanyManagementView({ initialCompanyData = null }) {
  const [company, setCompany] = useState(initialCompanyData);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [formData, setFormData] = useState(EMPTY_FORM);

  const setField = (key) => (value) => setFormData((prev) => ({ ...prev, [key]: value }));
  const onInput = (key) => (e) => setField(key)(e.target.value);

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file
    if (!file) return;

    setUploadError("");
    if (file.size > MAX_LOGO_SIZE) {
      setUploadError("Logo is larger than 5MB. Choose a smaller image.");
      return;
    }

    try {
      setIsUploading(true);
      const uploadedUrl = await uploadToImgBB(file);
      setFormData((prev) => ({ ...prev, logo: uploadedUrl }));
    } catch (err) {
      console.error(err);
      setUploadError("Upload failed. Check your connection and try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Only opens the form. No API call here.
  const handleOpenEdit = () => {
    setFormData(
      company
        ? {
            name: company.name || "",
            industry: company.industry || "Technology",
            website: company.website || "",
            location: company.location || "",
            employeeCount: company.employeeCount || "1-10 employees",
            logo: company.logo || "",
            description: company.description || "",
          }
        : EMPTY_FORM
    );
    setUploadError("");
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        status: company?.status || "Pending",
      };

      const isUpdate = Boolean(company?._id);

      // shudhu createCompany use hocche
      const result = await createCompany(isUpdate ? { ...payload, _id: company._id } : payload);

      console.log("API result:", result);

      if (!result || result.success === false || result.error) {
        throw new Error(result?.message || result?.error || "Failed to save company");
      }

      // create hole insertedId ashbe; backend { data: {...} } dile seta nao
      const savedId =
        result.insertedId || result.data?._id || result.company?._id || company?._id;

      if (!isUpdate && !savedId) {
        throw new Error("Server did not return the new company id");
      }

      setCompany({ ...payload, _id: savedId });
      setIsEditing(false);
      toast.success(isUpdate ? "Company updated successfully!" : "Company registered successfully!");
    } catch (error) {
      console.error("Error saving company:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ------------- SCENARIO 1: NO COMPANY YET / EDITING MODE ------------- */
  if (!company || isEditing) {
    return (
      <Form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <Factory className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              {isEditing ? "Edit company profile" : "Register your company"}
            </h1>
            <p className="text-sm text-muted">
              Candidates see these details on every job you post.
            </p>
          </div>
        </div>

        <Card className="w-full">
          <Card.Content className="divide-y divide-border">
            <FormSection
              title="Basic information"
              description="The name and category people will find you by."
            >
              <TextField isRequired name="name">
                <Label>Company name</Label>
                <Input
                  variant="secondary"
                  placeholder="e.g. Acme Corp"
                  value={formData.name}
                  onChange={onInput("name")}
                />
              </TextField>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <AppSelect
                  isRequired
                  name="industry"
                  label="Industry"
                  placeholder="Select industry"
                  items={INDUSTRY_OPTIONS}
                  value={formData.industry}
                  onChange={setField("industry")}
                />
                <AppSelect
                  isRequired
                  name="employeeCount"
                  label="Company size"
                  placeholder="Select size"
                  items={EMPLOYEE_RANGES}
                  value={formData.employeeCount}
                  onChange={setField("employeeCount")}
                />
              </div>
            </FormSection>

            <FormSection
              title="Online presence"
              description="Where your company is based and where candidates can learn more."
            >
              <TextField isRequired name="website">
                <Label>Website</Label>
                <InputGroup variant="secondary">
                  <InputGroup.Prefix>
                    <Globe className="h-4 w-4 text-muted" />
                    <span className="text-xs text-muted">https://</span>
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    placeholder="www.company.com"
                    value={formData.website}
                    onChange={onInput("website")}
                  />
                </InputGroup>
              </TextField>

              <TextField isRequired name="location">
                <Label>Location</Label>
                <InputGroup variant="secondary">
                  <InputGroup.Prefix>
                    <Pin className="h-4 w-4 text-muted" />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={onInput("location")}
                  />
                </InputGroup>
              </TextField>
            </FormSection>

            <FormSection
              title="Logo"
              description="A square image works best. PNG or JPG, up to 5MB."
            >
              <div className="flex items-center gap-4">
                <label
                  className={`relative flex h-24 w-24 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-default/40 transition-colors hover:bg-default/60 ${
                    isUploading ? "pointer-events-none" : ""
                  }`}
                >
                  {formData.logo ? (
                    <img src={formData.logo} alt="Company logo" className="h-full w-full object-cover" />
                  ) : (
                    <ArrowUpFromLine className="h-6 w-6 text-muted" />
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/70">
                      <Spinner size="sm" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                    disabled={isUploading}
                  />
                </label>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    {isUploading
                      ? "Uploading..."
                      : formData.logo
                      ? "Click the logo to replace it"
                      : "Click the box to upload a logo"}
                  </p>
                  {formData.logo && !isUploading && (
                    <Button
                      type="button"
                      size="sm"
                      variant="danger-soft"
                      onPress={() => setFormData((prev) => ({ ...prev, logo: "" }))}
                    >
                      <TrashBin className="h-4 w-4" />
                      Remove logo
                    </Button>
                  )}
                  {uploadError && <p className="text-xs text-danger">{uploadError}</p>}
                </div>
              </div>
            </FormSection>

            <FormSection
              title="About"
              description="Describe what you do and what it's like to work with you."
            >
              <TextField isRequired name="description">
                <Label>Description</Label>
                <TextArea
                  variant="secondary"
                  rows={5}
                  maxLength={DESCRIPTION_LIMIT}
                  placeholder="Tell us about your company's mission and culture..."
                  value={formData.description}
                  onChange={onInput("description")}
                />
                <p className="mt-1 text-right text-xs text-muted">
                  {formData.description.length}/{DESCRIPTION_LIMIT}
                </p>
              </TextField>
            </FormSection>
          </Card.Content>
        </Card>

        {/* Actions */}
        <div className="sticky bottom-4 z-10 flex items-center justify-end gap-3 rounded-2xl border border-border bg-background/90 p-3 backdrop-blur">
          {isEditing && (
            <Button type="button" variant="secondary" onPress={() => setIsEditing(false)}>
              Cancel
            </Button>
          )}
          <Button type="submit" variant="primary" isPending={isSubmitting} isDisabled={isUploading}>
            {isSubmitting ? <Spinner color="current" size="sm" /> : <CircleCheck className="h-4 w-4" />}
            {isEditing ? "Save changes" : "Register company"}
          </Button>
        </div>
      </Form>
    );
  }

  /* ----------------- SCENARIO 2: COMPANY PROFILE VIEW ------------------ */
  const websiteHref = toHref(company.website);
  const status = STATUS_META[company.status] ? company.status : "Pending";

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <Card className="w-full overflow-hidden p-0">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-br from-accent/30 via-accent/10 to-transparent" />

        <Card.Content className="space-y-8 px-6 pb-6 pt-0">
          {/* Identity row: logo overlaps the cover */}
          <div className="-mt-12 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <Avatar className="h-24 w-24 rounded-2xl border-4 border-background bg-default shadow-sm">
                <Avatar.Image src={company.logo} alt={company.name} />
                <Avatar.Fallback>
                  <Factory className="h-8 w-8 text-muted" />
                </Avatar.Fallback>
              </Avatar>
              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-semibold text-foreground">{company.name}</h1>
                  <Chip color={STATUS_META[status].color} variant="soft" className="font-medium">
                    {status}
                  </Chip>
                </div>
                <p className="text-sm text-muted">
                  {[company.industry, company.location].filter(Boolean).join(", ")}
                </p>
              </div>
            </div>

            <Button variant="secondary" onPress={handleOpenEdit}>
              <Pencil className="h-4 w-4" />
              Edit details
            </Button>
          </div>

          {/* Status note */}
          <p className="rounded-xl border border-border bg-default/30 px-4 py-3 text-sm text-foreground/80">
            {STATUS_META[status].note}
          </p>

          {/* Key facts */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <InfoTile icon={Globe} label="Website">
              {websiteHref ? (
                <a
                  href={websiteHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline"
                >
                  {company.website}
                </a>
              ) : (
                "Not added"
              )}
            </InfoTile>

            <InfoTile icon={Persons} label="Company size">
              {company.employeeCount || "Not added"}
            </InfoTile>

            <InfoTile icon={Pin} label="Location">
              {company.location || "Not added"}
            </InfoTile>
          </div>

          {/* About */}
          <div>
            <h2 className="mb-2 text-base font-semibold text-foreground">About {company.name}</h2>
            <p className="max-w-prose whitespace-pre-line text-sm leading-relaxed text-foreground/80">
              {company.description || "No description yet. Use Edit details to add one."}
            </p>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}