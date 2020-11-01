import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { db } from "./firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import AddJobForm from "./components/AddJobForm";
import EditJobForm from "./components/EditJobForm";

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
		// console.log('Component Did Mount')
		// // fetch('https://findyourwork-95deb.firebaseio.com/kolekcjadruga.json', {method: 'POST', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify([{wokrplace: 'nazwa miejsca'},{workplace:'2'},{workplace:'3'}])})
		// fetch('https://findyourwork-95deb.firebaseio.com/kolekcjadruga.json')
		//   .then(response => response.json())
		//   .then(data => {
		//     console.log(data)
		//     // this.setState({data: data})
		//   })
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

	// componentDidUpdate() {
	// 	console.log("COMPONENT DID UPDATE");
	// }

	handleChange = (e) => {
		let nam = e.target.name;
		let val = e.target.value;
		this.setState({ [nam]: val });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const id = uuidv4();
		console.log(this.state.salary);
		db.collection("workplaces").doc(id).set({
			work: this.state.companyName,
			position: this.state.position,
			salary: this.state.salary,
			id: id,
		});
	};

	editItem = (item) => {};
	render() {
		// console.log('Render')
		// const keys = Object.keys(this.state.data)
		// console.log(keys)

		console.log(this.state.value);

		return (
			<div className="App">
				<Router>
					<div>
						<nav>
							<ul>
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to="/addnewjob">Post your offer</Link>
								</li>
								<li>
									<Link to="/users">Users</Link>
								</li>
							</ul>
						</nav>

						{/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
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
							</>
						);
					})}
				</Router>
			</div>
		);
	}
}

export default App;
