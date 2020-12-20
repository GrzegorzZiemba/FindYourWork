import "firebase/auth";
import firebase from "firebase/app";
import { Button } from "react-bootstrap";
import "./EditJobForm.css";
import { Link } from "react-router-dom";
function SignOut() {
	const auth = firebase.auth();
	return (
		auth.currentUser && (
			<div className="signCenter">
				<h1>Are you sure u wanna sign out?</h1>
				<div>
					<a href="/">
						<Button className="sign-out" onClick={() => auth.signOut()}>
							Yes
						</Button>
					</a>
					<Link to="/">
						<Button className="sign-out" size="lg">
							No
						</Button>
					</Link>
				</div>
			</div>
		)
	);
}
export default SignOut;
