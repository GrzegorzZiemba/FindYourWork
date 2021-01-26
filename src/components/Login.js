import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { fbase } from "../firebase/firebase.js";
import "firebase/auth";
import firebase from "firebase/app";

import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./form.css";

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
			<div class="l-form">
				<Form className="form" onSubmit={handleLogin}>
					<div className="form__div">
						<input
							type="email"
							placeholder=" "
							className="form__input"
							maxLength="50"
							name="email"
							required
						/>
						<label for="" className="form__label">
							Email
						</label>
					</div>

					<div className="form__div">
						<input
							type="password"
							placeholder=" "
							className="form__input"
							maxLength="50"
							name="password"
							required
						/>
						<label for="" className="form__label">
							Password
						</label>
					</div>
					<div className="formButton">
						<Button type="submit">LogIn</Button>
						<Link to="/signup">
							<Button>Register</Button>
						</Link>
						<Button onClick={signInWithGoogle}>Sign in with Google</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default withRouter(Login);
