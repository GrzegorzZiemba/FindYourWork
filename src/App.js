import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { db } from "./firebase/firebase";
import AddJobForm from "./components/AddJobForm";
import EditJobForm from "./components/EditJobForm";
import DeleteData from "./components/DeleteData";
import Navigation from "./components/Navigation";
import Singup from "./components/Singup";

require("dotenv").config();

class App extends Component {
	constructor(props) {
		super(props);
		console.log("Konstruktor -> klasowy");
		this.handleChange = this.handleChange.bind(this);
	}

	state = {
		data: [],
		companyName: "",
		position: "",
		salary: 0,
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
						<Navigation />

						<Switch>
							<Route path="/addnewjob">
								<AddJobForm
									submit={this.handleSubmit}
									change={this.handleChange}
									companyName={this.state.companyName}
									position={this.state.position}
									salary={this.state.salary}
								/>
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
								<h1 key={index}>{item.work}</h1>
								<Link to={`/edit/${item.id}`}>Edit</Link>
								<DeleteData id={item.id} />
							</>
						);
					})}
				</Router>
			</div>
		);
	}
}

export default App;
