import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateMood extends Component {
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
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    this.setState({ 
      users: ['test user'],
      name: 'test user'
    });
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
      name: this.state.name,
      mood: this.state.mood,
      description: this.state.description,
      date: this.state.date,
    };
  
    console.log(mood);
    
    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New Mood Log</h3>
        <form>
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
            <label>Mood: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.mood}
                onChange={this.onChangeMood}
                />
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
            <input type="submit" value="Create Mood Log" className="btn btn-primary" onClick={this.onSubmit}/>
          </div>
        </form>
      </div>
    )
  }
}