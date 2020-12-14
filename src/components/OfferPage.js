import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { db, fbase } from "../firebase/firebase";

import "./EditJobForm.css";
import { Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import Map from "./Map";
// https://nominatim.openstreetmap.org/search/Bytom?format=json&addressdetails=1&limit=1&polygon_svg=1    -> To get format json in lang log
// later use https://leafletjs.com/reference-1.7.1.html -> to get map with lang log

const OfferPage = () => {
	let { jobId } = useParams();
	const [work, setWork] = useState("");
	const [position, setPosition] = useState("");
	const [salary, setSalary] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const [city, setCity] = useState("");
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

	const addDefaultSrc = (e) => {
		e.target.src =
			"https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png";
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
					setDescription(doc.data().description);
					setCity(doc.data().city);
				} else {
					// doc.data() will be undefined in this case
					console.log("No such document!");
				}
			})
			.catch(function (error) {
				console.log("Error getting document:", error);
			});
	}, []);

	console.log(city + "in the offerPage");

	return (
		<div className="flexcontainer">
			<div className="left">
				<Link className="btn btn-light my-3" to="/">
					Go Back + {city}
				</Link>
				<div className="box">
					<img
						src={image}
						onError={addDefaultSrc}
						className="imgbox"
						alt="Cloudy Sky"
					/>
					<div className="avatar">
						<img src={image} onError={addDefaultSrc} alt="Cloudy Sky" />
					</div>
				</div>

				<Col md={3}>
					<ListGroup variant="flush" className="rounder">
						<ListGroup.Item className="rounder">
							{" "}
							<h3>{work}</h3>
						</ListGroup.Item>

						<ListGroup.Item className="rounder">
							Price: ${salary}
						</ListGroup.Item>
						<ListGroup.Item className="rounder">
							Description: {description}
						</ListGroup.Item>
					</ListGroup>
				</Col>

				<Card>
					<ListGroup variant="flush" className="rounder">
						<ListGroup.Item className="rounder">
							<Row>
								<Col className="rounder">Price:</Col>
								<Col className="rounder">
									<strong>${salary}</strong>
								</Col>
							</Row>
						</ListGroup.Item>

						<ListGroup.Item className="rounder">
							<Row className="rounder">
								<Col className="rounder">Status:</Col>
								<Col className="rounder">"Is ?"</Col>
							</Row>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</div>
			<div className="map">
				<Map city={city} />
			</div>
		</div>
	);
};

export default OfferPage;
