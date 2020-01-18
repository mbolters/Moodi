import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class MobileFoot extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
    <div className="navbar-fixed hide-on-large-only" id="mobilefoot">
    <nav>
      <div className="nav-wrapper">
        <ul className="mobile-icons">
          <li><a href="/dashboard"><i className="material-icons">home</i></a></li>
          <li><a href="/moods"><i className="material-icons">equalizer</i></a></li>
          <li><a href="#!"><i className="material-icons">event</i></a></li>
          <li><a href="/create"><i className="material-icons add-button">add_circle_outline</i></a></li>
          <li onClick={this.onLogoutClick} className="logout right"><a href="#!"><i className="material-icons">exit_to_app</i></a></li>
        </ul>
      </div>
    </nav>
  </div>
    );
  }
}


MobileFoot.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(MobileFoot);