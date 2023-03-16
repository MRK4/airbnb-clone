import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    });
  }, [])
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 && places.map(place => (
        <Link to={'/place/'+place._id}>
          <div className="mb-2 rounded-2xl bg-gray-500 flex">
            {place.photos?.[0] && (
              <img className="aspect-square object-cover rounded-2xl" src={'http://localhost:4000/uploads/'+place.photos?.[0]} alt="" />
            )}
          </div>
          <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-gray-500 font-semibold text-sm">{place.title}</h3>
          <p className="mt-1">
            <span className="font-bold">${place.price}</span>/night
          </p>
        </Link>
      ))}
    </div>
  );
};

export default IndexPage;
