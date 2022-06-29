import firebaseConfig from '../config';
import firebase from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import React, { useState } from 'react';
import { profileActions } from '../../store';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const Auth = () => {
    const [loginFail, setLoginFail] = useState(false);
    var userData;
    var user;
    const history = useHistory();
    const dispatch = useDispatch();
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    var providerGoogle = new firebase.auth.GoogleAuthProvider();
    var providerFacebook = new firebase.auth.FacebookAuthProvider();
    var providerGitHub = new firebase.auth.GithubAuthProvider();

    providerGoogle.setCustomParameters({
        'display': 'popup'
    });
    providerFacebook.setCustomParameters({
        'display': 'popup'
    });

    const popUpHandler = (provider) => {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {

                user = result.user;
                userData = {
                    name: result.user.displayName,
                    email: result.user.email,
                }
                dispatch(profileActions.setUser(userData));

                setLoginFail(true);
                history.push('./userProfile');

            }).catch((error) => {
                console.log(error.message);
            });
    }

    return (<React.Fragment>
        <div>
            <button className="btnGoogle" onClick={() => popUpHandler(providerGoogle)}>
                <h1>Sign in with Google</h1>
            </button>
            <br></br>
            <button className="btnFacebook" onClick={() => popUpHandler(providerFacebook)}>
                <h1>Sign in with Facebook</h1>
            </button>
            <br></br>
            <button className="btnGit" onClick={() => popUpHandler(providerGitHub)}>
                <h1>Sign in with GitHub</h1>
            </button>
            <br></br>
            <br></br>
        </div>

        {loginFail && <dialog open>An error occured when trying to log you in</dialog>}
    </React.Fragment>)
}
export default Auth;