"use client";

import { Button } from "@/components/ui/button";
import { Job } from "@/hooks/useJobSearch";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { IoIosTimer } from "react-icons/io";

const JobCard = ({ data }: { data: Job }) => {
  return (
    <div className="w-full border-2 rounded-md p-4 col-span-1 relative">
      {/* source */}
      {data?.source && (
        <div className="absolute -bottom-5! right-0">
          <p className="text-xs text-muted-foreground">{`Source: ${data?.source}`}</p>
        </div>
      )}
      {/* --- */}

      {/* organization info */}
      <div className="flex mb-2">
        <div className="w-16 h-16 overflow-hidden mr-2 flex-shrink-0 self-start mt-1">
          <Image
            src={data?.company?.logo || "/bg10.png"}
            alt="Logo"
            width={64}
            height={64}
            className="mr-3 object-cover w-16 h-16"
          />
        </div>
        <div>
          <h2 className="font-bold">{data?.title}</h2>
          <p>{data?.company?.name || "--"}</p>
        </div>
      </div>
      {/* --- */}

      <div className="flex justify-between">
        {/* desc */}
        <div className="max-w-2/3 ">
          <div className="flex items-start gap-2">
            <CiLocationOn className="mt-1" />
            <p>{data?.company?.location || "--"}</p>
          </div>

          <div className="flex items-start gap-2">
            <IoIosTimer className="mt-1" />
            <p>{data?.deadline || data?.posted || "--"}</p>
          </div>
        </div>
        {/* --- */}

        <Button variant={"outline"} className="h-8 self-end">
          View More
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
