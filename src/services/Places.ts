import jsonServerInstance from "../api/jsonServerInstance";

const PLACES_URL = "places";

export const getPlaces = async () => {
  try {
    const response = await jsonServerInstance.get(PLACES_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching places", error);
    throw error;
  }
};