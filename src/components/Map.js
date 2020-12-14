import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./EditJobForm.css";
import L from "leaflet";

const Map = ({ city }) => {
	const [pos, setPos] = useState([]);
	const [flag, setFlag] = useState(true);
	const [citi, setCiti] = useState(city);

	const getData = () => {
		setCiti(city);
		console.log(city);
		if (city) {
			console.log("doinciti");
			console.log(city);
			fetch(
				`https://nominatim.openstreetmap.org/search/${city}?format=json&addressdetails=1&limit=1&polygon_svg=1`
			)
				.then((res) => {
					console.log(
						`https://nominatim.openstreetmap.org/search/${city}?format=json&addressdetails=1&limit=1&polygon_svg=1`
					);
					return res.json();
				})
				.then((data) => {
					console.log(data);
					setPos([data[0].lat, data[0].lon]);
				});
		}

		console.log(`this is a data ${pos}`);
	};

	// const getCoordinates = async () => {
	// 	await getData();
	// 	// console.log("data " + getData());
	// 	await setPos([obj[0].lat, obj[0].lon]);
	// };

	useEffect(() => {
		getData();
	}, [city]);

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
			) : (
				<h1>Dupa</h1>
			)}
		</>
	);
};

export default Map;
