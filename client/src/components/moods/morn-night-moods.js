import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';

const Mood = props => (
    <tr>
      <td>{props.mood.mood}</td>

    </tr>
  )

class MornNightList extends Component {
    constructor(props) {
        super(props);
        this.deleteMood = this.deleteMood.bind(this);
        this.state = {
          moods: [],
          morningMood: '',
          morningMoodDate: '',
          eveningMood: '',
          eveningMoodDate: '',
          conditionMorn: false,
          conditionEve: false,
          noMood: "No moods to display."
        };
      }
    
      


      componentDidMount() {
        //DAVIS: somehow need to get username here
        let date = new Date();
        let dec = date.getDate();


        const { user } = this.props.auth;
        console.log(user)
        let username = user.username;
        axios.get('/moods/' + username)
         .then(response => {
           let data = response.data;
           let noMood = "No moods from today."
           

           this.setState({ moods: data });


           
           
           for (let item in data) {
            let dateHolder = new Date(data[item].date);
            let newDate = dateHolder.getDate();
            if(dec === newDate) {
              if (data[item].morning) {
                this.setState({
                  morningMood: data[item].mood,
                  morningMoodDate: data[item].date,
                  conditionMorn: true
                })
              } else {
                this.setState({
                  eveningMood: data[item].mood,
                  eveningMoodDate: data[item].date,
                  conditionEve: true
                })
              }
            } 

            
           }
           
           
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

      mornMood() {
        // return this.state.moods.map(currentmood => {
        //   return <Mood mood={morningMood} deleteMood={this.deleteMood} key={currentmood._id}/>;
        // })
        return  <Mood mood={this.state.morningMood}  key={123}/>
      }
      eveMood() {
        // return this.state.moods.map(currentmood => {
        //   return <Mood mood={morningMood} deleteMood={this.deleteMood} key={currentmood._id}/>;
        // })
        return  <Mood mood={this.state.eveningMood}  key={124}> 

                </Mood>
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
                <th>Morning Mood</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{this.state.conditionMorn ? this.state.morningMood : this.state.noMood}</td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="col s12 m8">
        <div className="card">
          <table className="bordered highlight">
            <thead>
              <tr>
                <th>Evening Mood</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{this.state.conditionEve ? this.state.eveningMood : this.state.noMood}</td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    )
  }
}

MornNightList.propTypes = {
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
)(MornNightList);