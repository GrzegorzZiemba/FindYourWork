import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { fbase } from "../firebase/firebase.js";
import "firebase/auth";
import firebase from "firebase/app";

const Login = ({ history }) => {
	const auth = firebase.auth();
	const handleLogin = useCallback(
		async (event) => {
			event.preventDefault();
			const { email, password } = event.target.elements;
			try {
				await fbase
					.auth()
					.signInWithEmailAndPassword(email.value, password.value);
				history.push("/");
				console.log("Logged");
			} catch (error) {
				alert(error);
			}
		},
		[history]
	);

	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};

	return (
		<div>
			<h1>Log in</h1>
			<form onSubmit={handleLogin}>
				<label>
					Email
					<input name="email" type="email" placeholder="Email" />
				</label>
				<label>
					Password
					<input name="password" type="password" placeholder="Password" />
				</label>
				<button type="submit">Log in</button>
			</form>
			<button className="sign-in" onClick={signInWithGoogle}>
				Sign in with Google
			</button>
			<p>
				Do not violate the community guidelines or you will be banned for life!
			</p>
		</div>
	);
};

export default withRouter(Login);
