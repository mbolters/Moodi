import React, { Component } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Cell, Tooltip} from 'recharts';
import { BarChart, Bar } from 'recharts';
import jwt_decode from "jwt-decode";
import CustomXAxisLabel from "./CustomAxis";
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

const colors = ['#005c12', '#007a18', '#009c1f', '#00c227', '#00e32e'];

const data = [{name: 'Sad', uv: 7, pv: 7, amt: 7, url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/loudly-crying-face_1f62d.png'}, 
{name: 'Alright', uv: 10, pv: 7, amt: 7, url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/slightly-frowning-face_1f641.png', name: 'Alright'},
{name: 'Meh', uv: 4, pv: 7, amt: 7, url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/neutral-face_1f610.png'},
{name: 'Good', uv: 5, pv: 7, amt: 7, url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/slightly-smiling-face_1f642.png'},
{name: 'Happy', uv: 5, pv: 7, amt: 7, url: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Happy_Emoji_Icon_5c9b7b25-b215-4457-922d-fef519a08b06_large.png?v=1571606090'}];

// let d = new Date();
// console.log(d);
// d.setDate(d.getDate() - 5);
// console.log(d);




class Barchart extends Component {
    constructor() {
        super();
        this.state = {
            day1: {},
            day2: {},
            day3: {},
            day4: {},
            day5: {},
            day6: {},
            day7: {}
        }
      }

componentDidMount() {
    const { user } = this.props.auth;
    console.log(user)
    let username = user.username;
    axios.get('/moods/usermoods')

    .then((result) => {
      
      console.log("Help");
    });

    
}

// const data = [{name: 'Sad', uv: 7, pv: 7, amt: 7, url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/loudly-crying-face_1f62d.png'}

render () {
return (
<div>
    <h3>January</h3>
    <BarChart width={500} height={300} data={data}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 1" /> 
        <XAxis dataKey="url" interval={0} tick={<CustomXAxisLabel />} />
        <YAxis />
        <Bar type="monotone" name="January" dataKey="uv" >
        {
            data.map((entry, index) => {
            return <Cell key={`cell-${index}`} fill={colors[index]} />;
            })
        }
        </Bar>
  
    </BarChart>

    
</div>
    )
}
}

Barchart.propTypes = {
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
)(Barchart);

