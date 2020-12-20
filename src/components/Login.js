import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { fbase } from "../firebase/firebase.js";
import "firebase/auth";
import firebase from "firebase/app";
import Singup from "./Singup.js";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

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
		<div className="signCenter">
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
			<Link to="/signup">
				<Button>Don't have account ?</Button>
			</Link>
		</div>
	);
};

export default withRouter(Login);
