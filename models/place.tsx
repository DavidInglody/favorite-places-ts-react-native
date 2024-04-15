export class Place {
  title: string;
  imageUri: string;
  address: string;
  location: { lat: number; lng: number };
  id: string;

  constructor(
    title: string,
    imageUri: string,
    location: { lat: number; lng: number; address: string },
    id: string
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng }; // { lat: number, lng: number }
    this.id = id;
  }
}
