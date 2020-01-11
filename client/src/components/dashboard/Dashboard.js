import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
    onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

render() {
    const { user } = this.props.auth;
return (

  <div className="main">
        <div style={{ height: "40vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      
  <div className="container-fluid">
    <div className="row">
      <div className="col s12 m4">
        <div className="card blue white-text">
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
        <div className="card blue white-text">
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
        <div className="card blue white-text">
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