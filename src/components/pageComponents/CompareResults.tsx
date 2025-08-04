import React, { useEffect, useState } from "react";
import { ResultData } from "./Hero";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import JobsList from "@/app/jobSearch/components/JobsList";
import { useSession } from "next-auth/react";

function CompareResults({ result }: { result: ResultData }) {
  const { data: session } = useSession();

  const showJobs = !!session?.user && result.similarity > 20;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex justify-center w-full h-full flex-col px-6 md:px-16 pb-8 ${
        showJobs ? "self-start" : "self-center mb-16"
      }`}
    >
      {/* compare result */}
      <div className="w-full p-6 flex flex-col items-center gap-8">
        <div className="space-y-8 w-full flex justify-center flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl text-center text-foreground mb-10"
          >
            Resume Match Results
          </motion.h1>

          <div className="space-y-4 rounded-lg shadow-sm w-full max-w-5xl flex justify-center">
            <div className="flex-col md:flex-row flex items-center gap-8 w-full justify-around">
              <ScoreItem
                label="Overall Match"
                value={result?.similarity}
                delay={0.2}
                size="large"
                className="md:hidden"
              />
              <ScoreItem
                label="Skills Match"
                value={result?.matchedData?.skillsMatch?.percentageMatch}
                delay={0.3}
                className="mt-0 md:mt-10"
              />
              <ScoreItem
                label="Overall Match"
                value={result?.similarity}
                delay={0.2}
                size="large"
                className="hidden md:flex"
              />
              <ScoreItem
                label="Keywords Match"
                value={result?.matchedData?.keywordsMatch?.percentageMatch}
                delay={0.4}
                className="mt-0 md:mt-10"
              />
            </div>
          </div>

          {/* <div className="space-y-4">
            <p className="text-sm text-gray-600 font-medium text-center">
              Matched Skills
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {result?.matchedData?.skillsMatch?.matchedSkills?.map(
                (skill, index) => (
                  <motion.span
                    key={index}
                    className="px-4 py-1.5 bg-blue-100 text-blue-800 text-sm rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {skill}
                  </motion.span>
                )
              )}
            </div>
          </div> */}
        </div>

        <div className="space-y-4 w-full max-w-2xl">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-6 text-base"
            onClick={() => {
              window.location.reload();
            }}
          >
            <ArrowLeft size={18} />
            Try Another Comparison
          </Button>
          {!session?.user && (
            <p className="text-sm text-gray-500 text-center">
              Want more insights?{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">
                Sign in
              </span>{" "}
              to view recommended jobs
            </p>
          )}
        </div>
      </div>
      {/* --- */}

      {showJobs && (
        <h2 className="text-3xl xl:text-5xl mb-4">Recommended Jobs:</h2>
      )}
      {showJobs && (
        <JobsList
          keywords={result.matchedData.matchedRole}
          triggerFetch={true}
        />
      )}
    </motion.div>
  );
}

// Score Item Component
const ScoreItem = ({ label, value, delay, size = "small", className }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value || 0);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [value, delay]);

  const sizeStyles =
    size === "large"
      ? "w-36 h-36 md:w-48 md:h-48"
      : "w-32 h-32 md:w-36 md:h-36";

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className={`relative ${sizeStyles}`}>
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-foreground"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="44"
            cx="50"
            cy="50"
          />
          <motion.circle
            className="text-brand"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="44"
            cx="50"
            cy="50"
            strokeDasharray="276"
            strokeDashoffset={276 - (progress / 100) * 276}
            initial={{ strokeDashoffset: 276 }}
            animate={{ strokeDashoffset: 276 - (progress / 100) * 276 }}
            transition={{ duration: 1, delay: delay }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-base md:text-lg font-medium text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
          >
            {Math.round(progress)}%
          </motion.span>
        </div>
      </div>
      <span className="text-sm md:text-base font-medium text-muted-foreground">
        {label}
      </span>
    </div>
  );
};

export default CompareResults;
