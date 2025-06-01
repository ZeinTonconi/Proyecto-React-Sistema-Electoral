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

export const registerUser = async (ci: string, birthDate: string) => {
  try {
    const allUsers = await jsonServerInstance.get(USERS_URL);
    const ids = allUsers.data.map((user: any) => user.id);
    const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
    const response = await jsonServerInstance.post(USERS_URL, {
      id: nextId,
      ci,
      role: "user",
      birthDate,
    });

    return response.data;
  } catch (error) {
    console.error("Error registering user", error);
    throw error;
  }
};