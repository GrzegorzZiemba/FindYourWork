import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { db, fbase } from "../firebase/firebase";
import { Link } from "react-router-dom";
import DeleteData from "./DeleteData";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { LinkContainer } from "react-router-bootstrap";

import { makeStyles } from "@material-ui/core/styles";

const auth = fbase.auth();
let today = new Date();
today.setDate(today.getDate());
const useStyles = makeStyles({
	root: {
		width: 345,
		margin: 20,
	},
	media: {
		height: 140,
	},
});

const ShowOffers = ({ image, id, workplace, position, iden }) => {
	const classes = useStyles();
	const [activeTill, setActiveTill] = useState("");

	let { uid } = auth.currentUser == null ? "" : auth.currentUser;
	fbase.auth().onAuthStateChanged(function (user) {
		if (user != null) {
			uid = user.uid;
		} else {
			uid = "Unknown";
		}
	});

	useEffect(() => {
		const docRef = db.collection("workplaces").doc(id);

		docRef
			.get()
			.then(function (doc) {
				if (doc.exists) {
					setActiveTill(doc.data().activeTill.toDate());
				} else {
					// doc.data() will be undefined in this case
					console.log("No such document!");
				}
			})
			.catch(function (error) {
				console.log("Error getting document:", error);
			});
	}, [uid]);

	return (
		<Card className={classes.root}>
			<LinkContainer to={`/offer/${id}`}>
				<CardActionArea>
					<CardMedia
						className={classes.media}
						image={
							image ? image : "https://www.w3schools.com/w3css/img_lights.jpg"
						}
						title={workplace}
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{activeTill > today
								? workplace
								: "Work offer is disabled, due to expiriation date"}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{position}
						</Typography>
					</CardContent>
				</CardActionArea>
			</LinkContainer>
			{uid === iden && uid !== "" ? (
				<CardActions>
					<Link to={`/edit/${id}`}>
						{activeTill > today ? (
							<Button size="small" color="primary">
								Edit
							</Button>
						) : (
							<Button size="small" color="primary" disabled>
								Edit
							</Button>
						)}
					</Link>
					<DeleteData id={id} className="button" />
				</CardActions>
			) : (
				<div>{console.log(uid, iden)}</div>
			)}
		</Card>
	);
};

export default ShowOffers;
