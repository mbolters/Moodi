import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


import axios from 'axios';

const Mood = props => (
    //If all you need to do is to accept props and return JSX, use a functional component instead of a class component.
    <tr>
      <td>{props.mood.mood}</td>
      <td>{props.mood.date.substring(0,10)}</td>
      <td>
        <Link className="btn btn-primary" to={"/edit/"+props.mood._id}>edit</Link> <a href="#" className="btn red" onClick={() => { props.deleteMood(props.mood._id) }}>delete</a>
      </td>
    </tr>
  )

class MoodsList extends Component {
    constructor(props) {
        super(props);
        this.deleteMood = this.deleteMood.bind(this);
        this.state = {
          moods: [],
          morningMood: {},
          eveningMood: {}
        };
      }
    
      


      componentDidMount() {
        //DAVIS: somehow need to get username here



        const { user } = this.props.auth;
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
        toast.error("Mood was successfully deleted")
      }

      //iterates through the list of mood items by using the map function. Each mood item is output with the Mood component.
      moodList() {
        return this.state.moods.map(currentmood => {
          return <Mood mood={currentmood} deleteMood={this.deleteMood} key={currentmood._id}/>;
        })
      }
  render() {
    return (
       <div className="row">
       <ToastContainer autoClose={2000} />
      <div className="col s12 m8">
        <div className="card">
          <table className="bordered highlight">
            <thead>
              <tr>
                <th >Mood</th>
                <th >Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.moodList()}
            </tbody>
          </table>
        </div>
      </div>
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

