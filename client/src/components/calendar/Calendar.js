import React, { Component } from 'react';
import {Calendar} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
 
class MoodCalendar extends Component {
  state = {
    date: new Date(),
  }
 
  onChange = date => this.setState({ date })

  dateConversion = date => {
    let d = new Date(date);
    let converted = d.getDate();
    return converted;
  }


  //componentDidMount() {
    // const { user } = this.props.auth;
    // let username = user.username;
    // axios.get('/moods/' + username)
    //      .then(response => {
    //     //     console.log(response.data)
        
    //          const allMoods = response.data

    //        const moodCounts = allMoods.reduce((acum, user) => {
    //            let newDate = this.dateConversion(user.date);
    //            console.log(newDate);
    //            user.mood[newDate]
               
    //            return acum;
    //        }, {});

        //    console.log(moodCounts);
        // let dates = new Map();
        // let newDate = this.dateConversion(user.date);
        // for (let items in allMoods) {
        //     dates.set(newDate, items.mood)
        //     console.log(dates);
        // }

    //      })
    //      .catch((error) => {
    //         console.log(error);
    //      })
    //   }
  

 
  render() {
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
          tileContent={({ activeStartDate, date, view }) => view === 'month' && date.getDate() === 2 ? <p>It's Sunday!</p> : null}
        />
        
      </div>
    );
  }

}


MoodCalendar.propTypes = {
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
)(MoodCalendar);