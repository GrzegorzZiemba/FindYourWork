import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { db, fbase } from "./firebase/firebase";
import AddJobForm from "./components/AddJobForm";
import EditJobForm from "./components/EditJobForm";
import Navigation from "./components/Navigation";
import Singup from "./components/Singup";
import ShowOffers from "./components/ShowOffers";
import Home from "./components/Home";

require("dotenv").config();
const auth = fbase.auth();
const { uid } = auth.currentUser == null ? "" : auth.currentUser;

class App extends Component {
	state = {
		data: [],

		currentUser: null,
		pend: false,
	};
	componentDidMount() {
		fbase.auth().onAuthStateChanged((user) => {
			this.setState({ currentUser: user, pend: false });
		});
	}
	componentDidUpdate() {
		const { uid } = auth.currentUser == null ? "" : auth.currentUser;
		console.log(`uid  ${uid} `);
	}

	render() {
		return (
			<div className="App">
				<Router>
					<div>
						<Navigation user={this.state.currentUser} />

						<Switch>
							<Route path="/addnewjob">{uid != "" ? <AddJobForm /> : ""}</Route>
							<Route path="/users">Users</Route>
							<Route path="/" component={Home} exact />

							<Route path="/signup" component={Singup} exact />
							<Route path="/edit/:jobId" exact>
								<EditJobForm />
							</Route>
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
