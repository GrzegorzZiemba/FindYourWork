import React from "react";
import { db } from "../firebase/firebase";

const DeleteData = ({ id }) => {
	return (
		<div>
			<button onClick={() => db.collection("workplaces").doc(id).delete()}>
				usun
			</button>
		</div>
	);
};

export default DeleteData;
