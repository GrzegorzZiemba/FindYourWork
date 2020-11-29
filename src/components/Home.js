import React, { Component } from "react";
import ShowOffers from "./ShowOffers";
import { db, fbase } from "../firebase/firebase";
import "./ShowOffers.css";
require("dotenv").config();
class Home extends Component {
	constructor(props) {
		super(props);
		console.log("Konstruktor -> klasowy");
		this.handleChange = this.handleChange.bind(this);
	}

	state = {
		data: [],

		currentUser: null,
		pend: false,
	};

	componentDidMount() {
		console.log(db.collection("workplaces"));

		db.collection("workplaces").onSnapshot((snapshot) => {
			const fu = snapshot.docs.map((doc) => {
				console.log(doc);
				return doc.data();
			});
			console.log(snapshot.docs.map((doc) => doc.data()));
			this.setState({ data: fu });
		});

		fbase.auth().onAuthStateChanged((user) => {
			this.setState({ currentUser: user, pend: false });
		});
	}

	handleChange = (e) => {
		let nam = e.target.name;
		let val = e.target.value;
		this.setState({ [nam]: val });
	};

	render() {
		return (
			<div className="main">
				{console.log(this.state.data)}
				{this.state.data.map((item, index) => {
					console.log("home");
					return (
						<ShowOffers
							className="item"
							workplace={item.work}
							id={item.id}
							image={item.image}
							position={item.position}
							iden={item.uid}
						/>
					);
				})}
			</div>
		);
	}
}

export default Home;
