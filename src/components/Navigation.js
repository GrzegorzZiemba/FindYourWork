import React from "react";
import { withRouter, Link } from "react-router-dom";

import { LinkContainer } from "react-router-bootstrap";
import styles from "./Nav.module.css";
import "./EditJobForm.css";
import logo from "../images/logo.png";

const Navigation = ({ user }) => {
	return (
		<nav className={styles.navbar}>
			<div className={styles.container}>
				<div className={styles.logo}>
					<img src={logo}></img>
				</div>

				<div className={styles.buttons}>
					<LinkContainer to="/">
						<button className={styles.button}>Home</button>
					</LinkContainer>
					<LinkContainer to="/addnewjob">
						<button className={styles.button}>
							{user ? "Add new job offer" : "To add you need to login"}
						</button>
					</LinkContainer>
					<span className={styles.separator}></span>

					{user ? (
						<>
							<Link to="/signout" className={styles.nofocus}>
								<i className="fas fa-sign-out-alt fa-2x"></i>{" "}
								<p className={styles.paragraph}>Sign out</p>
							</Link>
						</>
					) : (
						<>
							<Link to="/login" className={styles.nofocus}>
								<i className="fas fa-sign-in-alt fa-2x"></i>{" "}
								<p className={styles.paragraph}>Sign in</p>
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default withRouter(Navigation);
