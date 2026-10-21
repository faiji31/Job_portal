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
} from "@gravity-ui/icons";

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

// ImgBB upload (needs NEXT_PUBLIC_IMGBB_KEY in .env.local)
async function uploadToImgBB(file) {
  const body = new FormData();
  body.append("image", file);
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    { method: "POST", body }
  );
  const data = await res.json();
  if (!data.success) throw new Error("ImgBB upload failed");
  return data.data.url;
}

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

export default function CompanyManagementView({ initialCompanyData = null }) {
  const [company, setCompany] = useState(initialCompanyData);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    industry: "Technology",
    website: "",
    location: "",
    employeeCount: "1-10 employees",
    logo: "",
    description: "",
  });

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Max file size is 5MB.");
      return;
    }

    try {
      setIsUploading(true);
      const uploadedUrl = await uploadToImgBB(file);
      setFormData((prev) => ({ ...prev, logo: uploadedUrl }));
    } catch (err) {
      console.error(err);
      alert("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleOpenEdit = () => {
    if (company) {
      setFormData({
        name: company.name || "",
        industry: company.industry || "Technology",
        website: company.website || "",
        location: company.location || "",
        employeeCount: company.employeeCount || "1-10 employees",
        logo: company.logo || "",
        description: company.description || "",
      });
    }
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // TODO: replace with your real API call
      const savedCompany = {
        ...formData,
        status: company?.status || "Pending",
      };
      setCompany(savedCompany);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving company:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusChip = (status = "Pending") => {
    const statusMap = {
      Approved: "success",
      Pending: "warning",
      Rejected: "danger",
    };
    return (
      <Chip color={statusMap[status] || "default"} variant="soft" className="capitalize font-medium">
        {status}
      </Chip>
    );
  };

  // --- SCENARIO 1: NO COMPANY REGISTERED / EDITING MODE ---
  if (!company || isEditing) {
    return (
      <Form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-6">
        <Card className="w-full">
          <Card.Header className="flex-row items-center gap-3">
            <Factory className="w-5 h-5 text-accent" />
            <div className="flex flex-col">
              <Card.Title>{isEditing ? "Edit Company Profile" : "Register New Company"}</Card.Title>
              <Card.Description>
                Enter your business details to start hiring on HireLoop.
              </Card.Description>
            </div>
          </Card.Header>

          <Card.Content className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField isRequired name="name">
                <Label>Company Name</Label>
                <Input
                  variant="secondary"
                  placeholder="e.g. Acme Corp"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </TextField>

              <AppSelect
                isRequired
                name="industry"
                label="Industry / Category"
                placeholder="Select industry"
                items={INDUSTRY_OPTIONS}
                value={formData.industry}
                onChange={(val) => setFormData({ ...formData, industry: val })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField isRequired name="website">
                <Label>Website URL</Label>
                <InputGroup variant="secondary">
                  <InputGroup.Prefix>
                    <span className="text-muted text-xs">https://</span>
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    placeholder="www.company.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </InputGroup>
              </TextField>

              <TextField isRequired name="location">
                <Label>Location</Label>
                <InputGroup variant="secondary">
                  <InputGroup.Prefix>
                    <Pin className="w-4 h-4 text-muted" />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </InputGroup>
              </TextField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AppSelect
                isRequired
                name="employeeCount"
                label="Employee Count Range"
                placeholder="Select employee range"
                items={EMPLOYEE_RANGES}
                value={formData.employeeCount}
                onChange={(val) => setFormData({ ...formData, employeeCount: val })}
              />

              {/* Logo Upload */}
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Company Logo</span>
                <div className="flex items-center gap-3">
                  <label className="relative flex flex-col items-center justify-center w-20 h-16 border-2 border-dashed border-border rounded-xl cursor-pointer bg-default/40 hover:bg-default/60 transition-all overflow-hidden">
                    {formData.logo ? (
                      <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <ArrowUpFromLine className="w-5 h-5 text-muted" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                      disabled={isUploading}
                    />
                  </label>
                  <div className="text-xs text-muted">
                    <p className="font-semibold text-foreground">
                      {isUploading ? "Uploading..." : "Upload image"}
                    </p>
                    <p>PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>
            </div>

            <TextField isRequired name="description">
              <Label>Brief Description</Label>
              <TextArea
                variant="secondary"
                rows={4}
                placeholder="Tell us about your company's mission and culture..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </TextField>
          </Card.Content>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {isEditing && (
            <Button type="button" variant="danger-soft" onPress={() => setIsEditing(false)}>
              Cancel
            </Button>
          )}
          <Button type="submit" variant="primary" isPending={isSubmitting} isDisabled={isUploading}>
            {isSubmitting ? <Spinner color="current" size="sm" /> : <CircleCheck className="w-4 h-4" />}
            {isEditing ? "Update Company Profile" : "Register Company"}
          </Button>
        </div>
      </Form>
    );
  }

  // --- SCENARIO 2: COMPANY REGISTERED VIEW ---
  const websiteHref = company.website
    ? company.website.startsWith("http")
      ? company.website
      : `https://${company.website}`
    : undefined;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="w-full">
        <Card.Header className="flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 rounded-xl border border-border bg-default/40">
              <Avatar.Image src={company.logo} alt={company.name} />
              <Avatar.Fallback>
                <Factory className="w-6 h-6 text-muted" />
              </Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <Card.Title className="text-2xl">{company.name}</Card.Title>
                {getStatusChip(company.status)}
              </div>
              <Card.Description>
                {company.industry} • {company.location}
              </Card.Description>
            </div>
          </div>

          <Button variant="secondary" onPress={handleOpenEdit}>
            <Pencil className="w-4 h-4" />
            Edit Details
          </Button>
        </Card.Header>

        <Card.Content className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-default/40 border border-border rounded-xl flex items-center gap-3">
              <Globe className="w-5 h-5 text-muted" />
              <div className="truncate">
                <p className="text-xs text-muted">Website</p>
                {websiteHref ? (
                  <a
                    href={websiteHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-accent hover:underline truncate block"
                  >
                    {company.website}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-foreground">N/A</p>
                )}
              </div>
            </div>

            <div className="p-4 bg-default/40 border border-border rounded-xl flex items-center gap-3">
              <Persons className="w-5 h-5 text-muted" />
              <div>
                <p className="text-xs text-muted">Company Size</p>
                <p className="text-sm font-medium text-foreground">{company.employeeCount}</p>
              </div>
            </div>

            <div className="p-4 bg-default/40 border border-border rounded-xl flex items-center gap-3">
              <Pin className="w-5 h-5 text-muted" />
              <div>
                <p className="text-xs text-muted">Location</p>
                <p className="text-sm font-medium text-foreground">{company.location || "N/A"}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              About Company
            </h4>
            <p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-line">
              {company.description || "No description provided."}
            </p>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}