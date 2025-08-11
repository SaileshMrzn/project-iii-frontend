import { useGetJobs } from "@/hooks/useJobSearch";
import React, { useEffect } from "react";
import JobCard from "./JobCard";
import { AxiosError } from "axios";
import { toast } from "sonner";

const JobsList = ({
  keywords,
  filter,
  triggerFetch,
  setLoading,
}: {
  keywords: string;
  filter?: string[];
  triggerFetch: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data, isFetching, error, refetch } = useGetJobs(
    { keywords, filter: filter || [] },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (triggerFetch) {
      refetch();
    }
  }, [triggerFetch, refetch]);

  useEffect(() => {
    if (setLoading) {
      if (isFetching) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    }
  }, [isFetching, setLoading]);

  useEffect(() => {
    if (error) {
      const message =
        error instanceof AxiosError
          ? error?.response?.data?.message
          : error instanceof Error
          ? error?.message
          : "Something went wrong";

      toast.error(message);
    }
  }, [error]);

  return (
    <div>
      {!!data?.data && !isFetching && (
        <p className="mb-4">{`${data?.data.length} top results found`}</p>
      )}

      {isFetching ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : !data?.data ? (
        <p className="text-muted-foreground">No jobs yet. Try searching!</p>
      ) : data.data.length === 0 ? (
        <p className="text-muted-foreground">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.data.map((job, index) => (
            <JobCard
              data={job}
              key={`${job?.title}-${job?.company?.name}-${index}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsList;
