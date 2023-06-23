import React from "react";

export default function LocationBlock (props){
    return(
        <tr className="blockLocationTr" style={props.style}>
            <th className="firstTh">{props.name}</th>
            <th className="secondTh">{props.type}</th>
            <th className="thirdTh">{props.dimension}</th>
        </tr>
    )
}