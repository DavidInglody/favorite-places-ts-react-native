import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../components/constats/colors";
import { useEffect, useState } from "react";
import { deletePlace, fetchPlaceDetails } from "../util/database";
import { Place } from "../models/place";
import { RootRouteProps, StackNavigation } from "../App";

type PlaceDetailsProps = {
  route: RootRouteProps<"PlaceDetails">;
  navigation: StackNavigation;
};

export default function PlaceDetails({ route, navigation }: PlaceDetailsProps) {
  const [fetchedPlace, setFetchedPlace] = useState<Place>();

  const showOnMapHandler = () => {
    if (!fetchedPlace) return;

    navigation.navigate("Map", {
      initialLat: fetchedPlace?.location.lat,
      initialLng: fetchedPlace?.location.lng,
    });
  };
  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({ title: place.title });
    }
    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  const removePlace = async (id: string) => {
    await deletePlace(id);
    navigation.goBack();
  };

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace?.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace?.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
        <Pressable
          style={({ pressed }) => [styles.deleteBtn, pressed && styles.pressed]}
          onPress={() => removePlace(fetchedPlace?.id)}
        >
          <Text>Delete Place</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  deleteBtn: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
