import jsonServerInstance from "../api/jsonServerInstance";

const ZONES_URL = 'zones';

export const getZonesService = async () => {
  try {
    const response = await jsonServerInstance.get(ZONES_URL);
    return response.data;
  } catch (error) {
    console.error("Error getting candidates", error);
    throw error;
  }
};
