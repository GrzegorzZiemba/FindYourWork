import React from "react";
import { db } from "../firebase/firebase";
import { Redirect } from "react-router-dom";
import { Badge, Button, Form } from "react-bootstrap";

const DeleteData = ({ id }) => {
	return (
		<>
			<Button
				variant="primary"
				onClick={() => db.collection("workplaces").doc(id).delete()}
				href="/"
			>
				to Primary
			</Button>{" "}
			<Badge variant="secondary">xD</Badge>
		</>
	);
};

export default DeleteData;
