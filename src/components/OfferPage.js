import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { db, fbase } from "../firebase/firebase";

import ShowOffers from "./ShowOffers";
import "./EditJobForm.css";
import { Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// https://nominatim.openstreetmap.org/search/Bytom?format=json&addressdetails=1&limit=1&polygon_svg=1    -> To get format json in lang log
// later use https://leafletjs.com/reference-1.7.1.html -> to get map with lang log

const OfferPage = () => {
	let { jobId } = useParams();
	const [work, setWork] = useState("");
	const [position, setPosition] = useState("");
	const [salary, setSalary] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const [obj, setObj] = useState();

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

	const getData = () => {
		let obj;
		fetch(
			"https://nominatim.openstreetmap.org/search/Katowice?format=json&addressdetails=1&limit=1&polygon_svg=1 "
		)
			.then((res) => res.json())
			.then((data) => setObj(data))
			.then(() => {
				console.log(obj);
			});
		console.log(obj);
	};
	const pos = [51.505, -0.09];

	return (
		<>
			<button onClick={() => getData()}>KLIK</button>
			<Link className="btn btn-light my-3" to="/">
				Go Back {obj ? `${obj[0].lat} ${obj[0].lon}` : ""}
			</Link>
			{/* 
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
			</Row> */}
			<MapContainer center={pos} zoom={13} scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={pos}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
			,
		</>
	);
};

export default OfferPage;
