import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/profileSlice";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import MapInit from './Map/MapInit'

const UserProfile = () => {
    const [userData, setUserData] = useState(false);
    var userProfile = useSelector(selectUser);
    const history = useHistory();
    const user = firebase.auth().currentUser;

    const GetUserDataHandler = () => {
        setUserData(!userData);
    }

    const signOut = () => {
        user.delete().then(() => {
            history.push('./auth')
        }).catch((error) => {

            console.log(error.message);
        });

    }
    return (
        <React.Fragment>
            <MapInit signOut={signOut} profileName={userProfile.name} />
        </React.Fragment>
    )
}
export default UserProfile;