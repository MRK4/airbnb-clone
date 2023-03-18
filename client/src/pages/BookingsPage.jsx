import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../AccountNavigation";
import PlaceImg from "../PlaceImg";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get('bookings/').then(response => {
      setBookings(response.data);
    });
  }, [])
  return (
    <div>
      <AccountNav />
      <div className="space-y-4">
        {bookings?.length > 0 && bookings.map(booking => (
          <Link to={`/account/bookings/${booking._id}`} className="flex bg-gray-100 rounded-2xl overflow-hidden">
            <div className="min-w-[11rem]">
              <PlaceImg className="h-full w-44 object-cover" place={booking.place} />
            </div>
            <div className="p-4">
              <h2 className="py-2 text-xl font-semibold">{booking.place.title}</h2>
              <BookingDates className="text-gray-600" booking={booking} />
              <div className="py-2 text-sm text-gray-600">
                <p className="flex items-end gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                  <u>{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights</u> for <span className="text-base font-semibold">${booking.price}</span></p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
