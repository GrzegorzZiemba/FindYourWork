import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {db} from './firebase/firebase'

require('dotenv').config();

class App extends Component {
  constructor(props){
    super(props)
    console.log("Konstruktor -> klasowy")
   this.handleChange = this.handleChange.bind(this)
  }
  
  
  state = {
    data: [],
    companyName: '',
    position:'',
    salary:0,
  }
  componentDidMount(){
    console.log('Component Did Mount')
    // fetch('https://findyourwork-95deb.firebaseio.com/kolekcjadruga.json', {method: 'POST', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify([{wokrplace: 'nazwa miejsca'},{workplace:'2'},{workplace:'3'}])})
    fetch('https://findyourwork-95deb.firebaseio.com/kolekcjadruga.json')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        // this.setState({data: data})
      })


      db.collection('workplaces').onSnapshot(snapshot => {
        const fu = snapshot.docs.map(doc => doc.data().work);
        console.log(snapshot.docs.map(doc=> doc.data()))
        this.setState({data:fu})
      })
      
  }

  componentDidUpdate(){
    console.log('COMPONENT DID UPDATE')
    
  }


  handleChange = (e) => {
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({[nam]: val});
  };

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.salary)
    db.collection('workplaces').add({
      work: this.state.companyName,
      position: this.state.position,
      salary: this.state.salary
    })
  }
  render() 
  
  {
    
    // console.log('Render')
    // const keys = Object.keys(this.state.data)
    // console.log(keys)

    console.log(this.state.value)
    
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
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/users">Users</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/about">
                About
              </Route>
              <Route path="/users">
                Users
              </Route>
              <Route path="/">
                Home
              </Route>
            </Switch>
          </div>
      </Router>
      <form onSubmit={this.handleSubmit}>
        <input  type="text" name="companyName" value={this.state.companyName} onChange={this.handleChange}/>
        <input type="text" name="position" value={this.state.position} onChange={this.handleChange}/>
        <input type="number" name="salary" value={this.state.salary} onChange={this.handleChange}/> 
        <button type='submit'>ok</button>
      </form>
                <input  value={this.state.position}/>

        {this.state.data.map((item, index)=><h1 key={index}>{item}</h1>)}
      </div>
    );
  }
}

export default App;




