import React, { useState, useEffect } from "react";
import { Link, Route, useHistory, useParams } from "react-router-dom";
import { db, fbase } from "../firebase/firebase";
import { Form, Button } from "react-bootstrap";
import { Input, TextField } from "@material-ui/core";
import ShowOffers from "./ShowOffers";
import "./EditJobForm.css";
import "./AddJobForm.css";
import { LinkContainer } from "react-router-bootstrap";
import OfferPage from "./OfferPage";
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
	const uid = auth.currentUser.uid;
	const history = useHistory();

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
				} else {
					// doc.data() will be undefined in this case
					console.log("No such document!");
				}
			})
			.catch(function (error) {
				console.log("Error getting document:", error);
			});
	}, []);
	console.log(`${uid} and ${thisJob}`);

	return (
		<div>
			{console.log(`/offer/${thisJob}`)}
			{uid ? (
				<React.Fragment className="oneByOne">
					<Form className="form">
						<h1 class="form__title">Sign In</h1>
						<InputField name={" Workplace"} data={work} setChange={setWork} />
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
						<input
							type="submit"
							class="form__button"
							value="Sign In"
							onClick={editItem}
						/>
					</Form>

					{/* <LinkContainer to={`/offer/${thisJob}`}>
						<OfferPage job={thisJob} />
					</LinkContainer> */}
				</React.Fragment>
			) : (
				<p> NOtHinG</p>
			)}
		</div>
	);
};

export default EditJobForm;
