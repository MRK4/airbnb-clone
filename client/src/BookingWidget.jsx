import React, { useState, useEffect, useContext } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from './UserContext';

export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    let numberOfNights = 0;

    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function bookThisPlace() {
        const response = await axios.post('/bookings', {
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phone,
            price: numberOfNights * place.price,
            place: place._id
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="my-8">
            <div className="bg-white shadow-md p-4 rounded-2xl space-y-4">
                <div className="text-2xl text-center">Price: ${place.price}/ night</div>
                <div className="border-2 rounded-2xl">
                    <div>
                        <div className="my-2 px-4 py-2">
                            <label>From:</label>
                            <input value={checkIn} onChange={ev => setCheckIn(ev.target.value)} className="focus:outline-none w-full" type="date" />
                        </div>
                        <div className="my-2 px-4 py-2">
                            <label>To:</label>
                            <input value={checkOut} onChange={ev => setCheckOut(ev.target.value)} className="focus:outline-none w-full" type="date" />
                        </div>
                    </div>
                    <div className="border-t-2"></div>
                    <div>
                        <div className="px-4 py-2">
                            <label>Nb of Guests:</label>
                            <input value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)} placeholder="1" min="1" type="number" />
                        </div>
                    </div>
                    {numberOfNights > 0 && (<div className="border-t-2"></div>)}
                    {numberOfNights > 0 && (
                        <div>
                            <div className="px-4 py-2">
                                <label>Your Full-Name:</label>
                                <input
                                    value={name}
                                    onChange={ev => setName(ev.target.value)}
                                    placeholder="John Doe"
                                    type="text" />
                            </div>
                        </div>
                    )}
                    {numberOfNights > 0 && (<div className="border-t-2"></div>)}
                    {numberOfNights > 0 && (
                        <div>
                            <div className="px-4 py-2">
                                <label>Phone number:</label>
                                <input
                                    value={phone}
                                    onChange={ev => setPhone(ev.target.value)}
                                    placeholder="888-333"
                                    type="tel" />
                            </div>
                        </div>
                    )}
                </div>
                <button onClick={bookThisPlace} className="primary">
                    Book now
                    {numberOfNights > 0 && (
                        <span>
                            &nbsp;for
                            <span className="font-semibold">&nbsp;${numberOfNights * place.price}</span>
                        </span>
                    )}
                </button>
            </div>
        </div>
    )
}
