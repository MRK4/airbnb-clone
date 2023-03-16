import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import { useEffect, useState } from "react";
import AccountNav from "../AccountNavigation";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PlacesFormPage() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if(!id){
            return;
        }
        axios
        .get('/places/'+id)
        .then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);

    function inputHeader(text){
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text){
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function preInput(header, description){
        return (
            <>
            {inputHeader(header)}
            {inputDescription(description)}
            </>
        );
    }

    async function savePlace(ev){
        ev.preventDefault();
        const placeData = {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        };
        if(id){
            // Update
            await axios.put('/places', {
                id,
                ...placeData
            });
            setRedirect(true);
        } else {
            // New place
            await axios.post('/places', placeData);
            setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to={'/account/places'} />
    }

  return (
    <div>
        <AccountNav />
        <form className="accent-primary" onSubmit={savePlace}>
            {preInput('Title', 'Title for your place. Should be short and catchy as in advertisement.')}
            <input
            value={title}
            onChange={ev => setTitle(ev.target.value)}
            type="text"
            placeholder="ex: My lovely appartment" />

            {preInput('Address', 'Address to this place.')}
            <input
            value={address}
            onChange={ev => setAddress(ev.target.value)}
            type="text"
            placeholder="address" />

            {preInput('Photos', 'This is better to show customers what your place looks like.')}
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

            {preInput('Description', 'Description of the place.')}
            <textarea
            className=""
            value={description}
            onChange={ev => setDescription(ev.target.value)}
            />

            {preInput('Perks', 'Select the perks of your place.')}
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                <Perks selected={perks} onChange={setPerks} />
            </div>

            {preInput('Extra Info', 'House rules, etc.')}
            <textarea
            value={extraInfo}
            onChange={ev => setExtraInfo(ev.target.value)}
            />

            {preInput('Check in&out times, max guests', 'Add check in&out times, remember to have time to clean the room between guests.')}
            <div className="gap-2 grid grid-cols-2 md:grid-cols-4">
                <div>
                    <h3 className="mt-2 -mb-1">Check in time</h3>
                    <input
                    value={checkIn}
                    onChange={ev => setCheckIn(ev.target.value)}
                    type="text"
                    placeholder="12"/>
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Check out time</h3>
                    <input
                    value={checkOut}
                    onChange={ev => setCheckOut(ev.target.value)}
                    type="text"
                    placeholder="08"/>
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Max number of guests</h3>
                    <input
                    min="1"
                    value={maxGuests}
                    onChange={ev => setMaxGuests(ev.target.value)}
                    type="number"
                    placeholder="4 people"/>
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Price per night</h3>
                    <input
                    min="100"
                    value={price}
                    onChange={ev => setPrice(ev.target.value)}
                    type="number"
                    placeholder="4 people"/>
                </div>
            </div>

            <button className="primary my-4">Register the place</button>
        </form>
    </div>
  )
}
