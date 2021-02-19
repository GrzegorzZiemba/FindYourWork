import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styles from "./Nav.module.css";
import "./EditJobForm.css";

const Navigation = ({ user }) => {
	return (
		<nav className={styles.navbar}>
			<div className={styles.container}>
				<div className={styles.logo}>LogoHere</div>

				<div className={styles.buttons}>
					<LinkContainer to="/" className={styles.nofocus}>
						<button className={styles.button}>Home</button>
					</LinkContainer>
					<LinkContainer to="/addnewjob" className={styles.nofocus}>
						<button className={styles.button}>
							{user ? "Add new job offer" : "To add you need to login"}
						</button>
					</LinkContainer>
					<span className={styles.separator}></span>

					{user ? (
						<>
							<Link to="/signout" className={styles.nofocus}>
								<i className="fas fa-sign-out-alt fa-2x"></i>{" "}
								<p className={styles.paragraph}>Signout</p>
							</Link>
						</>
					) : (
						<>
							<Link to="/login" className={styles.nofocus}>
								<i className="fas fa-sign-in-alt fa-2x"></i>{" "}
								<p className={styles.paragraph}>Signin</p>
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
		// <Navbar
		// 	collapseOnSelect
		// 	expand="lg"
		// 	bg="dark"
		// 	variant="dark"
		// 	className="nav"
		// >
		// 	<Container className="py-3 ml">
		// 		<Nav>
		// 			<Button>
		// 				<Navbar.Brand>
		// 					{user ? "You are logged!" : "You are not logged"}
		// 				</Navbar.Brand>
		// 			</Button>
		// 		</Nav>
		// 		<Navbar.Toggle aria-controls="responsive-navbar-nav" />
		// 		<Navbar.Collapse id="responsive-navbar-nav">
		// 			<Nav className="ml-auto">
		// 				<LinkContainer to="/" className="navLink">
		// 					<Button>
		// 						<Navbar.Brand>Home</Navbar.Brand>
		// 					</Button>
		// 				</LinkContainer>
		// 				<LinkContainer to="/addnewjob" className="navLink">
		// 					<Button>
		// 						<Navbar.Brand>Add new job offer</Navbar.Brand>
		// 					</Button>
		// 				</LinkContainer>
		// 				{user ? (
		// 					<LinkContainer to="/signout" className="navLink">
		// 						<Button>
		// 							<Navbar.Brand>Signout</Navbar.Brand>
		// 						</Button>
		// 					</LinkContainer>
		// 				) : (
		// 					<LinkContainer to="/login" className="navLink">
		// 						<Button>
		// 							<Navbar.Brand>Login</Navbar.Brand>
		// 						</Button>
		// 					</LinkContainer>
		// 				)}
		// 			</Nav>
		// 		</Navbar.Collapse>
		// 	</Container>
		// </Navbar>
	);
};

export default withRouter(Navigation);
