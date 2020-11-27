import React, { Component } from "react";
import ShowOffers from "./ShowOffers";
import { db, fbase } from "../firebase/firebase";

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
			<>
				{this.state.data.map((item, index) => {
					console.log(index);
					return (
						<>
							<ShowOffers
								workplace={item.work}
								id={item.id}
								image={item.image}
								position={item.position}
								styleClass="right"
							/>
						</>
					);
				})}
			</>
		);
	}
}

export default Home;