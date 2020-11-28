import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { Form, Button } from "react-bootstrap";
import { TextField } from "@material-ui/core";

const EditJobForm = () => {
	let { jobId } = useParams();
	const [work, setWork] = useState("");
	const [position, setPosition] = useState("");
	const [salary, setSalary] = useState("");

	const editItem = (e) => {
		e.preventDefault();
		db.collection("workplaces").doc(jobId).update({
			work: work,
			position: position,
			salary: salary,
		});
		console.log(work);
	};

	useEffect(() => {
		console.log(jobId);
		const docRef = db.collection("workplaces").doc(jobId);

		docRef
			.get()
			.then(function (doc) {
				if (doc.exists) {
					setWork(doc.data().work);
					setPosition(doc.data().position);
					setSalary(doc.data().salary);
				} else {
					// doc.data() will be undefined in this case
					console.log("No such document!");
				}
			})
			.catch(function (error) {
				console.log("Error getting document:", error);
			});
	}, []);

	return (
		<div>
			<Form>
				<TextField
					id="standard-basic"
					label="image"
					type="text"
					placeholder={work}
					value={work}
					onChange={(e) => setWork(e.target.value)}
				/>
				<TextField
					id="standard-basic"
					label="image"
					type="text"
					placeholder={position}
					value={position}
					onChange={(e) => setPosition(e.target.value)}
				/>

				<TextField
					id="standard-basic"
					label="image"
					type="number"
					placeholder={salary}
					value={salary}
					onChange={(e) => setSalary(e.target.value)}
				/>

				<Button variant="primary" type="submit" onClick={editItem}>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default EditJobForm;
