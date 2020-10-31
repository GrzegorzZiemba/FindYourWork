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
    this.state = {
      data: []
    }
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
        this.setState({data:fu})
      })
      
  }

  componentDidUpdate(){
    console.log('COMPONENT DID UPDATE')
    
  }


  render() 
  
  {
    console.log('to jest firebase config key ' + process.env.REACT_APP_API_KEY,)
    // console.log('Render')
    // const keys = Object.keys(this.state.data)
    // console.log(keys)
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
        {this.state.data.map((item, index)=><h1 key={index}>{item}</h1>)}
      </div>
    );
  }
}

export default App;




