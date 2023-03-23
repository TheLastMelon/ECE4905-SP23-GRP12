import React from "react";
 
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
      <span className="close-icon" onClick={props.onClick}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;