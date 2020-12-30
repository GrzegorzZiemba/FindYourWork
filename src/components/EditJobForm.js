import React, { useState, useEffect } from "react";
import { Link, Route, useHistory, useParams } from "react-router-dom";
import { db, fbase } from "../firebase/firebase";
import { Form, Button } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import ShowOffers from "./ShowOffers";
import "./EditJobForm.css";
import "./AddJobForm.css";
import { LinkContainer } from "react-router-bootstrap";
import OfferPage from "./OfferPage";

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
					<Form className="oneByOne">
						<h5>Workplace</h5>
						<input
							className="inputField"
							type="text"
							placeholder={work}
							value={work}
							onChange={(e) => setWork(e.target.value)}
						/>
						<h5>Position</h5>
						<input
							className="inputField"
							type="text"
							placeholder={position}
							value={position}
							onChange={(e) => setPosition(e.target.value)}
						/>
						<h5>Salary</h5>
						<input
							className="inputField"
							type="number"
							placeholder={salary}
							value={salary}
							onChange={(e) => setSalary(e.target.value)}
						/>
						<h5>Image</h5>
						<input
							className="inputField"
							type="text"
							placeholder={image}
							value={image}
							onChange={(e) => setImage(e.target.value)}
						/>
						<h5>Description</h5>
						<input
							className="inputField"
							type="text"
							placeholder={description}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<h5>City</h5>
						<input
							className="inputField"
							type="text"
							placeholder={city}
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
						<Button variant="primary" type="submit" onClick={editItem}>
							Submit
						</Button>
					</Form>

					<LinkContainer to={`/offer/${thisJob}`}>
						<OfferPage job={thisJob} />
					</LinkContainer>
				</React.Fragment>
			) : (
				<p> NOtHinG</p>
			)}
		</div>
	);
};

export default EditJobForm;
