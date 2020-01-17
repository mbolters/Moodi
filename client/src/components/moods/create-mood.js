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

    this.state = {
      name: '',
      username: '',
      mood: '',
      description: '',
      date: new Date(),
      users: [],
      morning: false
    }
  }
  

  componentDidMount() {
    const { user } = this.props.auth;
    this.setState({ 
      users: ['test user'],
      name: 'test user',
      username: user.username,

    });
  }

  checkMorning() {
    let timeNow = this.state.date.getHours();
    if (timeNow <= 12) {
      this.setState({
        morning: true
      })
    } else if (timeNow > 12) {
      this.setState({
        morning: false
      })
    }
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
    this.checkMorning();
  
    
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
    this.props.history.push('/dashboard');
 
  }

  render() {
    return (
      <div className="main">   
        <Sidebar/>   
        <div className="container-fluid">
          <ToastContainer autoClose={2000}/>
        <h3>Create New Mood Log</h3>
        <form onSubmit={this.onSubmit}> 
          <div className="form-group"> 
            <label>Name: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <div className="mood">
            <label><input name="mood" type="radio" value="abysmal" required
                className="form-control"
                onChange={this.onChangeMood}/><span>😫</span></label>
            <label><input name="mood" type="radio" value="sad" required
                className="form-control"
                onChange={this.onChangeMood}/><span>😕</span></label>
            <label><input name="mood" type="radio" value="meh" required
                className="form-control"
                onChange={this.onChangeMood}/><span>😐</span></label>
            <label><input name="mood" type="radio" value="happy" required
                className="form-control"
                onChange={this.onChangeMood}/><span>🙂</span></label>
            <label><input name="mood" type="radio" value="ecstatic" required
                className="form-control"
                onChange={this.onChangeMood}/><span>😀</span></label>
          </div>
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div> 
           </div>

          <div className="form-group">
            <input type="submit" value="Create Mood Log" className="btn btn-primary"/>
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