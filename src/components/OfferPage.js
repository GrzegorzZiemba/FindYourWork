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
	const [pos, setPos] = useState();
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

	const getData = async () => {
		console.log(`city on the getData ${city}`);
		let obj;
		console.log(
			`https://nominatim.openstreetmap.org/search/${city}?format=json&addressdetails=1&limit=1&polygon_svg=1`
		);
		const res = await fetch(
			`https://nominatim.openstreetmap.org/search/${city}?format=json&addressdetails=1&limit=1&polygon_svg=1`
		);
		const data = await res.json();

		await setObj(data);
		// .then((data) => setObj(data))
		// .then(() => console.log(obj + " this is data"));

		console.log(obj);
	};

	const getCoordinates = async () => {
		await getData();
		await setPos([obj[0].lat, obj[0].lon]);
	};
	console.log(city);
	return (
		<div className="flexcontainer">
			<div>
				<Link className="btn btn-light my-3" to="/">
					Go Back
				</Link>
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
			</div>
			<div className="map">
				{/* <input name="city" onChange={(e) => setCity(e.target.value)}></input>
				<button onClick={() => getCoordinates()}>KLIK</button> */}

				<MapContainer
					center={pos ? pos : [50.2598987, 19.0215852]}
					zoom={13}
					scrollWheelZoom={false}
				>
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={pos ? pos : [50.2598987, 19.0215852]}>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker>
				</MapContainer>
			</div>
		</div>
	);
};

export default OfferPage;
