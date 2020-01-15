import React, { Component } from "react";
import { PieChart, Pie, Sector, Cell } from 'recharts';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

const colors = ['#005c12', '#007a18', '#009c1f', '#00c227', '#00e32e'];

const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
        );
    };


class Piechart extends Component {
    constructor() {
        super();
        this.state = {
            sad: 0
        }
      }


    componentDidMount() {
        const { user } = this.props.auth;
        console.log(user)
        let username = user.username;
        axios.get('/moods/' + username)
         .then(response => {
           this.setState({ mood: response.data });
           console.log(response.data);
         })
         .catch((error) => {
            console.log(error);
         })

      }

    




render () {
return (
<div>
    <h3>January</h3>
    <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data} 
          cx={300} 
          cy={200} 
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80} 
          fill="#8884d8"
        >
        	{data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
    </Pie>
    </PieChart>

    
</div>
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

