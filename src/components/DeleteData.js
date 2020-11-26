import React from "react";
import { db } from "../firebase/firebase";
import { Badge, Button } from "react-bootstrap";

const DeleteData = ({ id }) => {
	return (
		<>
			<Button
				style={{ background: "#BD7028 ", border: "none" }}
				onClick={() => db.collection("workplaces").doc(id).delete()}
			>
				Delete
			</Button>{" "}
		</>
	);
};

export default DeleteData;
