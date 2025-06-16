import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./authStore";
import { getVotes, postVote } from "../services/VotingService";

export interface Vote {
  id: string;
  candidate_id: number;
  vote_date: string;
}

interface VoteStoreInterface {
  votes: Vote[];
  fetchVotes: () => void;
  registerVote: (userId: string, candidateId: number, user: any) => void;
}

export const useVoteStore = create<VoteStoreInterface>()(
  persist(
    (set) => ({
      votes: [],

      fetchVotes: async () => {
        try {
          const votes = await getVotes();
          set({ votes });
        } catch (error) {
          console.error("Error al obtener los votos", error);
        }
      },

      registerVote: async (userId, candidateId, user) => {
        try {
          const newVote = await postVote(userId, candidateId, user);

          const { setUser } = useAuthStore.getState();
          setUser({ ...user, hasVoted: true });

          set((state) => ({
            votes: [...state.votes, newVote],
          }));
        } catch (error) {
          console.error("Error al registrar el voto", error);
        }
      },
    }),
    {
      name: "votes",
    }
  )
);
