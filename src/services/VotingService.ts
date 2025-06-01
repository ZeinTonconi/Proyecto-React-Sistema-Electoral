import jsonServerInstance from "../api/jsonServerInstance";

const USER_URL = 'users'

export const postVote = async (id: number, candidate: string | null, user: any) => {
    try{
        const res = await jsonServerInstance.put(`${USER_URL}/${id}`, {
            ...user,
            hasVoted: true,
            vote: candidate
        })
        return res;
    } catch(error) {
        console.error("Error posting the vote", error);
        throw error;
    }
}