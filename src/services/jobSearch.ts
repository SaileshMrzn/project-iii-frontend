import api from "./api";

export const getJobs = async (params: { keywords: string }) => {
  const response = await api.get("/scrape/all", {
    params: { keywords: params.keywords },
  });
  return response.data;
};
