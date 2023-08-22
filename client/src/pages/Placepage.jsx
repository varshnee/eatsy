import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import Booking from "../Booking";


function Placepage() {
    const {id} = useParams();
    const [place,setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then(response => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return '';
  return (
    <div>
      <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          <div className="font-semibold grid grid-cols-2">
            <div>
            Cusines available : {place.cuisine}<br />
          Contact: {place.contact}
            </div>
            <Booking place={place}/>
          </div>
          
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
      </div>
    </div>
    </div>
  )
}

export default Placepage
