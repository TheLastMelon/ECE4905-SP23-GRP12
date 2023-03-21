
import React, { useState } from "react";
import Card from '@mui/material/Card';
import { CardActionArea, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DefaultPlant from './images/article-cal-s.png';
const MainCard = props => {

    const [plantName, deviceID, timesPerDay, timesPerWeek, durination, cardID] = props.number;

    const oddEven = props.index % 2 == 0 ? "#ffcdd2":"#81d4fa";
    const NameColor = props.index %2 == 0? "#ef5350":"#2196f3"

    const feedname = deviceID == "abc_1"? "moist":"moistier";

    const url = "https://io.adafruit.com/kevinroot/feeds/" + feedname;

    return (
      <Card style={{backgroundColor: oddEven}}>
      
          <Typography display="block" align="center" variant="h3" style={{color: NameColor}}>{plantName}</Typography>
          <Typography display="block" align="left" variant="h5">Water Scheduling: </Typography>
          <Typography display="block">Per Day: {timesPerDay}</Typography>
          <Typography display="block">Per Week: {timesPerWeek}</Typography>
          <Typography display="block">Duration: {durination} sec</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" style={{backgroundColor: NameColor}} onClick={props.onRemove}>Remove Card</Button>
            <form action={url} target="_blank">
              <Button variant="contained" style={{backgroundColor: NameColor}} type="submit">View Chart</Button>
            </form>
          </Stack>
          <Typography display="block" align="right">Device ID: {deviceID}</Typography>
      </Card>
    );
  };
  
  export default MainCard;
  