"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useMemo, useState } from "react";
import JobCard from "./components/JobCard";
import { useGetJobs } from "@/hooks/useJobSearch";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { MultiFilterSelect } from "./components/MultiFilterSelect";

const JobSearch = () => {
  const searchParams = useSearchParams();

  const keywords = searchParams.get("keywords") || "";
  const filter = useMemo(() => searchParams.getAll("filter"), [searchParams]);

  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const router = useRouter();

  const { data, isFetching, error, refetch } = useGetJobs(
    { keywords, filter: filter },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (keywords) {
      setSearch(keywords);
      if (filter.length) {
        setSelectedFilters(filter);
      }
      refetch();
    }
  }, [keywords, filter]);

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

  // useEffect(() => {
  //   if (selectedFilters.length > 0) {
  //     const params = new URLSearchParams();
  //     selectedFilters.forEach((filter) => {
  //       params.append("filter", filter);
  //     });
  //     router.push(`/jobSearch?${params.toString()}`);
  //     if (!!keywords) {
  //       setTimeout(() => {
  //         refetch();
  //       }, 1000);
  //     }
  //   } else {
  //     router.push("/jobSearch");
  //   }
  // }, [selectedFilters, router]);

  const handleSearch = () => {
    if (search) {
      const encoded = encodeURIComponent(search.trim());
      const params = new URLSearchParams();
      selectedFilters.forEach((filter) => {
        params.append("filter", filter);
      });
      const paramString = params.toString();
      router.push(
        `/jobSearch?keywords=${encoded}${paramString ? `&${paramString}` : ""}`
      );
    } else {
      router.push("/jobSearch");
    }
  };

  // const job = {
  //   title: "Full Stack Developer and IT Project Manager",
  //   company: {
  //     name: "Nepal Can Code",
  //     location: "Tinkune, Nepal",
  //   },
  //   posted: "5 days ago",
  //   source: "LinkedIn",
  // };

  return (
    <div className="px-6 md:px-16 pb-8">
      <h1 className="mb-4 text-5xl xl:text-6xl">Job Finder</h1>

      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Enter Job Title"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <Button onClick={handleSearch}>
          {isFetching ? "Loading..." : "Search"}
        </Button>

        <MultiFilterSelect
          options={[
            { label: "LinkedIn", value: "linkedin" },
            { label: "Mero Jobs", value: "merojobs" },
            { label: "Kumari Jobs", value: "kumarijobs" },
          ]}
          setSelectedFilters={setSelectedFilters}
          selectedFilters={selectedFilters}
        />
      </div>

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

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <JobCard data={job} />
        <JobCard data={job} />
        <JobCard data={job} />
        <JobCard data={job} />
        <JobCard data={job} />
        <JobCard data={job} />
        <JobCard data={job} />
      </div> */}
    </div>
  );
};

export default JobSearch;
