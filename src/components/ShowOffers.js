import React, { useEffect } from "react";
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
import "./ShowOffers.css";
import { makeStyles } from "@material-ui/core/styles";

const auth = fbase.auth();

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 140,
	},
});

const ShowOffers = ({ image, id, workplace, position, styleClass, iden }) => {
	const classes = useStyles();
	const user = fbase.auth().currentUser;
	let { uid } = auth.currentUser == null ? "" : auth.currentUser;
	fbase.auth().onAuthStateChanged(function (user) {
		if (user != null) {
			uid = user.uid;
		} else {
			uid = "Unknown";
		}
	});
	useEffect(() => {
		const { uid } = auth.currentUser == null ? "" : auth.currentUser;
	}, uid);
	console.log(`iden ${iden}`);
	return (
		<div className="main">
			<Card className={classes.root}>
				<CardActionArea>
					<CardMedia
						className={classes.media}
						image={image}
						title={workplace}
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{workplace}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{position}
						</Typography>
					</CardContent>
				</CardActionArea>

				{uid == iden && uid != "" ? (
					<CardActions>
						<Link to={`/edit/${id}`}>
							<Button size="small" color="primary">
								Edit
							</Button>
						</Link>
						<DeleteData id={id} className="button" />
					</CardActions>
				) : (
					<div>{console.log(uid, iden)}</div>
				)}
			</Card>
		</div>
	);
};

export default ShowOffers;
