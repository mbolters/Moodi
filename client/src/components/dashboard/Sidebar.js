import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Sidebar extends Component {
    onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

render() {
    
return (
  <div>
      <ul className="side-nav fixed transparent z-depth-0 hide-on-med-and-down">
<li className="active"><a href="/dashboard"><i className="material-icons">home</i>Dashboard</a></li>
<li><a href="/create"><i className="material-icons">add_circle_outline</i>Log Mood</a></li>
<li><a href="/moods"><i className="material-icons">face</i>View Moods</a></li>
<li>
  <div className="divider"></div>
</li>
<li className="logout" onClick={this.onLogoutClick}><a><i className="material-icons">exit_to_app</i>Log Out</a></li>
</ul>
  </div>
    );
  }
}

Sidebar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Sidebar);