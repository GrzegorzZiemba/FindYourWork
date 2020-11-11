import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { fbase } from "../firebase/firebase";
import Login from "./Login";

var user = fbase.auth().currentUser;

fbase.auth().onAuthStateChanged(function (user) {
	if (user) {
		// User is signed in.
	} else {
		// No user is signed in.
	}
});

const Navigation = () => {
	return (
		<div>
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="/">Navbar</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="/">Home</Nav.Link>
					<Nav.Link href="/addnewjob">Post your offer !</Nav.Link>
					<Nav.Link href="/users">Users</Nav.Link>
				</Nav>

				<Button variant="outline-info">{user ? user.email : ""}</Button>
			</Navbar>
			<Login />
		</div>
	);
};

export default Navigation;
