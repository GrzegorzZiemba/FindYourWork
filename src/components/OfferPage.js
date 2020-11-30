import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { db, fbase } from "../firebase/firebase";

import ShowOffers from "./ShowOffers";
import "./EditJobForm.css";
import { Row, Col, Image, ListGroup, Card } from "react-bootstrap";

const auth = fbase.auth();

const OfferPage = () => {
	let { jobId } = useParams();
	const [work, setWork] = useState("");
	const [position, setPosition] = useState("");
	const [salary, setSalary] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const uid = auth.currentUser.uid;
	const history = useHistory();

	// const editItem = (e) => {
	// 	e.preventDefault();
	// 	db.collection("workplaces").doc(jobId).update({
	// 		work: work,
	// 		position: position,
	// 		salary: salary,
	// 		image: image,
	// 		description: description,
	// 	});
	// 	console.log(work);
	// 	history.push("/");
	// };

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
					setDescription(doc.data().description);
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
		<>
			<Link className="btn btn-light my-3" to="/">
				Go Back
			</Link>

			<Row>
				<Col md={6}>
					<Image src={image} alt={work} fluid />
				</Col>
				<Col md={3}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3>{work}</h3>
						</ListGroup.Item>

						<ListGroup.Item>Price: ${salary}</ListGroup.Item>
						<ListGroup.Item>Description: {description}</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<Row>
									<Col>Price:</Col>
									<Col>
										<strong>${salary}</strong>
									</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Status:</Col>
									<Col>"Is ?"</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OfferPage;
