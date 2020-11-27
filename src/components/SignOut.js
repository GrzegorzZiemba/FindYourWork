import "firebase/auth";
import firebase from "firebase/app";

function SignOut() {
	const auth = firebase.auth();
	return (
		auth.currentUser && (
			<button className="sign-out" onClick={() => auth.signOut()}>
				Sign Out
			</button>
		)
	);
}
export default SignOut;
