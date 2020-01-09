import React, { Component } from "react";
import { Link } from "react-router-dom";

class MobileFoot extends Component {
  render() {
    return (
    <div className="navbar-fixed hide-on-large-only" id="mobilefoot">
    <nav>
      <div className="nav-wrapper">
        <ul className="mobile-icons">
          <li><a href="/"><i className="material-icons">home</i></a></li>
          <li><a href="#!"><i className="material-icons">equalizer</i></a></li>
          <li><a href="#!"><i className="material-icons">event</i></a></li>
          <li><a href="/create"><i className="material-icons add-button">add_circle_outline</i></a></li>

          <li><a href="#!"><i className="material-icons">more_vert</i></a></li>
        </ul>
      </div>
    </nav>
  </div>
    );
  }
}
export default MobileFoot;