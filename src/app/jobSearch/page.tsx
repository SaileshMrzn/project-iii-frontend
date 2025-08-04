"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MultiFilterSelect } from "./components/MultiFilterSelect";
import JobsList from "./components/JobsList";

const JobSearch = () => {
  const searchParams = useSearchParams();

  const keywords = searchParams.get("keywords") || "";
  const filter = useMemo(() => searchParams.getAll("filter"), [searchParams]);

  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (keywords) {
      setSearch(keywords);
      if (filter.length) {
        setSelectedFilters(filter);
      }
      setTriggerFetch(true);
    }
  }, [keywords, filter]);

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

        <MultiFilterSelect
          options={[
            { label: "LinkedIn", value: "linkedin" },
            { label: "Mero Jobs", value: "merojobs" },
            { label: "Kumari Jobs", value: "kumarijobs" },
          ]}
          setSelectedFilters={setSelectedFilters}
          selectedFilters={selectedFilters}
        />

        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </Button>
      </div>

      <JobsList
        keywords={keywords}
        filter={filter}
        triggerFetch={triggerFetch}
        setLoading={setLoading}
      />

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
