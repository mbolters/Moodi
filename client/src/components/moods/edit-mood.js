import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import MobileFoot from '../layout/MobileFoot';
import Sidebar from "../dashboard/Sidebar";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'

export default class EditMood extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeMood = this.onChangeMood.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      mood: '',
      description: '',
      date: new Date()
    }
  }

  componentDidMount() {
    
    axios.get('/moods/'+ this.props.match.params.id)
      .then(response => {
        console.log(response.data);
        this.setState({
          mood: response.data.mood,
          description: response.data.description
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
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
      mood: this.state.mood,
      description: this.state.description
    };

    console.log(mood);

    axios.post('/moods/update/'+ this.props.match.params.id, mood)
      .then(res => {
        toast.success("Mood was successfully edited!")
        console.log(res.data)});
    
      this.props.history.push('/dashboard');
  }

  render() {
    return (
      <div className="main">   
        <Sidebar/>   
        <div className="container-fluid">
        <h3>Create New Mood Log</h3>
        <form onSubmit={this.onSubmit}>
        <ToastContainer autoClose={2000}/>
        <div className= "container-fluid">
            <div className= "row">
              <div className="form-group"> 
                <div className="mood"  style= {{textAlign: "center"}}>
                  <label><input name="mood" type="radio" value="abysmal" required
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
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Mood Log" className="btn btn-primary purple darken-2" />
          </div>
        </form>
      </div>
      <MobileFoot />
      </div>
    )
  }
}