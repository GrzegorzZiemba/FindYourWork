import "firebase/auth";
import firebase from "firebase/app";
// import { Button } from "react-bootstrap";
import Button from "./Button";
import { Link } from "react-router-dom";
function SignOut() {
	const auth = firebase.auth();
	return auth.currentUser ? (
		<div className="signCenter">
			<h1>Wanna signout?</h1>
			<div className="signCenter">
				<a href="/">
					<Button
						// className="sign-out"
						// size="lg"
						onClick={auth.signOut()}
					>
						Yes
					</Button>
				</a>
				<Link to="/">
					{/* <Button className="sign-out" size="lg"> */}
					<Button>No</Button>
				</Link>
			</div>
		</div>
	) : (
		<>
			<h1 style={{ textAlign: "center", margin: "50px 0" }}>
				You sucessfully logout
			</h1>
		</>
	);
}
export default SignOut;
