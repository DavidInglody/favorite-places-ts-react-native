import PlaceForm from "../components/Places/PlaceForm";
import { Place } from "../models/place";
import { insertPlace } from "../util/database";

export default function AddPlace({ navigation }: { navigation: any }) {
  const createPlaceHandler = async (place: Place) => {
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
