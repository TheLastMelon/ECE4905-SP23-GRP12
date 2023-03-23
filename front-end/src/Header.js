import React from "react";
import PlantLogo from './images/plants.png';

const Header = props => {
  return (
    <header>
      <img src={PlantLogo} onClick={props.onClick} class="logo" alt="A Simple Black Logo of a Plant"/>
    </header>
    
  );
};
export default Header;
