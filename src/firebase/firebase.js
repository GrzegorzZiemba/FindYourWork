import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: "findyourwork-95deb.firebaseapp.com",
	databaseURL: "https://findyourwork-95deb.firebaseio.com",
	projectId: "findyourwork-95deb",
	storageBucket: "findyourwork-95deb.appspot.com",
	messagingSenderId: "580788546593",
	appId: process.env.REACT_APP_APP_ID,
	measurementId: "G-MHY571Q5Y2",
};

const fbase = firebase.initializeApp(app);
const db = fbase.firestore();

export { db, fbase };
