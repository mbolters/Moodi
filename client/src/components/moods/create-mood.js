import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Sidebar from '../dashboard/Sidebar';
import MobileFoot from '../layout/MobileFoot';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import "./create-mood.css";

  import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css'

class CreateMood extends Component {


  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeMood = this.onChangeMood.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.setState ({
      name: '',
      username: '',
      mood: '',
      description: '',
      date: new Date(),
      users: [],
      morning: null,
      timeNow: null
    })
  }
  

  componentDidMount() {
    this.setState({
      timeNow: this.date
    })
    if (this.timeNow <= 12) {
      this.setState({
        morning: true
      })
    } else if (this.timeNow > 12) {
      this.setState({
        morning: false
      })
    }
    const { user } = this.props.auth;
    this.setState({ 
      users: ['test user'],
      name: 'test user',
      username: user.username,

    });
  }


  onChangeName(e) {
    this.setState({
      name: e.target.value
    }
    );
  }

  onChangeMood(e) {
    this.setState({
      mood: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();



  
    
    const mood = {
      name: this.state.name,
      username: this.state.username,
      mood: this.state.mood,
      description: this.state.description,
      date: this.state.date,
      morning: this.state.morning
    };

    console.log(mood);

    axios.post('/moods/add', mood)

    .then((result) => {
      console.log("Mood added!");
      toast.success("Mood was successfully saved!")
    }).catch((ex) => {
      toast(ex);
    });

    //after submit, redirect to dashboard
    this.props.history.push('/dashboard');
 
  }

  render() {
    return (
      <div className="main">   
        <Sidebar/>   
        <div className="container-fluid">
        <h4>How are you feeling?</h4>
        <form onSubmit={this.onSubmit} className= "input-field"> 
          <ToastContainer autoClose={2000}/>
        <h4>Create New Mood Log</h4>
          <div className="form-group"> 
          </div>

          <div className= "container-fluid">
            <div className= "row">
              <div className="form-group"> 
                <div className="mood"  style= {{textAlign: "center"}}>
                  <label><input name="mood" type="radio" value="abysmal" required
                                className="form-control"
                                onChange={this.onChangeMood}/>
                                <span role= "img" aria-label="Abysmal" style={{fontSize:"5rem"}}>😫</span></label>
                  <label><input name="mood" type="radio" value="sad" required
                                className="form-control"
                                onChange={this.onChangeMood}/>
                                <span  role= "img" aria-label="Sad" style={{fontSize:"5rem"}}>😕</span></label>
                  <label><input name="mood" type="radio" value="meh" required
                                className="form-control"
                                onChange={this.onChangeMood}/>
                                <span  role= "img" aria-label="Average" style={{fontSize:"5rem"}}>😐</span></label>
                  <label><input name="mood" type="radio" value="happy" required
                                className="form-control"
                                onChange={this.onChangeMood}/>
                                <span role= "img" aria-label="Happy" style={{fontSize:"5rem"}}>🙂</span></label>
                  <label><input name="mood" type="radio" value="ecstatic" required
                                className="form-control"
                                onChange={this.onChangeMood}/>
                                <span  role= "img" aria-label="Ecstatic" style={{fontSize:"5rem"}}>😀</span></label>
                </div>
              </div>
            </div>
          </div>
          <div className= "row">
            <div className="form-group input-field" style= {{paddingTop: "30px"}}> 
              <label>Description: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.description}
                  onChange={this.onChangeDescription}
                  />
            </div>
          </div>
          <div className= "row">
            <div className="form-group input-field" style= {{paddingTop: "50px"}}>
              <label>Date: </label>
              <div>
                <DatePicker
                  selected={this.date}
                  onChange={this.onChangeDate}
                />
              </div> 
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Create Mood Log" 
            className="btn btn-primary purple darken-2"/>
          </div>
        </form>
        </div>
        <MobileFoot/>
      </div>
    )
  }
}

CreateMood.propTypes = {
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
)(CreateMood);