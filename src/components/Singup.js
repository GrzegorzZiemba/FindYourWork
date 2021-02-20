import React, { useCallback } from "react";

import { withRouter } from "react-router";
import { fbase } from "../firebase/firebase";
import styles from "./Form.module.css";
import { Button } from "react-bootstrap";
// import Button from "./Button";
import swal from "sweetalert";

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
					swal(
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
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleSignUp}>
				<h1
					style={{ textAlign: "center", margin: "10px 0", flexBasis: "100%" }}
				>
					Sign up
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
				<div className={styles.div}>
					<input
						type="password"
						placeholder=" "
						className={styles.input}
						maxLength="50"
						name="password1"
						required
					/>
					<label for="" className={styles.label}>
						Repeat Password
					</label>
				</div>
				<div className={styles.div}>
					<Button type="submit">Sign Up</Button>
				</div>
			</form>
		</div>
	);
};

export default withRouter(SignUp);
