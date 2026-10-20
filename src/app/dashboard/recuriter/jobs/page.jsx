import JobsTable from "@/components/JobsTable";
import { getCompanyJobs } from "@/lib/api/jobs";


const RecuriterJobs = async () => {
  const companyId = "comp_mock_123";
  const jobs = await getCompanyJobs(companyId);

  // MongoDB's _id (ObjectId) can't be passed to client components directly,
  // so convert everything to plain JSON first
  const plainJobs = JSON.parse(JSON.stringify(jobs));

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Manage All Jobs</h2>
      <JobsTable jobs={plainJobs} />
    </div>
  );
};

export default RecuriterJobs;