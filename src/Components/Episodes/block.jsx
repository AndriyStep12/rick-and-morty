import React from "react";

function Block(props) {
  return (
    <tr className="block_tr" style={props.style}>
      <th style={{width: '20%'}}>{props.episode}</th>
      <th style={{width: '60%'}}>{props.name}</th>
      <th style={{width: '20%'}}>{props.date}</th>
    </tr>
  );
}

export default Block;