import jsonServerInstance from "../api/jsonServerInstance";

const CANDIDATE_URL = 'candidates';

export const getCandidateService = async () => {
  try {
    const response = await jsonServerInstance.get(CANDIDATE_URL);
    return response.data;
  } catch (error) {
    console.error("Error getting candidates", error);
    throw error;
  }
};

export const postCandidateService = async (candidate: any) => {
  try {
    const resp = await jsonServerInstance.post(CANDIDATE_URL, candidate)
    return resp.data;
  } catch (error) {
    console.error("Error creating candidate", error);
    throw error;
  }
};