import { create } from "zustand";
import type { Zone } from "../components/ZonesAndPlacesTreeView";
import { getZonesService } from "../services/ZoneService";
import { getPlacesByZoneId } from "../services/Places";

interface votingCentersStoreInterface {
  zones: Zone[];
  setZone: (zone: Zone[]) => void;
  loadZones: () => void;
}

export const votingCentersStore = create<votingCentersStoreInterface>()((set) => ({
  zones: [],
  setZone: (zones) => set({ zones }),
  loadZones: async () => {
    const res = await getZonesService();
    const zoneRes: Zone[] = await Promise.all(
      res.map(async (zone: Zone) => {
        const places = await getPlacesByZoneId(zone.id);
        return { ...zone, places };
      })
    );
    set({ zones: zoneRes });
  },
}));
