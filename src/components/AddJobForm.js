import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { db, fbase } from "../firebase/firebase";

import { useHistory } from "react-router-dom";
import "./AddJobForm.css";
import InputField from "./InputField";

const auth = fbase.auth();
let tillDate = new Date();
tillDate.setDate(tillDate.getDate() + 30);

const AddJobForm = () => {
	const [work, setWork] = useState("");
	const [position, setPosition] = useState("");
	const [salary, setSalary] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const [city, setCity] = useState("");
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
			city: city,
			activeTill: tillDate,
		});
		history.push("/");
	};
	// useEffect(() => {
	// 	auth.currentUser == null ? "" : auth.currentUser;
	// }, uid);

	return (
		<>
			{uid ? (
				<div class="l-form">
					<Form className="form" onSubmit={handleSubmit}>
						<InputField name={"Company Name"} data={work} setChange={setWork} />
						<InputField
							name={"Position"}
							data={position}
							setChange={setPosition}
						/>
						<InputField
							name={"Monthy salary"}
							data={salary}
							setChange={setSalary}
						/>
						<InputField
							name={"Image in pass in HtML"}
							data={image}
							setChange={setImage}
						/>
						<InputField name={"Location"} data={city} setChange={setCity} />
						<InputField
							name={"Description of the job"}
							data={description}
							setChange={setDescription}
							input="textarea"
						/>
						<input type="submit" class="form__button" value="Add Offer" />
					</Form>
				</div>
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
