import api from "./api";
import qs from "qs";

export const getJobs = async (params: {
  keywords: string;
  filter: string[];
}) => {
  const response = await api.get("/scrape/all", {
    params: { keywords: params.keywords, filter: params.filter },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return response.data;
};
