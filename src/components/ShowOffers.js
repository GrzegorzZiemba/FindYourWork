import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteData from "./DeleteData";
import ImageHexa from "./ImageHexa";
import "./ShowOffers.css";

const ShowOffers = ({ image, id, workplace, position }) => {
	return (
		<div className="main">
			<div className="outOffer">
				<span className="line"></span>

				<ImageHexa
					image={image ? image : "http://csshexagon.com/img/meow.jpg"}
				/>
				<h1 className="workplace"> {workplace} </h1>
				<h1 className="position" key={workplace}>
					{position}
				</h1>
				<div className="buttons">
					<Link to={`/edit/${id}`}>Edit</Link>
					<DeleteData id={id} />
				</div>
			</div>
		</div>
	);
};

export default ShowOffers;
