import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import MobileFoot from "./components/layout/MobileFoot";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Cell, Tooltip} from 'recharts';
import { BarChart, Bar } from 'recharts';

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";


import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import MoodsList from "./components/moods/moods-list.js";
import EditMood from "./components/moods/edit-mood.js";
import CreateMood from "./components/moods/create-mood.js";
import './App.css';


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

const colors = ['#005c12', '#007a18', '#009c1f', '#00c227', '#00e32e'];

const data = [{name: 'Sad', uv: 1, pv: 7, amt: 7, url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/loudly-crying-face_1f62d.png'}, 
{name: 'Alright', uv: 10, pv: 7, amt: 7, url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/slightly-frowning-face_1f641.png', name: 'Alright'},
{name: 'Meh', uv: 4, pv: 7, amt: 7, url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/neutral-face_1f610.png'},
{name: 'Good', uv: 5, pv: 7, amt: 7, url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/slightly-smiling-face_1f642.png'},
{name: 'Happy', uv: 5, pv: 7, amt: 7, url: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Happy_Emoji_Icon_5c9b7b25-b215-4457-922d-fef519a08b06_large.png?v=1571606090'}];

function CustomXAxisLabel (props) {
  console.log(props)
  return (
    <g transform={`translate(${props.x},${props.y})`}>
      <image xlinkHref={props.payload.value} x={0} y={0} height="20px" width="20px" textAnchor="middle" fill="#666" />
    </g>
  )
}

function getIntroOfPage(label) {
  if (label === 'Sad') {
    return `Days marked as "Sad"`;
  } if (label === 'Alright') {
    return `Days marked as "Alright"`;
  } if (label === 'Meh') {
    return `Days marked as "Meh"`;
  } if (label === 'Good') {
    return 'Days marked as "Good"';
  } if (label === 'Happy') {
    return 'Days marked as "Happy"';
  } 
}




class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />            
            <MobileFoot />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/linecharttest" component={LineChart} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route path="/" exact component={MoodsList} />
              <Route path="/edit/:id" component={EditMood} />
              <PrivateRoute path="/create" component={CreateMood} />
            </Switch>
            
            {/*In this file for testing purposes only */}
            <div className="container recharts-div">
            <h3>January</h3>
            <BarChart width={350} height={300} data={data}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 1" /> 
              <XAxis dataKey="url" interval={0} tick={<CustomXAxisLabel/>} />
              <YAxis />
              
              <Bar type="monotone" name="January" dataKey="uv" >
              {
          	    data.map((entry, index) => {
            	    return <Cell key={`cell-${index}`} fill={colors[index]} />;
                })
              }
              </Bar>
              
            </BarChart>
            </div>
          </div>
        </Router>
      </Provider>
      
      
    );
  }
}
export default App;