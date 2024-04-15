import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../constats/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/place";

type PlaceFormProps = {
  onCreatePlace: (placeData: Place) => void;
};

export default function PlaceForm({ onCreatePlace }: PlaceFormProps) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [pickedLocation, setPickedLocation] = useState({
    lat: 0,
    lng: 0,
    address: "",
  });
  const changeTitleHandler = (enteredText: string) => {
    setEnteredTitle(enteredText);
  };

  const imageTakenHandler = (imageUri: string) => {
    setSelectedImage(imageUri);
  };

  const pickedLocationHandler = useCallback(
    (location: { lng: number; lat: number; address: string }) => {
      setPickedLocation(location);
    },
    []
  );

  const savePlaceHandler = () => {
    const placeData = new Place(
      enteredTitle,
      selectedImage,
      pickedLocation,
      Math.random().toString()
    );
    onCreatePlace(placeData);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={imageTakenHandler} />
      <LocationPicker onTakeLocation={pickedLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 14,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 1,
    backgroundColor: Colors.primary100,
  },
});
