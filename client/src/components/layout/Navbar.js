import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      // <div className="navbar-fixed">
      //   <nav className="z-depth-0">
      //     <div className="nav-wrapper white">
      //       <Link
      //         to="/"
      //         style={{
      //           fontFamily: "monospace"
      //         }}
      //         className="col s5 brand-logo center black-text"
      //       >
      //         <i className="material-icons">insert_emoticon</i>
      //         Moodi
      //         <div className="collapse navbar-collapse">
      //         <ul className="navbar-nav mr-auto">
      //           <li className="navbar-item">
      //           <Link to="/" className="nav-link">Moods</Link>
      //           </li>
      //           <li className="navbar-item">
      //           <Link to="/create" className="nav-link">Create Mood Log</Link>
      //           </li>
      //           <li className="navbar-item"></li>
      //         </ul>
      //         </div>
      //       </Link> 
      //     </div>
      //   </nav>
      // </div>

<div className="navbar-fixed">
    <nav>
      <div className="nav-wrapper">
        <ul>
          <li><a href="/dashboard"><img src="moodi_logo.png" width="150px"></img></a></li>
        </ul>
        {/* <ul className="right">
          <li><a href="#!"><i className="material-icons">person</i></a></li>
          <li><a href="#!"><i className="material-icons">exit_to_app</i></a></li>
        </ul> */}
      </div>
    </nav>
  </div>
    );
  }
}
export default Navbar;