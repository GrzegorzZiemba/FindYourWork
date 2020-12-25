import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SignOut from "./SignOut";
import Login from "./Login";
import { TextareaAutosize } from "@material-ui/core";
import "./EditJobForm.css";

// Private and public routes -> what is visible for them  - logged or not
// Make it look better :)
// better form to login -> alltogether look it better :D

const Navigation = ({ user, history }) => {
	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			bg="dark"
			variant="dark"
			className="nav"
		>
			<Container className="py-3 ml">
				<LinkContainer to="/">
					<Button>
						<Navbar.Brand>{user ? "You are logged!" : "Welcome"}</Navbar.Brand>
					</Button>
				</LinkContainer>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto">
						<LinkContainer to="/addnewjob" className="navLink">
							<Button>
								<Navbar.Brand>Add new job offer</Navbar.Brand>
							</Button>
						</LinkContainer>
						{user ? (
							<LinkContainer to="/signout" className="navLink">
								<Button>
									<Navbar.Brand>Signout</Navbar.Brand>
								</Button>
							</LinkContainer>
						) : (
							<LinkContainer to="/login" className="navLink">
								<Button>
									<Navbar.Brand>Login</Navbar.Brand>
								</Button>
							</LinkContainer>
						)}
					</Nav>
				</Navbar.Collapse>
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
