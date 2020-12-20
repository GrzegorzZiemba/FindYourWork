import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { fbase } from "../firebase/firebase.js";
import "firebase/auth";
import firebase from "firebase/app";
import Singup from "./Singup.js";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";
import "./EditJobForm.css";

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
			<Form onSubmit={handleLogin}>
				<div className="formElement">
					<h3>Email</h3>
					<TextField name="email" type="email" placeholder="Email" />
				</div>
				<div className="formElement">
					<h3>Password</h3>
					<TextField name="password" type="password" placeholder="Password" />
				</div>
				<div className="formButton">
					<Button type="submit">LogIn</Button>
					<Link to="/signup">
						<Button>Register</Button>
					</Link>
				</div>
			</Form>
			<Button className="sign-in" onClick={signInWithGoogle}>
				Sign in with Google
			</Button>
		</div>
	);
};

export default withRouter(Login);
