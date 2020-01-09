import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">insert_emoticon</i>
              Moodi
              
              <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                <Link to="/" className="nav-link">Moods</Link>
                </li>
                <li className="navbar-item">
                <Link to="/create" className="nav-link blue-text">Create Mood Log</Link>
                </li>
                <li className="navbar-item"></li>
              </ul>
              </div>
            </Link> 
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;