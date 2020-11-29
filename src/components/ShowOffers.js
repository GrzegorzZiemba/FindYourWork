import React from "react";
import { Button } from "react-bootstrap";
import { db, fbase } from "../firebase/firebase";
import { Link } from "react-router-dom";
import DeleteData from "./DeleteData";
import ImageHexa from "./ImageHexa";
import "./ShowOffers.css";

const auth = fbase.auth();
const { uid } = auth.currentUser == null ? "" : auth.currentUser;

const ShowOffers = ({ image, id, workplace, position, styleClass, iden }) => {
	console.log("left");
	return (
		<div className="main">
			<div className={styleClass}>
				<span className="line"></span>

				<ImageHexa
					image={
						image
							? image
							: "https://m.economictimes.com/thumb/msid-67969364,width-1200,height-900,resizemode-4,imgsize-90851/bee.jpg"
					}
				/>
				<h1 className="workplace"> {workplace} </h1>
				<h1 className="position" key={workplace}>
					{position}
				</h1>
				{uid == iden ? (
					<div className="buttons">
						<Link to={`/edit/${id}`}>
							<Button style={{ background: "#BD7028 ", border: "none" }}>
								Edit
							</Button>
						</Link>
						<DeleteData id={id} className="button" />
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default ShowOffers;
