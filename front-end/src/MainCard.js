
import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { CardActionArea, Typography } from "@mui/material";


const MainCard = props => {



    const [plantName, deviceID, timesPerDay, timesPerWeek, durination, cardID] = props.number;

    const oddEven = props.index % 2 == 0 ? "red":"blue";

    const feedname = deviceID == "abc_1"? "moist":"moistier";

    const url = "https://io.adafruit.com/kevinroot/feeds/" + feedname;

    const getDataUrl = "https://io.adafruit.com/api/v2/kevinroot/feeds/" + feedname + "/data/retain"

    const [mostureLevel, setML] = useState([]);

    useEffect(() => {
      const interval = setInterval(() => {
        fetch(getDataUrl)
        .then((response) => response.text())
        .then((data) => {
          console.log("Starting to Print Most Recent Data Point for " + deviceID + ":");
          console.log(data);
          setML(data.substring(0, data.indexOf(",")));
          
        })
        .catch((err) => {
          console.log(err.message);
        });


      }, 60000);

      return () => clearInterval(interval);
    }, []);

    

    return (
      <Card style={{backgroundColor: oddEven}}>
          <Typography display="block">Plant Name: {plantName}</Typography>
          <Typography display="block">Device ID: {deviceID}</Typography>
          <Typography display="block">Times per Day to Water: {timesPerDay}</Typography>
          <Typography display="block">Times per Week to Water: {timesPerWeek}</Typography>
          <Typography display="block">Durination of Water: {durination}</Typography>
          <Typography display="block">Current Moisture Level: {mostureLevel}</Typography>
          <button onClick={props.onRemove}>Remove Card</button>
          <form action={url} target="_blank">
            <button type="submit">View Chart</button>
          </form>

      </Card>
    );
  };
  
  export default MainCard;
  