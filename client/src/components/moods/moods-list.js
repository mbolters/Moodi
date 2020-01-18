import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";


import axios from 'axios';

const Mood = props => (
    //If all you need to do is to accept props and return JSX, use a functional component instead of a class component.
    <tr>
      <td>{props.mood.name}</td>
      <td>{props.mood.mood}</td>
      <td>{props.mood.description}</td>
      <td>{props.mood.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.mood._id}>edit</Link> | <a href="#" onClick={() => { props.deleteMood(props.mood._id) }}>delete</a>
      </td>
    </tr>
  )

class MoodsList extends Component {
    constructor(props) {
        super(props);
        this.deleteMood = this.deleteMood.bind(this);
        this.state = {moods: []};
      }
    
      componentDidMount() {
        //DAVIS: somehow need to get username here
        const { user } = this.props.auth;
        console.log(user)
        let username = user.username;
        axios.get('/moods/' + username)
         .then(response => {
           this.setState({ moods: response.data });
           console.log(response.data);
         })
         .catch((error) => {
            console.log(error);
         })

      }

      deleteMood(id) {
        axios.delete('/moods/'+id)
          .then(res => console.log(res.data));
        this.setState({
          moods: this.state.moods.filter(el => el._id !== id)
        })
      }

      //iterates through the list of mood items by using the map function. Each mood item is output with the Mood component.
      moodList() {
        return this.state.moods.map(currentmood => {
          return <Mood mood={currentmood} deleteMood={this.deleteMood} key={currentmood._id}/>;
        })
      }
  render() {
    return (
        <div>
        <h3>Logged Moods</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Mood</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            { this.moodList() }
          </tbody>
        </table>
      </div>
    )
  }
}

MoodsList.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(MoodsList);

