
import React, { useState } from "react";
import Card from '@mui/material/Card';
import { Typography } from "@mui/material";

const MainCard = props => {

    const [plantName, deviceID, timesPerDay, timesPerWeek, durination, cardID] = props.number;

    const oddEven = props.index % 2 == 0 ? "red":"blue";

    return (
      <Card style={{backgroundColor: oddEven}}>
        <Typography display="block">Plant Name: {plantName}</Typography>
        <Typography display="block">Device ID: {deviceID}</Typography>
        <Typography display="block">Times per Day to Water: {timesPerDay}</Typography>
        <Typography display="block">TImees per Week to Water: {timesPerWeek}</Typography>
        <Typography display="block">Durination of Water: {durination}</Typography>
        <button onClick={props.onRemove}>Remove Card</button>
      </Card>
    );
  };
  
  export default MainCard;
  