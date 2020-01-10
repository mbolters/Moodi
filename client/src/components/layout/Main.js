import React, { Component } from "react";


class Main extends Component {
  render() {
    return (
      <div className="main">
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
export default Main;