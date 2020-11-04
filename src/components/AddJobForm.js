import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase/firebase";

const AddJobForm = ({ submit }) => {
	const [work, setWork] = useState("");
	const [position, setPosition] = useState("");
	const [salary, setSalary] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const id = uuidv4();

		db.collection("workplaces").doc(id).set({
			work: work,
			position: position,
			salary: salary,
			id: id,
		});
	};

	return (
		// <form onSubmit={submit}>
		<Form onSubmit={handleSubmit}>
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
			<Button variant="primary" type="submit" onClick={handleSubmit}>
				Submit
			</Button>
		</Form>
		/* <input type="text" name="companyName" value={companyName} onChange={change}/>
            <input type="text" name="position" value={position} onChange={change}/>
            <input type="number" name="salary" value={salary} onChange={change}/> 
            <button type='submit'>ok</button> */
		// </form>
	);
};

export default AddJobForm;
