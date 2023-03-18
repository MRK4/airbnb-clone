import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import BookingDates from "../BookingDates";

export default function BookingPage() {
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
        return '';
    }

    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink>{booking.place.address}</AddressLink>
            <div className="flex items-center justify-between mb-6 mt-4 bg-gray-100 p-6 rounded-2xl">
                <div>
                    <h2 className="text-xl">Your booking informations</h2>
                    <BookingDates className="mt-2" booking={booking} />
                </div>
                <div className="bg-primary text-white rounded-2xl p-4">
                    <span>Total price:</span>
                    <span className="text-3xl">${booking.price}</span>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
            <div className="my-4">
                <h2 className="font-semibold text-2xl">About de place...</h2>
                <p className="text-gray-700">{booking.place.description}</p>
            </div>
        </div>
    )
}
