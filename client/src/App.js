import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import PieChart from "./components/recharts/PieChart"
import Calendar from "./components/calendar/Calendar"
import MornEveMood from "./components/moods/morn-night-moods"



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



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/piechart" component={PieChart} />
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/morn" component={MornEveMood} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route path="/moods" exact component={MoodsList} />
              <Route path="/edit/:id" component={EditMood} />
              <PrivateRoute path="/create" component={CreateMood} />
            </Switch>
            
          </div>
        </Router>
      </Provider>
      
      
    );
  }
}
export default App;