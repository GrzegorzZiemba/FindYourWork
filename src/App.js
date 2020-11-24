import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { db, fbase } from "./firebase/firebase";
import AddJobForm from "./components/AddJobForm";
import EditJobForm from "./components/EditJobForm";
import DeleteData from "./components/DeleteData";
import Navigation from "./components/Navigation";
import Singup from "./components/Singup";
import ImageHexa from "./components/ImageHexa";
import ShowOffers from "./components/ShowOffers";

require("dotenv").config();

class App extends Component {
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
		console.log(this.state.value);

		return (
			<div className="App">
				<Router>
					<div>
						<Navigation user={this.state.currentUser} />

						<Switch>
							<Route path="/addnewjob">
								<AddJobForm />
							</Route>
							<Route path="/users">Users</Route>
							<Route path="/" exact>
								Home
							</Route>
							<Route path="/signup" component={Singup} />
							<Route path="/edit/:jobId" exact>
								<EditJobForm />
							</Route>
						</Switch>
					</div>
					{this.state.data.map((item, index) => {
						console.log(item);
						return (
							<>
								<ShowOffers
									workplace={item.work}
									id={item.id}
									image={item.image}
									position={item.position}
								/>
							</>
						);
					})}
				</Router>
			</div>
		);
	}
}

export default App;
