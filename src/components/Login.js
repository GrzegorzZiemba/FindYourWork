import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { fbase } from "../firebase/firebase.js";
import "firebase/auth";
import firebase from "firebase/app";
import styles from "./Form.module.css";
import { Button } from "react-bootstrap";

// import Button from "./Button";
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
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleLogin}>
				<h1
					style={{ textAlign: "center", margin: "10px 0", flexBasis: "100%" }}
				>
					Log in
				</h1>
				<div className={styles.div}>
					<input
						type="email"
						placeholder=" "
						className={styles.input}
						maxLength="50"
						name="email"
						required
					/>
					<label for="" className={styles.label}>
						Email
					</label>
				</div>

				<div className={styles.div}>
					<input
						type="password"
						placeholder=" "
						className={styles.input}
						maxLength="50"
						name="password"
						required
					/>
					<label for="" className={styles.label}>
						Password
					</label>
				</div>
				<Button color="secondary" style={{ margin: "0 20px" }} type="submit">
					LogIn
				</Button>
				<Link to="/signup">
					<Button color="primary">Register</Button>
				</Link>
				<Button
					onClick={() => {
						signInWithGoogle();
					}}
					style={{ margin: "0 20px" }}
				>
					Sign in with Google
				</Button>
			</form>
		</div>
	);
};

export default withRouter(Login);
