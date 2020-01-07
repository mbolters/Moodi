import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Mood = props => (
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

export default class MoodsList extends Component {
    constructor(props) {
        super(props);
        this.deleteMood = this.deleteMood.bind(this);
        this.state = {moods: []};
      }
    
      componentDidMount() {
        axios.get('http://localhost:5000/moods/')
         .then(response => {
           this.setState({ moods: response.data });
         })
         .catch((error) => {
            console.log(error);
         })
      }

      deleteMood(id) {
        axios.delete('http://localhost:5000/moods/'+id)
          .then(res => console.log(res.data));
        this.setState({
          moods: this.state.moods.filter(el => el._id !== id)
        })
      }

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
              <th>Actions</th>
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