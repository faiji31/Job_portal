"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  ListBox,
  Select,
  Separator,
  Spinner,
  Switch,
  TextArea,
  TextField,
} from "@heroui/react";
import {
  Briefcase,
  MapPin,
  DollarSign,
  CheckCircle2,
  FileText,
  Building2,
} from "lucide-react";
import { createJob } from "@/lib/actions/jobs";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const JOB_CATEGORIES = [
  { id: "engineering", label: "Software & Engineering" },
  { id: "design", label: "UI/UX & Product Design" },
  { id: "marketing", label: "Marketing & Growth" },
  { id: "sales", label: "Sales & Business Dev" },
  { id: "finance", label: "Finance & Legal" },
  { id: "support", label: "Customer Support" },
];

const JOB_TYPES = [
  { id: "full-time", label: "Full-time" },
  { id: "part-time", label: "Part-time" },
  { id: "contract", label: "Contract" },
  { id: "internship", label: "Internship" },
];

const CURRENCIES = [
  { id: "USD", label: "USD ($)" },
  { id: "EUR", label: "EUR (€)" },
  { id: "GBP", label: "GBP (£)" },
  { id: "BDT", label: "BDT (৳)" },
];

// Reusable Select (v3 collection items use `id` + `textValue`)
function AppSelect({ label, items, ...props }) {
  return (
    <Select className="w-full" variant="secondary" {...props}>
      <Label>{label}</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {items.map((item) => (
            <ListBox.Item key={item.id} id={item.id} textValue={item.label}>
              {item.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
      <FieldError />
    </Select>
  );
}

// Reusable text field
function Field({ label, children, ...props }) {
  return (
    <TextField className="w-full" {...props}>
      <Label>{label}</Label>
      {children}
      <FieldError />
    </TextField>
  );
}

function BlockedCard({ tone, title, message }) {
  return (
    <div className="max-w-2xl mx-auto mt-12 p-6">
      <Card className={`border border-${tone}`}>
        <Card.Content className="py-8 text-center flex flex-col items-center gap-3">
          <Building2 className={`w-12 h-12 text-${tone}`} />
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm text-muted">{message}</p>
        </Card.Content>
      </Card>
    </div>
  );
}

export default function PostJobPage() {
  const [isRemote, setIsRemote] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock recruiter/company state (production এ backend/session থেকে আনবেন)
  const recruiterCompany = {
    name: "TechFlow Solutions",
    status: "approved",
    plan: "Growth",
    jobsPosted: 4,
    jobLimit: 10,
  };

  if (recruiterCompany.status !== "approved") {
    return (
      <BlockedCard
        tone="warning"
        title="Company Approval Required"
        message={`Your registered company (${recruiterCompany.name}) is currently pending verification. You can post jobs once your company profile is approved by our administration team.`}
      />
    );
  }

  if (recruiterCompany.jobsPosted >= recruiterCompany.jobLimit) {
    return (
      <BlockedCard
        tone="danger"
        title="Job Limit Reached"
        message={`You have reached your current plan limit (${recruiterCompany.jobsPosted}/${recruiterCompany.jobLimit} jobs active on your ${recruiterCompany.plan} plan). Please upgrade your plan to post more listings.`}
      />
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const jobData = {
      title: fd.get("title"),
      category: fd.get("category"),
      jobType: fd.get("jobType"),
      salaryMin: Number(fd.get("salaryMin")),
      salaryMax: Number(fd.get("salaryMax")),
      currency: fd.get("currency"),
      isRemote,
      city: isRemote ? "Remote" : fd.get("city"),
      country: isRemote ? "Remote" : fd.get("country"),
      deadline: fd.get("deadline"),
      responsibilities: fd.get("responsibilities"),
      requirements: fd.get("requirements"),
      benefits: fd.get("benefits"),
      companyId: "comp_mock_123",
      status: "active",
    };

    const res = await createJob(jobData)

    if(res.insertedId){
        toast.success('job is Posted Successfully!')
        e.target.reset()
        setIsRemote()
        redirect('/dashboard/recuriter/jobs')
    }

    // try {
    //   console.log("Submitting Job Payload:", jobData);
    //   await new Promise((r) => setTimeout(r, 1500));
    //   alert("Job posted successfully and is now publicly visible!");
    // } catch (error) {
    //   console.error("Failed to post job:", error);
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Post a New Job Opening</h1>
          <p className="text-sm text-muted">
            Create an active listing for{" "}
            <span className="font-semibold text-accent">{recruiterCompany.name}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 bg-default px-3 py-1.5 rounded-xl text-xs font-medium">
          <span>
            Plan: <strong>{recruiterCompany.plan}</strong>
          </span>
          <Separator orientation="vertical" className="h-4" />
          <span>
            Usage: <strong>{recruiterCompany.jobsPosted}/{recruiterCompany.jobLimit}</strong> slots used
          </span>
        </div>
      </div>

      <Form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Job Info */}
        <Card className="w-full">
          <Card.Header className="flex-row items-center gap-3">
            <Briefcase className="w-5 h-5 text-accent" />
            <div className="flex flex-col">
              <Card.Title>Job Information</Card.Title>
              <Card.Description>
                Specify title, category, compensation, and location
              </Card.Description>
            </div>
          </Card.Header>

          <Card.Content className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field isRequired name="title" label="Job Title">
                <Input variant="secondary" placeholder="e.g. Senior Frontend Developer" />
              </Field>
              <AppSelect
                isRequired
                name="category"
                label="Job Category"
                placeholder="Select category"
                items={JOB_CATEGORIES}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AppSelect
                isRequired
                name="jobType"
                label="Employment Type"
                placeholder="Select job type"
                items={JOB_TYPES}
              />
              <AppSelect
                isRequired
                name="currency"
                label="Currency"
                defaultSelectedKey="USD"
                items={CURRENCIES}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field isRequired type="number" name="salaryMin" label="Minimum Salary">
                <InputGroup variant="secondary">
                  <InputGroup.Prefix>
                    <DollarSign className="w-4 h-4 text-muted" />
                  </InputGroup.Prefix>
                  <InputGroup.Input placeholder="e.g. 60000" />
                </InputGroup>
              </Field>
              <Field isRequired type="number" name="salaryMax" label="Maximum Salary">
                <InputGroup variant="secondary">
                  <InputGroup.Prefix>
                    <DollarSign className="w-4 h-4 text-muted" />
                  </InputGroup.Prefix>
                  <InputGroup.Input placeholder="e.g. 90000" />
                </InputGroup>
              </Field>
            </div>

            {/* Remote toggle */}
            <div className="p-4 bg-default/40 rounded-xl space-y-4 border border-border">
              <Switch isSelected={isRemote} onChange={setIsRemote} className="w-full justify-between">
                <Switch.Content>
                  <Label className="text-sm font-medium">Remote Position</Label>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch.Content>
                <Description>Toggle on if this job can be performed anywhere</Description>
              </Switch>

              {!isRemote && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <Field isRequired name="city" label="City">
                    <InputGroup variant="secondary">
                      <InputGroup.Prefix>
                        <MapPin className="w-4 h-4 text-muted" />
                      </InputGroup.Prefix>
                      <InputGroup.Input placeholder="e.g. Dhaka" />
                    </InputGroup>
                  </Field>
                  <Field isRequired name="country" label="Country">
                    <Input variant="secondary" placeholder="e.g. Bangladesh" />
                  </Field>
                </div>
              )}
            </div>

            <Field isRequired type="date" name="deadline" label="Application Deadline">
              <Input variant="secondary" />
            </Field>
          </Card.Content>
        </Card>

        {/* Section 2: Description */}
        <Card className="w-full">
          <Card.Header className="flex-row items-center gap-3">
            <FileText className="w-5 h-5 text-accent" />
            <div className="flex flex-col">
              <Card.Title>Job Description & Requirements</Card.Title>
              <Card.Description>Detail responsibilities, prerequisites, and perks</Card.Description>
            </div>
          </Card.Header>

          <Card.Content className="space-y-4">
            <Field isRequired name="responsibilities" label="Key Responsibilities">
              <TextArea
                variant="secondary"
                rows={4}
                placeholder="List daily tasks, engineering expectations, project deliverables..."
              />
            </Field>
            <Field isRequired name="requirements" label="Requirements & Qualifications">
              <TextArea
                variant="secondary"
                rows={4}
                placeholder="List mandatory tech stack, years of experience, educational requirements..."
              />
            </Field>
            <Field name="benefits" label="Benefits & Perks (Optional)">
              <TextArea
                variant="secondary"
                rows={3}
                placeholder="e.g., Health insurance, flexible hours, remote work budget..."
              />
            </Field>
          </Card.Content>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="danger-soft" onPress={() => window.history.back()}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isPending={isSubmitting}>
            {isSubmitting ? (
              <Spinner color="current" size="sm" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            Publish Job Listing
          </Button>
        </div>
      </Form>
    </div>
  );
}