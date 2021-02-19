import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { db, fbase } from "../../firebase/firebase";
import { Form, Spinner } from "react-bootstrap";

import styles from "../Form.module.css";

import InputField from "../InputField";

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

	const callbackSetWork = (childData) => {
		setWork(childData);
	};

	const callbackSetPosition = (childData) => {
		setPosition(childData);
	};
	const callbackSetSalary = (childData) => {
		setSalary(childData);
	};
	const callbackSetImage = (childData) => {
		setImage(childData);
	};
	const callbackSetDescription = (childData) => {
		setDescription(childData);
	};
	const callbackSetCity = (childData) => {
		setCity(childData);
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
				<div className={styles.container}>
					<Form className="form" onSubmit={editItem}>
						<h1 class="form__title">Editing form</h1>
						<InputField
							name={" Workplace"}
							data={work}
							setChange={callbackSetWork}
						>
							{" "}
							value DDDD{" "}
						</InputField>
						<InputField
							name={"Position"}
							data={position}
							setChange={callbackSetPosition}
						/>
						<InputField
							name={"Salary"}
							data={salary}
							setChange={callbackSetSalary}
							type="number"
						/>
						<InputField
							name={"Image"}
							data={image}
							setChange={callbackSetImage}
						/>

						<InputField name={"City"} data={city} setChange={callbackSetCity} />

						<InputField
							name={"Description"}
							data={description}
							setChange={callbackSetDescription}
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
