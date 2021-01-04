import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./EditJobForm.css";

const Navigation = ({ user }) => {
	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			bg="dark"
			variant="dark"
			className="nav"
		>
			<Container className="py-3 ml">
				<Nav>
					<Button>
						<Navbar.Brand>
							{user ? "You are logged!" : "You are not logged"}
						</Navbar.Brand>
					</Button>
				</Nav>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto">
						<LinkContainer to="/" className="navLink">
							<Button>
								<Navbar.Brand>Home</Navbar.Brand>
							</Button>
						</LinkContainer>
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
	);
};

export default withRouter(Navigation);
