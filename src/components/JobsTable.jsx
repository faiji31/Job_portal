"use client";

import { Table } from "@heroui/react";

const formatSalary = (min, max, currency) =>
  `${Number(min).toLocaleString()} - ${Number(max).toLocaleString()} ${currency}`;

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const statusStyle = {
  active: "bg-green-100 text-green-700",
  closed: "bg-red-100 text-red-700",
  draft: "bg-gray-100 text-gray-700",
};

export default function JobsTable({ jobs = [] }) {
  if (!jobs.length) {
    return <p className="text-sm text-gray-500">No jobs posted yet.</p>;
  }

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Manage all jobs" className="min-w-[900px]">
          <Table.Header>
            <Table.Column isRowHeader>Title</Table.Column>
            <Table.Column>Category</Table.Column>
            <Table.Column>Type</Table.Column>
            <Table.Column>Salary</Table.Column>
            <Table.Column>Location</Table.Column>
            <Table.Column>Deadline</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Posted</Table.Column>
          </Table.Header>
          <Table.Body>
            {jobs.map((job) => (
              <Table.Row key={job._id} id={job._id}>
                <Table.Cell className="capitalize">{job.title}</Table.Cell>
                <Table.Cell className="capitalize">{job.category}</Table.Cell>
                <Table.Cell className="capitalize">{job.jobType}</Table.Cell>
                <Table.Cell>
                  {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                </Table.Cell>
                <Table.Cell>
                  {job.isRemote ? "Remote" : `${job.city}, ${job.country}`}
                </Table.Cell>
                <Table.Cell>{formatDate(job.deadline)}</Table.Cell>
                <Table.Cell>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${
                      statusStyle[job.status] ?? statusStyle.draft
                    }`}
                  >
                    {job.status}
                  </span>
                </Table.Cell>
                <Table.Cell>{formatDate(job.createdAt)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}