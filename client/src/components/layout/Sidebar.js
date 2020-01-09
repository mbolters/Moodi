import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    return (
      <ul className="side-nav fixed transparent z-depth-0 hide-on-med-and-down">
      <li className="active"><a href="/"><i className="material-icons">home</i>Dashboard</a></li>
      <li><a href="/create"><i className="material-icons">add_circle_outline</i>Log Mood</a></li>
      <li><a href="#"><i className="material-icons">face</i>View Moods</a></li>
      <li>
        <div className="divider"></div>
      </li>
      <li><a href="#"><i className="material-icons">settings</i>Settings</a></li>
    </ul>
    );
  }
}
export default Sidebar;