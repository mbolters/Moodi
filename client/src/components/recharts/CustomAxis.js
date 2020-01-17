import React from 'react';


function CustomXAxisLabel(props) {
    return (
        <g transform={`translate(${props.x},${props.y})`}>
            <image xlinkHref={props.payload.value} x={0} y={0} height="20px" width="20px" textAnchor="middle" fill="#666" />
        </g>
        )
    }

export default CustomXAxisLabel;