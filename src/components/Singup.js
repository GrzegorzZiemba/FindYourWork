import React, { useCallback } from "react";
import { Form } from "react-bootstrap";
import { withRouter } from "react-router";
import { fbase } from "../firebase/firebase";
import TextField from "@material-ui/core/TextField";
import "./EditJobForm.css";

const SignUp = ({ history }) => {
	const handleSignUp = useCallback(
		async (event) => {
			event.preventDefault();
			const { email, password } = event.target.elements;
			try {
				await fbase
					.auth()
					.createUserWithEmailAndPassword(email.value, password.value);
				history.push("/");
			} catch (error) {
				alert(error);
			}
		},
		[history]
	);

	return (
		<div className="signCenter">
			<h1>Sign up</h1>
			<Form onSubmit={handleSignUp}>
				<label>
					Email
					<TextField name="email" type="email" placeholder="Email" />
				</label>
				<label>
					Password
					<TextField name="password" type="password" placeholder="Password" />
				</label>

				<button type="submit">Sign Up</button>
			</Form>
		</div>
	);
};

export default withRouter(SignUp);
