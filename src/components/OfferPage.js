import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { db, fbase } from "../firebase/firebase";

import "./EditJobForm.css";
import { Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import Map from "./Map";
// https://nominatim.openstreetmap.org/search/Bytom?format=json&addressdetails=1&limit=1&polygon_svg=1    -> To get format json in lang log
// later use https://leafletjs.com/reference-1.7.1.html -> to get map with lang log
let today = new Date();
today.setDate(today.getDate());
const OfferPage = ({ job }) => {
	console.log(`${job} JOB :D`);
	let { jobId } = useParams();
	console.log(`${jobId} ? JOB ID ?`);
	if (!jobId) {
		jobId = job;
	}
	const [work, setWork] = useState("");
	const [position, setPosition] = useState("");
	const [salary, setSalary] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const [city, setCity] = useState("");
	const [activeTill, setActiveTill] = useState("");
	const history = useHistory();

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
					setActiveTill(doc.data().activeTill.toDate());
				} else {
					// doc.data() will be undefined in this case
					console.log("No such document!");
				}
			})
			.catch(function (error) {
				console.log("Error getting document:", error);
			});
	}, []);

	function formatDate(date) {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [year, month, day].join("-");
	}

	console.log(city + "in the offerPage");
	console.log(activeTill + " TIll");

	return activeTill > today ? (
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
					<ListGroup variant="flush">
						<Row className="rounder">
							<ListGroup.Item>
								<h3>{work}</h3>
							</ListGroup.Item>
						</Row>
						<Row className="rounder">
							<ListGroup.Item>Salary: ${salary}</ListGroup.Item>
						</Row>
						<Row className="rounder-description">
							<ListGroup.Item className="description">
								Description: {description}
							</ListGroup.Item>
							<ListGroup.Item className="description">
								Active till: {formatDate(activeTill)}
							</ListGroup.Item>
						</Row>
					</ListGroup>
				</Col>

				{/* <Card>
				<ListGroup variant="flush" className="rounder">
					<ListGroup.Item>
						<Row>
							<Col className="rounder">Price:</Col>
							<Col className="rounder">
								<strong>${salary}</strong>
							</Col>
						</Row>
					</ListGroup.Item>

					<ListGroup.Item>
						<Row className="rounder">
							<Col className="rounder">Status:</Col>
							<Col className="rounder">Active till: {activeTill.day}</Col>
						</Row>
					</ListGroup.Item>
				</ListGroup>
			</Card> */}
			</div>
			<div className="map">
				<Map city={city} />
			</div>
		</div>
	) : (
		<div>
			<h1>This offer is unavailable</h1>
		</div>
	);
};

export default OfferPage;
