import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="-mx-8 px-8 mt-4 py-8 bg-gray-100">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="my-4">
        <h2 className="font-semibold text-2xl">About de place...</h2>
        <p className="text-gray-700">{place.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="grid grid-cols-3 justify-center items-center">
          <span>
            <h2 className="font-bold">Check In</h2>
            <p className="text-gray-700">{place.checkIn}pm</p>
          </span>
          <span>
            <h2 className="font-bold">Check Out</h2>
            <p className="text-gray-700">{place.checkOut}pm</p>
          </span>
          <span>
            <h2 className="font-bold">Place max guests</h2>
            <p className="text-gray-700">{place.maxGuests}</p>
          </span>
        </div>
        <BookingWidget place={place} />
      </div>
      <div className="border-t-2 border-primary bg-white -mx-8 px-8 py-4 my-4">
        <h2 className="font-semibold text-2xl">Extra Info</h2>
        <p className="text-gray-700">{place.extraInfo}</p>
      </div>
    </div>
  );
}
