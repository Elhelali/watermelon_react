import React from 'react';

const Question = (props) => {
 return (
    <div>
      <h2>{props.title}</h2>
      <h3>{props.subtitle}</h3>
        {props.inputs}
    </div>

 )
}

export default Question