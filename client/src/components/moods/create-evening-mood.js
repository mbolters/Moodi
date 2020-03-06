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

class CreateEveningMood extends Component {


  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeMood = this.onChangeMood.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      username: '',
      mood: '',
      description: '',
      date: new Date(),
      users: [],
      morning: null,
      timeNow: null,
      entryExists: false
    }
  }
  

  componentDidMount() {
    const { user } = this.props.auth;
    this.state.timeNow = this.state.date.getHours();
    let dayChecker = this.state.date.getDate();
    
    axios.get('/moods/' + user.username)
      .then(response => {
        let data = response.data;

        

        for (let i = 0; i < data.length; i++) {
          console.log(data)
          let todayFormatted = new Date(data[i].date);
          let today = todayFormatted.getDate();
          console.log(todayFormatted)
          console.log(today)
          if (today === dayChecker) {
            console.log("step 2")
            if (data[i].morning === false) {
              console.log("good to go");
              this.setState({
                entryExists: true
              })
            } else {
              return;
            }
          } else {
            return;
          }
        }
        
         
    })
    this.setState({ 
      username: user.username
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
      morning: false
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
        <div className="container-fluid" >
        <h6 style={{color: "grey"}}>Evening Entry</h6>
        <h4 style={{color: "black"}}>How are you feeling?</h4>
        <form onSubmit={this.onSubmit} className= "input-field"> 
          <ToastContainer autoClose={2000}/>
        <h4 style={{color: "black"}}>Create New Mood Log</h4>
          <div className="form-group"> 
          </div>

          <div className= "container-fluid">
            <div className= "row">
              <div className="form-group"> 
                <div className="mood"  style= {{textAlign: "center"}}>
                  <label>
                    <input name="mood" type="radio" value="abysmal" required
                                className="form-control"
                                onChange={this.onChangeMood}/>
                                <span style={{fontSize:"5rem"}}>😫</span></label>
                  <label><input name="mood" type="radio" value="sad" required
                                className="form-control"
                                onChange={this.onChangeMood}/>
                                <span style={{fontSize:"5rem"}}>😕</span></label>
                  <label><input name="mood" type="radio" value="meh" required
                                className="form-control"
                                onChange={this.onChangeMood}/>
                                <span style={{fontSize:"5rem"}}>😐</span></label>
                  <label><input name="mood" type="radio" value="happy" required
                                className="form-control"
                                onChange={this.onChangeMood}/>
                                <span style={{fontSize:"5rem"}}>🙂</span></label>
                  <label><input name="mood" type="radio" value="ecstatic" required
                                className="form-control"
                                onChange={this.onChangeMood}/>
                                <span style={{fontSize:"5rem"}}>😀</span></label>
                </div>
              </div>
            </div>
          </div>
          <div className= "row">
            <div className="form-group input-field" style= {{paddingTop: "30px"}}> 
              <label style={{color:"black"}}>Description: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  />
            </div>
          </div>
          <div className= "row">
            <div className="form-group input-field" style= {{paddingTop: "50px"}}>
              <label style={{color:"black"}}>Date: </label>
              <div>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                  disabled="disabled"
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

CreateEveningMood.propTypes = {
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
)(CreateEveningMood);