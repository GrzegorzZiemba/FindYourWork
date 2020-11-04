import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
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

				<Button variant="outline-info">Search</Button>
			</Navbar>
		</div>
	);
};

export default Navigation;
