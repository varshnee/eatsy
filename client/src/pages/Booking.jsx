import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";

export default function Booking() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return null; // Return null or loading indicator
  }

  const place = booking.place || {}; // Use an empty object if place is undefined

  return (
    <div className="my-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink className="my-2 block">{place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>       
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>No of guests</div>
          <div className="text-3xl">${booking.count}</div>
        </div>
      </div>
      <PlaceGallery place={place} />
    </div>
  );
}
