import jsonServerInstance from "../api/jsonServerInstance";
import { getPlaceById } from "./Places";

const USERS_URL = "users";

export const getUser = async (ci: string, birthDate: string) => {
  try {
    const response = await jsonServerInstance.get(USERS_URL + "?ci=" + ci + "&birthDate=" + birthDate);
    return response.data;
  } catch (error) {
    console.error("Error searching user by id", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await jsonServerInstance.get(USERS_URL);
    return response.data;
  } catch (error) {
    console.error("Error getting users", error);
    throw error;
  }
};

export const getAdmin = async (ci: string, password: string) => {
  try{
    if(password.length === 0)
        return []
    const response = await jsonServerInstance.get(USERS_URL + "?ci=" + ci + "&password=" + password);
    return response.data;
  }
  catch(error){
    console.error("Error searching admin by id", error);
    throw error;
  }
}

export const registerUser = async (
  ci: string,
  birthDate: string,
  name: string,
  lastName: string,
  place: number
) => {
  try {
    const allUsers = await jsonServerInstance.get(USERS_URL);
    const ids = allUsers.data.map((user: any) => user.id);
    const nextId = (ids.length > 0 ? Math.max(...ids) + 1 : 1);
    
    const token = `user-token-${nextId+1234}`;
    const placeResponse = await getPlaceById(place);
    const numberOfTable = placeResponse[0].numberOfTable;

    const char = lastName[0].toUpperCase();
    const charValue = char.charCodeAt(0) - 64;

    const numberPlace = (charValue % numberOfTable) + 1;

    const response = await jsonServerInstance.post(USERS_URL, {
      id: nextId,
      ci,
      role: "user",
      birthDate,
      name,
      lastName,
      placeId: place,
      hasVoted: false,
      token,
      numberPlace,
    });

    return response.data;
  } catch (error) {
    console.error("Error registering user", error);
    throw error;
  }
};