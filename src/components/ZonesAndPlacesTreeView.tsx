import { Box, Paper, TextField, Typography } from "@mui/material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { useState } from "react";
import type { Place } from "./VotingTablesList";

export interface Zone {
  id: string;
  zone: string;
  places: Place[];
}

interface ZonesAndPlacesTreeViewProps {
  zones: Zone[];
  handlePlaceSelect: (zoneId: string, placeId: string) => void;
}

export const ZonesAndPlacesTreeView = ({
  zones,
  handlePlaceSelect,
}: ZonesAndPlacesTreeViewProps) => {
  const [search, setSearch] = useState("");
  const filteredZones = zones
    .map((zone) => ({
      ...zone,
      places: zone.places?.filter((place) =>
        `${zone.zone} ${place.name}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    }))
    .filter((zone) => zone.places && zone.places.length > 0);
  return (
    <Box
      component={Paper}
      sx={{
        width: { xs: "100%", md: 300 },
        borderRight: { md: 1 },
        borderColor: "divider",
        p: 2,
        flexShrink: 0,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Zonas y Lugares
      </Typography>
      <TextField
        fullWidth
        placeholder="Buscar zona o lugar"
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
        inputProps={{
          maxLength: 25,
        }}
      />
      <SimpleTreeView
        expandedItems={filteredZones.map((zone) => zone.id.toString())}
      >
        {filteredZones.map((zone) => (
          <TreeItem key={zone.zone} itemId={zone.id} label={zone.zone}>
            {zone.places?.map((place) => (
              <TreeItem
                key={place.name}
                itemId={place.name}
                label={place.name}
                onClick={() => handlePlaceSelect(zone.id, place.id)}
              />
            ))}
          </TreeItem>
        ))}
      </SimpleTreeView>
    </Box>
  );
};
