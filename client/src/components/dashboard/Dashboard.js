import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';

import { logoutUser } from "../../actions/authActions";
import Sidebar from '../../components/dashboard/Sidebar';
import MobileFoot from '../layout/MobileFoot';

import MoodsList from "../../components/moods/moods-list.js";
import Piechart from "../../components/recharts/PieChart"

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
  }

  summarizeMorning(){
  
  }

  summarizeEvening() {

  }
  componentDidMount() {
    const { user } = this.props.auth;
    console.log(user)
    let username = user.username;

    //get total mood count
    axios.get('/moods/' + username)
     .then(response => {
      this.setState({ moods: response.data });
      this.setState({morningMoods: this.state.moods.filter(el => el.morning == true)});
      this.setState({eveningMoods: this.state.moods.filter(el => el.morning == false)});
      this.summarizeMorning();
      this.summarizeEvening();
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
            </div>
            <div className="card-icon"><i className="material-icons medium valign">face</i></div>
          </div>
          <div className="card-action"><a href="#"></a></div>
        </div>
      </div>
      <div className="col s12 m4">
        <div className="card purple white-text">
          <div className="card-content valign-wrapper">
            <div className="card-text">
              <h6> - Feeling HAPPY</h6>
              <p>Morning Summary</p>
            </div>
            <div className="card-icon"><i className="material-icons medium valign">wb_sunny</i></div>
          </div>
          <div className="card-action"><a href="#"></a></div>
        </div>
      </div>
      <div className="col s12 m4">
        <div className="card purple white-text">
          <div className="card-content valign-wrapper">
            <div className="card-text">
              <h6>Feeling SAD</h6>
              <p>Evening Summary</p>
            </div>
            <div className="card-icon"><i className="material-icons medium valign">brightness_2</i></div>
          </div>
          <div className="card-action"><a href="#"></a></div>
        </div>
      </div>
    </div>
    <MoodsList/>
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