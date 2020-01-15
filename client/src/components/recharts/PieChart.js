import React, { Component } from "react";
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

const colors = ['#005c12', '#007a18', '#009c1f', '#00c227', '#00e32e'];

const data = [{name: 'Distraught Days', value: 300}, {name: 'Sad Days', value: 300},
                  {name: 'Meh Days', value: 300}, {name: 'Happy Days', value: 200},
                  {name: 'Exuberant Days', value: 250}];

const COLORS = ['#78469e', '#8d52ba', '#a05dd4', '#af66e8', '#c070ff'];

                 


class Piechart extends Component {
    constructor() {
        super();
        this.state = {
            abysmal: 0,
            sad: 0,
            meh: 0,
            happy: 0,
            ecstatic: 0,
            message: ""
        }
      }


    componentDidMount() {
        const { user } = this.props.auth;
        console.log(user)
        let username = user.username;
        axios.get('/moods/' + username)
         .then(response => {
           let data = response.data;
            
         })
         .catch((error) => {
            console.log(error);
         })

      }

    
render () {
return (
<div>
    <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Tooltip />
        <Pie
          data={data} 
          cx={300} 
          cy={200} 
          labelLine={false}
          outerRadius={80} 
          fill="#8884d8"
        >
            <Tooltip />
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

