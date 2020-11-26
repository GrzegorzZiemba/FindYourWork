import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Nav, Navbar } from "react-bootstrap";

import Login from "./Login";

// Private and public routes -> what is visible for them  - logged or not
// Make it look better :)
// better form to login -> alltogether look it better :D

const Navigation = ({ user, history }) => {
	return (
		<div>
			<Navbar style={{ background: "#BD7028 ", border: "none" }}>
				<Navbar.Brand href="/">NAV</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link
						onClick={() => {
							history.push("/");
						}}
					>
						Home!
					</Nav.Link>
					<Nav.Link
						onClick={() => {
							history.push("/addnewjob");
						}}
					>
						Post your offer !
					</Nav.Link>
					<Nav.Link
						onClick={() => {
							history.push("/users");
						}}
					>
						Users
					</Nav.Link>
				</Nav>

				<Button style={{ background: "#F08E32 ", border: "none" }}>
					{user ? user.email : ""}
				</Button>
			</Navbar>
			<Login />
		</div>
	);
};

export default withRouter(Navigation);
