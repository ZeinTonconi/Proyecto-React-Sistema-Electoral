import jsonServerInstance from "../api/jsonServerInstance";
import type { Place, Table } from "../components/VotingTablesList";

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
    const response = await jsonServerInstance.get(PLACES_URL, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching place with id ${id}`, error);
    throw error;
  }
};

export const registerPlace = async (
  name: string,
  address: string,
  zone: number
) => {
  try {
    const places = await getPlaces();

    const maxId =
      places.length > 0 ? Math.max(...places.map((place: any) => place.id)) : 0;
    const newId = maxId + 1;

    const response = await jsonServerInstance.post(PLACES_URL, {
      id: newId.toString(),
      name,
      address,
      zone,
      votingPlace: []
    });
    return response.data;
  } catch (error) {
    console.error("Error registering place", error);
    throw error;
  }
};

export const deletePlace = async (id: string) => {
  try {
    const res = await jsonServerInstance.delete(`${PLACES_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error deleting place", error);
    throw error;
  }
};

export const updatePlace = async (id: string, newPlace: any) => {
  try {
    
    const place = await getPlaceById(id)
    const table = place.votingTables
    const res = await jsonServerInstance.put(`${PLACES_URL}/${id}`, {
      ...newPlace,
      votingTables: table || []
    });
  } catch (error) {
    console.log("Error updating place");
  }
};

export const getPlacesByZoneId = async (id: string) => {
  try {
    const res = await jsonServerInstance.get(`/${PLACES_URL}?zone=${id}`);
    return res.data;
  } catch (error) {
    console.log("Error getting places by zone id", error);
  }
};

export const addTableToPlaceService = async (id: string, table: any) => {
  try {
    const data = await getPlaceById(id);
    const [place] = data;
    if (!place.votingTables) place.votingTables = [];
    place.votingTables.push(table);
    place.votingTables.sort((a, b) => (a.start < b.start ? -1 : 1));
    const newTables = place.votingTables.map((p, index) => ({
      ...p,
      noTable: index + 1,
      id: index + 1,
    }));

    const res = await jsonServerInstance.put(`/${PLACES_URL}/${id}`, {
      ...place,
      votingTables: newTables,
    });
    return res.data.votingTables;
  } catch (error) {
    console.log("Error adding a Table to Service", error);
  }
};

export const deleteTableFromPlaceService = async (
  id: string,
  table: any,
  place: any
) => {
  try {
    place.votingTables = place.votingTables.filter((t) => t.id != table.id);
    const newTables = place.votingTables.map((p, index) => ({
      ...p,
      noTable: index + 1,
    }));

    const res = await jsonServerInstance.put(`/${PLACES_URL}/${id}`, {
      ...place,
      votingTables: newTables,
    });
    console.log({ newTables, res });
    return res.data.votingTables;
  } catch (error) {
    console.log("Error trying to drop a table", error);
  }
};

export const updateTableService = async (place: Place, updatedTable: Table) => {
  try {
    console.log({place, updatedTable})
    place.votingTables = place.votingTables.map((t) =>
      t.id === updatedTable.id ? updatedTable : t
    );
    const newTables = place.votingTables.map((p, index) => ({
      ...p,
      noTable: index + 1,
    }));

    const res = await jsonServerInstance.put(`/${PLACES_URL}/${place.id}`, {
      ...place,
      votingTables: newTables,
    });
    return res.data.votingTables
  } catch (error) {
    console.log("Error updating the table", error)

  }
};

export const getTableService = async (place: string, table: string) => {
  try {
    const [res] = await getPlaceById(place)
    const tableRes = res.votingTables.find((t) => t.id == table)
    return tableRes
  } catch (error) {
    console.log("Error gettting table", error)
  }
}