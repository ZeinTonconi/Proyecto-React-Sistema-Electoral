import jsonServerInstance from "../api/jsonServerInstance";

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

export const getAdmin = async (ci: string, password: string) => {
  try{
    const response = await jsonServerInstance.get(USERS_URL + "?ci=" + ci + "&password=" + password);
    return response.data;
  }
  catch(error){
    console.error("Error searching admin by id", error);
    throw error;
  }
}