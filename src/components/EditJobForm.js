import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { db, fbase } from "../firebase/firebase";
import { Form, Spinner } from "react-bootstrap";

import "./EditJobForm.css";
import "./AddJobForm.css";

import "./form.css";
import InputField from "./InputField";

const auth = fbase.auth();

const EditJobForm = () => {
	let { jobId } = useParams();
	const [work, setWork] = useState("");
	const [position, setPosition] = useState("");
	const [salary, setSalary] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const [city, setCity] = useState("");
	const thisJob = jobId;
	const uid = auth.currentUser?.uid ? auth.currentUser.uid : "";
	const history = useHistory();

	const callbackGetBack = (childData) => {
		setWork(childData);
	};
	const editItem = (e) => {
		e.preventDefault();
		db.collection("workplaces").doc(jobId).update({
			work: work,
			position: position,
			salary: salary,
			image: image,
			description: description,
			city: city,
		});
		console.log(work);
		history.push("/");
	};

	useEffect(() => {
		const docRef = db.collection("workplaces").doc(jobId);

		docRef
			.get()
			.then(function (doc) {
				if (doc.exists) {
					setWork(doc.data().work);
					setPosition(doc.data().position);
					setSalary(doc.data().salary);
					setImage(doc.data().image);
					setCity(doc.data().city);
					setDescription(doc.data().description);
				} else {
					console.log("No such document!");
				}
			})
			.catch(function (error) {
				console.log("Error getting document:", error);
			});
	}, []);

	return (
		<div>
			{console.log(`/offer/${thisJob}`)}
			{uid ? (
				<div class="l-form">
					<Form className="form" onSubmit={editItem}>
						<h1 class="form__title">Editing form</h1>
						<InputField
							name={" Workplace"}
							data={work}
							setChange={callbackGetBack}
						>
							{" "}
							value DDDD{" "}
						</InputField>
						<InputField
							name={"Position"}
							data={position}
							setChange={setPosition}
						/>
						<InputField
							name={"Salary"}
							data={salary}
							setChange={setSalary}
							type="number"
						/>
						<InputField name={"Image"} data={image} setChange={setImage} />

						<InputField name={"City"} data={city} setChange={setCity} />

						<InputField
							name={"Description"}
							data={description}
							setChange={setDescription}
							input={"textarea"}
						/>
						<input type="submit" class="form__button" value="Edit" />
					</Form>
				</div>
			) : (
				<div className="center">
					<Spinner animation="border" className="spiner" role="status">
						<span className="sr-only">Loading...</span>
					</Spinner>
				</div>
			)}
		</div>
	);
};

export default EditJobForm;
