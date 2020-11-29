import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SignOut from "./SignOut";
import Login from "./Login";

// Private and public routes -> what is visible for them  - logged or not
// Make it look better :)
// better form to login -> alltogether look it better :D

const Navigation = ({ user, history }) => {
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container className="py-3 ml">
				<LinkContainer to="/">
					<Navbar.Brand>{user ? user.email : "Welcome"}</Navbar.Brand>
				</LinkContainer>
				<LinkContainer to="/addnewjob">
					<Navbar.Brand>Add new job offer</Navbar.Brand>
				</LinkContainer>
				{user ? (
					<LinkContainer to="/signout">
						<Navbar.Brand>Signout</Navbar.Brand>
					</LinkContainer>
				) : (
					<LinkContainer to="/login">
						<Navbar.Brand>Login</Navbar.Brand>
					</LinkContainer>
				)}

				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			</Container>
		</Navbar>
		// {/* <Navbar style={{ background: "#BD7028 ", border: "none" }}>
		// 	<Navbar.Brand href="/">NAV</Navbar.Brand>
		// 	<Nav className="mr-auto">
		// 		<Nav.Link
		// 			onClick={() => {
		// 				history.push("/");
		// 			}}
		// 		>
		// 			Home!
		// 		</Nav.Link>
		// 		<Nav.Link
		// 			onClick={() => {
		// 				history.push("/addnewjob");
		// 			}}
		// 		>
		// 			Post your offer !
		// 		</Nav.Link>
		// 	</Nav>

		// 	<Button style={{ background: "#F08E32 ", border: "none" }}>
		// 		{user ? user.email : ""}
		// 	</Button>
		// 	<SignOut />
		// </Navbar> */}
	);
};

export default withRouter(Navigation);
