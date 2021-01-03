import React, { useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import { withRouter } from "react-router";
import { fbase } from "../firebase/firebase";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert";
import "./form.css";

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
			<div class="l-form">
				<Form className="form" onSubmit={handleSignUp}>
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
					<div className="form__div">
						<input
							type="password"
							placeholder=" "
							className="form__input"
							maxLength="50"
							name="password1"
							required
						/>
						<label for="" className="form__label">
							Repeat Password
						</label>
					</div>

					<div className="formSignin">
						<Button type="submit">Sign Up</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default withRouter(SignUp);
