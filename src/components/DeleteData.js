import React from "react";
import { db } from "../firebase/firebase";
import { Badge, Button } from "react-bootstrap";

const DeleteData = ({ id }) => {
	return (
		<>
			<Button
				variant="primary"
				onClick={() => db.collection("workplaces").doc(id).delete()}
			>
				to Primary
			</Button>{" "}
			<Badge variant="secondary">xD</Badge>
		</>
	);
};

export default DeleteData;
