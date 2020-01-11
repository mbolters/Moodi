import React, { Component } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Cell, Tooltip} from 'recharts';
import { BarChart, Bar } from 'recharts';
import CustomXAxisLabel from "./CustomAxis";

const colors = ['#005c12', '#007a18', '#009c1f', '#00c227', '#00e32e'];

const data = [{name: 'Sad', uv: 7, pv: 7, amt: 7, url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/loudly-crying-face_1f62d.png'}, 
{name: 'Alright', uv: 10, pv: 7, amt: 7, url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/slightly-frowning-face_1f641.png', name: 'Alright'},
{name: 'Meh', uv: 4, pv: 7, amt: 7, url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/neutral-face_1f610.png'},
{name: 'Good', uv: 5, pv: 7, amt: 7, url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/slightly-smiling-face_1f642.png'},
{name: 'Happy', uv: 5, pv: 7, amt: 7, url: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Happy_Emoji_Icon_5c9b7b25-b215-4457-922d-fef519a08b06_large.png?v=1571606090'}];




function Barchart(props) {


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

export default Barchart;