import { useMutation } from "@tanstack/react-query";
import { compare } from "@/services/public";

type CompareRequestBody = {
  resume: File | null;
  jobDescription: string;
};

export function useCompare() {
  return useMutation({
    mutationFn: (body: CompareRequestBody) => compare(body),
  });
}
