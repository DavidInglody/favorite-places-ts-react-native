import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { Place } from "../models/place";
import { fetchPlaces } from "../util/database";

export default function AllPlaces() {
  const [loadedPlaces, setLoadedPLaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPLaces(places);
    }

    if (isFocused) {
      loadPlaces();
      // setLoadedPLaces((prev) => [...prev, route.params.place]);
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
}
