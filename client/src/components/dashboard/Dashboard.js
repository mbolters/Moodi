import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';

import { logoutUser } from "../../actions/authActions";
import Sidebar from '../../components/dashboard/Sidebar';
import MobileFoot from '../layout/MobileFoot';

import MoodsList from "../../components/moods/moods-list.js";


class Dashboard extends Component {
    onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };


  state = {
    quote: []
  }

  componentDidMount() {
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
    console.log(user.username);
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
      
  <div className="container-fluid">
    <div className="row">
      <div className="col s12 m4">
        <div className="card purple white-text">
          <div className="card-content valign-wrapper">
            <div className="card-text">
              <h6>25%</h6>
              <p>Happy</p>
            </div>
            <div className="card-icon"><i className="material-icons medium valign">face</i></div>
          </div>
          <div className="card-action"><a href="#">View</a></div>
        </div>
      </div>
      <div className="col s12 m4">
        <div className="card purple white-text">
          <div className="card-content valign-wrapper">
            <div className="card-text">
              <h6>156</h6>
              <p>Notes</p>
            </div>
            <div className="card-icon"><i className="material-icons medium valign">question_answer</i></div>
          </div>
          <div className="card-action"><a href="#">View</a></div>
        </div>
      </div>
      <div className="col s12 m4">
        <div className="card purple white-text">
          <div className="card-content valign-wrapper">
            <div className="card-text">
              <h6>50</h6>
              <p>Report</p>
            </div>
            <div className="card-icon"><i className="material-icons medium valign">poll</i></div>
          </div>
          <div className="card-action"><a href="#">View</a></div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col s12 m8">
        <div className="card">
          <table className="bordered highlight">
            <thead>
              <tr>
                <th colSpan="2">Historic Moods</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monday: Sad</td>
              </tr>
              <tr>
                <td>Tuesday: Happy</td>
              </tr>
              <tr>
               <td>Wednesday: Sad</td>
              </tr>
              <tr>
                <td>Thursday: Sad</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <MoodsList/>
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