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

export const getPlaceById = async (id: number) => {
  try {
    const response = await jsonServerInstance.get(PLACES_URL,{params: { id }});
    return response.data;
  } catch (error) {
    console.error(`Error fetching place with id ${id}`, error);
    throw error;
  }
};

export const registerPlace = async (name: string, address: string, numberOfTable: number) => {
  try {
    const places = await getPlaces();
    
    const maxId = places.length > 0 ? Math.max(...places.map((place :any) => place.id)) : 0;
    const newId = maxId + 1;

    const response = await jsonServerInstance.post(PLACES_URL, {
      id: newId,
      name,
      address,
      numberOfTable,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering place", error);
    throw error;
  }
};
