import React, { useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import { withRouter } from "react-router";
import { fbase } from "../firebase/firebase";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert";
import "./EditJobForm.css";

const SignUp = ({ history }) => {
	const handleSignUp = useCallback(
		async (event) => {
			event.preventDefault();

			const { email, password, password1 } = event.target.elements;
			console.log(password.value);
			console.log(password1.value);
			if (password.value !== password1.value) {
				swal("Wrong password", "Password does not match", "error");
			} else {
				try {
					await fbase
						.auth()
						.createUserWithEmailAndPassword(email.value, password.value);
					history.push("/");
					alert(
						`Your password is ${password.value} and your logging email is ${email.value} REMEMBER TO SAVE IT!`
					);
				} catch (error) {
					alert(error);
				}
			}
		},
		[history]
	);

	return (
		<div className="signCenter">
			<h1>Sign up</h1>
			<Form onSubmit={handleSignUp}>
				<div className="formElement">
					<h3>Email </h3>
					<TextField name="email" type="email" placeholder="Email" />
				</div>
				<div className="formElement">
					<h3>Password</h3>
					<TextField name="password" type="password" placeholder="Password" />
				</div>
				<div className="formElement">
					<h3>Password</h3>
					<TextField name="password1" type="password" placeholder="Password" />
				</div>

				<div className="formSignin">
					<Button type="submit">Sign Up</Button>
				</div>
			</Form>
		</div>
	);
};

export default withRouter(SignUp);
