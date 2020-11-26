import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase/firebase";
import TextField from "@material-ui/core/TextField";

const AddJobForm = () => {
	const [work, setWork] = useState("");
	const [position, setPosition] = useState("");
	const [salary, setSalary] = useState("");
	const [image, setImage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const id = uuidv4();

		db.collection("workplaces").doc(id).set({
			work: work,
			position: position,
			salary: salary,
			image: image,
			id: id,
		});
	};

	return (
		// <form onSubmit={submit}>
		<Form onSubmit={handleSubmit}>
			<TextField
				id="standard-basic"
				label="Company Name"
				type="text"
				placeholder="Company Name"
				value={work}
				onChange={(e) => setWork(e.target.value)}
			/>
			<TextField
				id="standard-basic"
				label="Position of the"
				type="text"
				placeholder="Who are you looking for ?"
				value={position}
				onChange={(e) => setPosition(e.target.value)}
			/>
			<TextField
				id="standard-basic"
				label="Salary"
				type="number"
				placeholder="How much your future employee will earn?"
				value={salary}
				onChange={(e) => setSalary(e.target.value)}
			/>
			<TextField
				id="standard-basic"
				label="image"
				type="text"
				placeholder="Put image src"
				value={image}
				onChange={(e) => setImage(e.target.value)}
			/>
			<Button
				style={{ background: "#705439", border: "none" }}
				type="submit"
				onClick={handleSubmit}
			>
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
