import React from "react";
import { ResultData } from "./Hero";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

function CompareResults({ result }: { result: ResultData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center min-h-[90vh] w-full max-w-md mx-auto items-center flex-col gap-8 p-6 mb-10"
    >
      <div className="space-y-6 w-full">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-medium text-center text-gray-800"
        >
          Resume Match Results
        </motion.h1>

        <div className="space-y-4 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          {/* Score Items */}
          <ScoreItem
            label="Overall Match"
            value={result?.similarity}
            delay={0.2}
          />
          <ScoreItem
            label="Skills Match"
            value={result?.matchedData?.skillsMatch?.percentageMatch}
            delay={0.3}
          />
          <ScoreItem
            label="Keywords Match"
            value={result?.matchedData?.keywordsMatch?.percentageMatch}
            delay={0.4}
          />
        </div>

        {/* Matched Skills */}
        {/* <div className="space-y-2">
          <p className="text-sm text-gray-600 font-medium">Matched Skills</p>
          <div className="flex flex-wrap gap-2"></div>
        </div> */}
      </div>

      <div className="space-y-4 w-full">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 py-6"
          onClick={() => {
            window.location.reload();
          }}
        >
          <ArrowLeft size={16} />
          Try Another Comparison
        </Button>

        <p className="text-sm text-gray-500 text-center">
          Want more insights?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Sign in
          </span>{" "}
          to view matched jobs
        </p>
      </div>
    </motion.div>
  );
}

// Score Item Component
const ScoreItem = ({
  label,
  value,
  delay = 0,
}: {
  label: string;
  value: number;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex justify-between items-center"
  >
    <p className="text-gray-600">{label}</p>
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: delay + 0.2 }}
      className="flex items-center gap-2"
    >
      <span className=" font-medium text-gray-800">{value || "N/A"}%</span>
    </motion.div>
  </motion.div>
);

export default CompareResults;
