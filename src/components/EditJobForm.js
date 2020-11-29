import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { db, fbase } from "../firebase/firebase";
import { Form, Button } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import ShowOffers from "./ShowOffers";
import "./EditJobForm.css";

const auth = fbase.auth();

const EditJobForm = () => {
	let { jobId } = useParams();
	const [work, setWork] = useState("");
	const [position, setPosition] = useState("");
	const [salary, setSalary] = useState("");
	const [image, setImage] = useState("");
	const uid = auth.currentUser.uid;
	const history = useHistory();

	const editItem = (e) => {
		e.preventDefault();
		db.collection("workplaces").doc(jobId).update({
			work: work,
			position: position,
			salary: salary,
			image: image,
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
	console.log(uid);

	return (
		<div>
			{uid ? (
				<React.Fragment className="oneByOne">
					<Form className="oneByOne">
						<TextField
							id="standard-basic"
							type="text"
							placeholder={work}
							value={work}
							onChange={(e) => setWork(e.target.value)}
						/>
						<TextField
							id="standard-basic"
							type="text"
							placeholder={position}
							value={position}
							onChange={(e) => setPosition(e.target.value)}
						/>

						<TextField
							id="standard-basic"
							type="number"
							placeholder={salary}
							value={salary}
							onChange={(e) => setSalary(e.target.value)}
						/>

						<TextField
							id="standard-basic"
							type="text"
							placeholder={image}
							value={image}
							onChange={(e) => setImage(e.target.value)}
						/>
						<Button variant="primary" type="submit" onClick={editItem}>
							Submit
						</Button>
					</Form>
					<ShowOffers orkplace={work} image={image} position={position} />
				</React.Fragment>
			) : (
				<p> NOtHinG</p>
			)}
		</div>
	);
};

export default EditJobForm;
