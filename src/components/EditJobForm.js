import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { Form, Button } from "react-bootstrap";

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
	return (
		<div>
			<Form>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Company name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Company Name"
						value={work}
						onChange={(e) => setWork(e.target.value)}
					/>
					<Form.Text className="text-muted">
						Your company name is very important for us, let your future employee
						know who you are ! :)
					</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Position</Form.Label>
					<Form.Control
						type="text"
						placeholder="Who are you looking for ?"
						value={position}
						onChange={(e) => setPosition(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					<Form.Label>Salary</Form.Label>
					<Form.Control
						type="number"
						placeholder="How much your future employee will earn?"
						value={salary}
						onChange={(e) => setSalary(e.target.value)}
					/>
				</Form.Group>
				<Button variant="primary" type="submit" onClick={editItem}>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default EditJobForm;
