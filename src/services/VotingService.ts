import jsonServerInstance from "../api/jsonServerInstance";

const VOTE_URL = 'vote';
const USER_URL = 'users';

export const postVote = async (userId: number, candidateId: number, user: any) => {
  try {
    const allVotesResponse = await jsonServerInstance.get(VOTE_URL);
    const allVotes = allVotesResponse.data;

    const newId = allVotes.length > 0
      ? Math.max(...allVotes.map((v: any) => v.id)) + 1
      : 1;

    const newVote = {
      id: newId.toString(),
      candidate_id: candidateId,
      vote_date: new Date().toISOString(),
    };
    await jsonServerInstance.post(VOTE_URL, newVote);

    const updatedUser = {
      ...user,
      hasVoted: true,
    };

    await jsonServerInstance.put(`${USER_URL}/${userId}`, updatedUser);
    
    return newVote;

  } catch (error) {
    console.error("Error al registrar el voto", error);
    throw error;
  }
};

export const getVotesByCandidate = async (candidateId: number) => {
  try {
    const response = await jsonServerInstance.get(VOTE_URL, {
      params: { candidate_id: candidateId },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los votos por candidato", error);
    throw error;
  }
};  