import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNavigation";
import { UserContext } from "../UserContext";
import PlacesPage from "./PlacesPage";

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const {ready, user, setUser} = useContext(UserContext);

    let {subpage} = useParams();
    if(subpage === undefined){
        subpage = 'profile';
    }

    async function logout(){
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (!ready){
        return 'Loading...'
    }

    if (ready && !user && !redirect){
        return <Navigate to={'/login'} />
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    return(
        <div>
            <AccountNav />
            {/* PROFILE */}
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} <i className="text-sm">({user.email})</i><br />
                    <button onClick={logout} className="max-w-sm mt-2 primary">Logout</button>
                </div>
            )}

            {/* PLACES */}
            {subpage === 'places' && (
                <PlacesPage />
            )}

            {/* BOOKINGS */}
            {subpage === 'booking' && (
                <div></div>
            )}
        </div>
    );
}