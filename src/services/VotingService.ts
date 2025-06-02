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
      id: newId,
      candidate_id: candidateId,
      user_id: userId,
      vote_date: new Date().toISOString(),
    };
    await jsonServerInstance.post(VOTE_URL, newVote);

    const updatedUser = {
      ...user,
      hasVoted: true,
    };
    console.log("Actualizando usuario con ID:", userId, "con el nuevo estado de voto:", updatedUser);

    await jsonServerInstance.put(`${USER_URL}/${userId}`, updatedUser);
    
    return newVote;

  } catch (error) {
    console.error("Error al registrar el voto", error);
    throw error;
  }
};