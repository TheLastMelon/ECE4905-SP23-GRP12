import { Typography } from "@mui/material";
import React from "react";
import PlantLogo from './images/plants.png';

const Header = props => {
  return (
    <header>
      <img src={PlantLogo} onClick={props.onClick} class="logo" />
    </header>
    
  );
};
export default Header;
