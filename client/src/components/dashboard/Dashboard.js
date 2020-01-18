import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';

import { logoutUser } from "../../actions/authActions";
import Sidebar from '../../components/dashboard/Sidebar';
import MobileFoot from '../layout/MobileFoot';

import MoodsList from "../../components/moods/moods-list.js";
import Piechart from "../../components/recharts/PieChart"
import MornEveMood from "../../components/moods/morn-night-moods"

class Dashboard extends Component {
    onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };


  state = {
    quote: [],
    moods: [],
    morningMoods: [],
    eveningMoods: [],
    totalMoods: 0,
    happyMood: 0,
    sadMood: 0,
    happyAverage: 0,
    sadAverage: 0
  }

  summarizeMorning(){
  
  }

  summarizeEvening() {

  }
  componentDidMount() {
    const { user } = this.props.auth;
    
    let username = user.username;

    //get total mood count
    axios.get('/moods/' + username)
     .then(response => {
       let data = response.data;
      this.setState({ moods: response.data });
      
      for ( let item in data ) {

        if ((data[item].mood === 'ecstatic') || (data[item].mood === 'happy')) {
          this.state.totalMoods++;
          this.state.happyMood++;

        } else if ((data[item].mood === 'abysmal') || (data[item].mood === 'sad')) {
          this.state.totalMoods++;
          this.state.sadMood++;
        }
      }
      let floatPos = (this.state.happyMood / this.state.totalMoods) * 100;
      floatPos = Math.floor(floatPos * 100) / 100;
      let floatNeg = (this.state.sadMood / this.state.totalMoods) * 100;
      floatNeg = Math.floor(floatNeg * 100) / 100;

      this.setState({
        happyAverage: floatPos,
        sadAverage: floatNeg
      })

     })
     .catch((error) => {
        console.log(error);
     })


    const API_KEY = "MToK4JPO7RRViLk7e7mmXgeF"
    axios.get(`https://cors-anywhere.herokuapp.com/http://quotes.rest/quote/search.json?category=inspire`, { headers: { "X-Theysaidso-Api-Secret": API_KEY}})
      .then(res => {
        const quote = res.data.contents;
        this.setState({ quote });
        console.log({quote})
      })
  }


render() {
    const { user } = this.props.auth;
return (
  
  <div className="main">
    <Sidebar/>
<div id="message">
<div className="container" style={{ height: "20vh", marginTop: "5vh" }}>
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You look great today. 
              </p>
            </h4>
            <blockquote>
            {this.state.quote.quote}
            <cite>{this.state.quote.author}</cite>
            </blockquote>
          </div>
        </div>
      </div>
</div>
<div className="container">
    <div className="row">
    <Piechart/>
    </div>
  </div>
  <div className="container-fluid">
    <div className="row">
      <div className="col s12 m4">
        <div className="card purple white-text">
          <div className="card-content valign-wrapper">
            <div className="card-text">
              <h6>{this.state.moods.length}</h6>
              <p>Moods Logged</p>
              <h6 style={{visibility: "hidden"}}>holder</h6>
            </div>
            <div className="card-icon"><i className="material-icons medium valign">library_books</i></div>
          </div>
          <div className="card-action"><a href="#"></a></div>
        </div>
      </div>
      <div className="col s12 m4">
        <div className="card purple white-text">
          <div className="card-content valign-wrapper">
            <div className="card-text">
              <h6>Happy Average</h6>
              <p>Average Happy Mood</p>
              <h6>{this.state.happyAverage}%</h6>
            </div>
            <div className="card-icon"><i className="material-icons medium valign">mood</i></div>
          </div>
          <div className="card-action"><a href="#"></a></div>
        </div>
      </div>
      <div className="col s12 m4">
        <div className="card purple white-text">
          <div className="card-content valign-wrapper">
            <div className="card-text">
              <h6>Sad Average</h6>
              <p>Average Sad Mood</p>
              <h6>{this.state.sadAverage}%</h6>

            </div>
            <div className="card-icon"><i className="material-icons medium valign">mood_bad</i></div>
          </div>
          <div className="card-action"><a href="#"></a></div>
        </div>
      </div>
    </div>
    <MornEveMood/>
  </div>
  <MobileFoot/>
  </div>

    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);