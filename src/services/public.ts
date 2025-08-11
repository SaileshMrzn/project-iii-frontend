import axios from "axios";

type CompareRequestBody = {
  resume: File | null;
  jobDescription: string;
};

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://project-iii-backend.onrender.com";

export const compare = async (body: CompareRequestBody) => {
  if (!body.resume) {
    throw new Error("File is required");
  }

  const formData = new FormData();
  formData.append("resume", body.resume);
  formData.append("jobDescription", body.jobDescription);

  try {
    const response = await axios.post(
      `${BASE_URL}/api/public/compare`,
      formData,
      {
        // Let FormData set its own Content-Type header
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("CORS Error Details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        headers: error.response?.headers,
        data: error.response?.data,
      });
    }
    throw error;
  }
};
