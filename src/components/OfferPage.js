import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase/firebase";
import styles from "./offerPage.module.css";
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

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<div className={styles.imgContainer}>
					<img
						src={image}
						className={styles.img}
						onError={addDefaultSrc}
						alt="Cloudy Sky"
					/>
					<h1>{work}</h1>
				</div>
				<div className={styles.infoContainer}>
					<div className={styles.info}></div>
					<div className={styles.info}>
						<h3>Position </h3>
						<p>{position}</p>
					</div>
					<div className={styles.info}>
						<h3>Salary </h3>
						<p>{salary} $ per month</p>
					</div>
					<div className={styles.info}>
						<h3>City </h3>
						<p>{city}</p>
					</div>
					<div className={styles.info}>
						<h3>Description </h3>
						<p>{description}</p>
					</div>
					<div className={styles.info}>
						<h3>Expiry Date</h3>
						<p>
							{" "}
							<i class="far fa-calendar-alt"></i>{" "}
							{formatDate(activeTill) !== "NaN-NaN-NaN"
								? formatDate(activeTill)
								: " Offer is not valid "}
						</p>{" "}
					</div>
				</div>
				<Link className="btn btn-light my-3" to="/">
					Home
				</Link>
			</div>
			<div className={styles.map}>
				<Map city={city} work={work} />
			</div>
		</div>
	);
};

export default OfferPage;
