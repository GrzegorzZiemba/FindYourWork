import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./EditJobForm.css";
import { Spinner } from "react-bootstrap";

const Map = ({ city }) => {
	const [pos, setPos] = useState([]);
	// const [citi, setCiti] = useState(city);
	const [isMap, setIsMap] = useState(false);
	const getData = () => {
		// setCiti(city);
		console.log(city);
		if (city) {
			console.log("doinciti");
			console.log(city);
			fetch(
				`https://nominatim.openstreetmap.org/search/${encodeURIComponent(
					city
				)}?format=json&addressdetails=1&limit=1&polygon_svg=1`
			)
				.then((res) => {
					if (res.ok) {
						return res.json();
					} else {
						throw new Error("Something went wrong");
					}
				})

				.then((data) => {
					if (data) {
						if (data[0] === undefined) {
							setPos([50.365, 18.871]);
							console.log("zrobilem ifa ");
						} else if (data[0].lat == null) {
							setPos([50.365, 18.871]);
						} else {
							setPos([data[0].lat, data[0].lon]);
						}
					} else {
						setPos([50.365, 18.871]);
					}
				})
				.then(console.log(pos + " THIS IS A POSITION !!"));
		}

		console.log(`this is a data ${pos}`);
	};

	// const getCoordinates = async () => {
	// 	await getData();
	// 	// console.log("data " + getData());
	// 	await setPos([obj[0].lat, obj[0].lon]);
	// };

	const waitForFetch = () => {
		setTimeout(() => {
			setIsMap(true);
		}, 2000);
	};

	useEffect(() => {
		getData();
		waitForFetch();
	});

	return (
		<>
			{/* <input name="city" onChange={(e) => setCity(e.target.value)}></input>
				<button onClick={() => getCoordinates()}>KLIK</button> */}

			{pos.length > 1 ? (
				<MapContainer center={pos} zoom={13} scrollWheelZoom={true}>
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
			) : !isMap ? (
				<div className="center">
					<Spinner animation="border" className="spiner" role="status">
						<span className="sr-only">Loading...</span>
					</Spinner>
				</div>
			) : (
				<MapContainer center={pos} zoom={13} scrollWheelZoom={true}>
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
			)}
		</>
	);
};

export default Map;
