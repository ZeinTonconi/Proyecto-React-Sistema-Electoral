import jsonServerInstance from "../api/jsonServerInstance";
import type { Candidate } from "../interfaces/candidateInterface";

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

export const getCandidateByIdService = async (candidate: Candidate) => {
  try {
    const response = await jsonServerInstance.get(`${CANDIDATE_URL}/${candidate.id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting candidate by id", error);
    throw error;
  }
};

export const putCandidateService = async (candidate: Candidate) => {
  try {
    const resp = await jsonServerInstance.put(`${CANDIDATE_URL}/${candidate.id}`, candidate)
    return resp.data;
  } catch (error) {
    console.error("Error updating candidate", error);
    throw error;
  }
};

export const deleteCandidateService = async (candidateId: string) => {
  try {
    const resp = await jsonServerInstance.delete(`${CANDIDATE_URL}/${candidateId}`);
    return resp.data;
  } catch (error) {
    console.error("Error deleting candidate", error);
    throw error;
  }
};