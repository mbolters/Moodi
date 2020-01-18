import React, { Component } from "react";
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";


const COLORS = ['#584A63', '#4B2C63', '#854DB0', '#AC64E3', '#CEABE8'];


class Piechart extends Component {
    constructor() {
        super();
        this.state = {
            moods: {
                abysmal: 0,
                sad: 0,
                meh: 0,
                happy: 0,
                ecstatic: 0
            },
            data: []
        }
      }




componentDidMount() {
    const { user } = this.props.auth;
    let username = user.username;
    axios.get('/moods/' + username)
         .then(response => {
            const allMoods = response.data

           const moodCounts = allMoods.reduce((acum, user) => {
               if (user.mood in acum) {
                   acum[user.mood]++
               }
               return acum;
           }, {
            abysmal: 0,
            sad: 0,
            meh: 0,
            happy: 0,
            ecstatic: 0
           });

           this.setState({moods: moodCounts})
           this.setState({
               data: [
                {name: 'Abysmal Days', value: this.state.moods.abysmal}, 
                {name: 'Sad Days', value: this.state.moods.sad},
                {name: 'Meh Days', value: this.state.moods.meh}, 
                {name: 'Happy Days', value: this.state.moods.happy},
                {name: 'Ecstatic Days', value: this.state.moods.ecstatic}
               ]
           })

         })
         .catch((error) => {
            console.log(error);
         })
      }

    
render () {
return (
<ResponsiveContainer width="99%" height={600}>
    <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Tooltip />
        <Pie
        
        data={this.state.data} 
        labelLine={false}
        outerRadius={80} 
        fill="#8884d8"
        label
        >
        
        	{this.state.data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
    </Pie>
    <Legend/>
    </PieChart>
    
</ResponsiveContainer>

    

    )
}
}

Piechart.propTypes = {
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
)(Piechart);

