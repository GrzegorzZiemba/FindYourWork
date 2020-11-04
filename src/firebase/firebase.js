import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import * as firebaseui from "firebaseui";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: "findyourwork-95deb.firebaseapp.com",
	databaseURL: "https://findyourwork-95deb.firebaseio.com",
	projectId: "findyourwork-95deb",
	storageBucket: "findyourwork-95deb.appspot.com",
	messagingSenderId: "580788546593",
	appId: process.env.REACT_APP_APP_ID,
	measurementId: "G-MHY571Q5Y2",
};

var uiConfig = {
	signInSuccessUrl: "<url-to-redirect-to-on-success>",
	signInOptions: [
		// Leave the lines as is for the providers you want to offer your users.
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		firebase.auth.TwitterAuthProvider.PROVIDER_ID,
		firebase.auth.GithubAuthProvider.PROVIDER_ID,
	],
	// tosUrl and privacyPolicyUrl accept either url string or a callback
	// function.
	// Terms of service url/callback.
	tosUrl: "<your-tos-url>",
	// Privacy policy url/callback.
	privacyPolicyUrl: function () {
		window.location.assign("<your-privacy-policy-url>");
	},
};

const fbase = firebase.initializeApp(firebaseConfig);
const db = fbase.firestore();

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(fbase.auth());
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);

export { db };
