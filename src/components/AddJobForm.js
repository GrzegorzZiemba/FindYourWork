import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { db, fbase } from "../firebase/firebase";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import "./AddJobForm.css";
import { TextareaAutosize } from "@material-ui/core";
const auth = fbase.auth();
const AddJobForm = () => {
	const [work, setWork] = useState("");
	const [position, setPosition] = useState("");
	const [salary, setSalary] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const history = useHistory();
	const { uid } = auth.currentUser == null ? "" : auth.currentUser;

	const handleSubmit = (e) => {
		e.preventDefault();
		const id = uuidv4();

		db.collection("workplaces").doc(id).set({
			work: work,
			position: position,
			salary: salary,
			image: image,
			id: id,
			uid: uid,
			description: description,
		});
		history.push("/");
	};
	useEffect(() => {
		const { uid } = auth.currentUser == null ? "" : auth.currentUser;
	}, uid);

	return (
		// <form onSubmit={submit}>

		<>
			{uid ? (
				<Form onSubmit={handleSubmit} className="oneByOne">
					{" "}
					<h5>Your company name</h5>
					<TextField
						id="standard-basic"
						label="Company Name"
						type="text"
						placeholder="Company Name"
						value={work}
						onChange={(e) => setWork(e.target.value)}
					/>
					<h5>Position are you looking for</h5>
					<TextField
						id="standard-basic"
						label="Position of the"
						type="text"
						placeholder="Who are you looking for ?"
						value={position}
						onChange={(e) => setPosition(e.target.value)}
					/>
					<h5>Salary</h5>
					<TextField
						id="standard-basic"
						label="Salary"
						type="number"
						placeholder="How much your future employee will earn?"
						value={salary}
						onChange={(e) => setSalary(e.target.value)}
					/>
					<h5>Your logo / Company img in the link</h5>
					<TextField
						id="standard-basic"
						label="image"
						type="text"
						placeholder="Put image src"
						value={image}
						onChange={(e) => setImage(e.target.value)}
					/>
					<h5>Description of the job </h5>
					<TextareaAutosize
						className="textArea"
						rowsMin={3}
						rowsMax={4}
						aria-label="maximum height"
						placeholder="What should future employee do ?"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<Button
						style={{ background: "#705439", border: "none" }}
						type="submit"
						onClick={handleSubmit}
						className="subButton"
					>
						Submit
					</Button>{" "}
				</Form>
			) : (
				""
			)}
		</>

		/* <input type="text" name="companyName" value={companyName} onChange={change}/>
            <input type="text" name="position" value={position} onChange={change}/>
            <input type="number" name="salary" value={salary} onChange={change}/> 
            <button type='submit'>ok</button> */
		// </form>
	);
};

export default AddJobForm;
