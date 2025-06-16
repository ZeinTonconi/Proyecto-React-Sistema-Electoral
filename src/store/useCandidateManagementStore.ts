import { create } from "zustand";
import type { Candidate } from "../interfaces/candidateInterface";
import { getCandidateService, deleteCandidateService, putCandidateService } from "../services/CandidateService";
import { persist } from "zustand/middleware";


interface CandidateStore {
    candidates: Candidate[];
    isLoading: boolean;
    error: string | null;

    fetchCandidates: () => void;
    deleteCandidate: (candidateId: string) => void;
    editCandidate: (candidate: Candidate) => void;
}

export const useCandidateManagementStore = create<CandidateStore>()(
    persist((set) => ({
        candidates: [],
        isLoading: false,
        error: null,

        fetchCandidates: async () => {
            set({ isLoading: true });
            try {
                const candidatesData = await getCandidateService();
                const formattedCandidates = candidatesData.map((candidate: any) => ({
                    id: candidate.id,
                    candidate_name: candidate.candidate_name,
                    political_party: candidate.political_party,
                }));
                set({ candidates: formattedCandidates });
            } catch (error) {
                set({ error: "Error fetching candidates" });
            } finally {
                set({ isLoading: false });
            }
        },

        deleteCandidate: async (candidateId: string) => {
            set({ isLoading: true });
            try {
                await deleteCandidateService(candidateId);
            } catch (error) {
                set({ error: "Error deleting candidate" });
            } finally {
                set({ isLoading: false });
            }
        },

        editCandidate: async (candidate: Candidate) => {
            set({ isLoading: true });
            try {
                await putCandidateService(candidate);
            } catch (error) {
                set({ error: "Error editing candidate" });
            } finally {
                set({ isLoading: false });
            }
        },
    }),
        {
            name: "candidates",
        }
    )
);
