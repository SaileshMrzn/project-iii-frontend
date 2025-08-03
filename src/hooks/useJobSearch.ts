import { UsePrefetchQueryOptions, useQuery } from "@tanstack/react-query";
import { getJobs } from "@/services/jobSearch";

export type Job = {
  _id: string;
  title: string;
  company: {
    name: string;
    logo: string;
    location: string;
  };
  deadline: string;
  posted: string;
  link: string;
  source: string;
};

export type JobsResponse = {
  data: Job[];
  message: string;
};

export function useGetJobs(
  params: { keywords: string; filter: string[] },
  options?: { enabled: boolean }
) {
  return useQuery<JobsResponse>({
    queryKey: ["jobs", params],
    queryFn: () => getJobs(params),
    enabled: options?.enabled ?? true,
  });
}
