import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/allplaces').then(response => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {places.length > 0 && places.map(place => (
        <Link to={'/place/' + place._id} key={place._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <img
                className="rounded-2xl object-cover aspect-square"
                src={`http://localhost:8080/uploads/${place.photos[0]}`}
                alt=""
              />
            )}
          </div>
          <h2 className="font-bold text-xl">{place.title}</h2>
          <h3 className="mt-1 text-l">{place.address}</h3>
          <div className="mt-1 text-gray-500 text-sm">
            <span>{place.cuisine}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default IndexPage;
