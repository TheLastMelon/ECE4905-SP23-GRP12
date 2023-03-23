
import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { CardActionArea, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DefaultPlant from './images/article-cal-s.png';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const MainCard = props => {

  const [open, setOpen] = React.useState(false);

  const pushNewValue = async (e) => {

    e.preventDefault();

    try{

      let res = await fetch("https://h2bros.ddns.net/edit_card",{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plant_name: plant_name,
          device_id: device_id,
          tpd: time_per_day,
          tpw: time_per_week,
          tpwater: durination,
          ID: card_id
        }),
      });

      let resJson = await res.json();

    }catch(event){
      console.log(event)
    }

    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };

    //const [plantName, deviceID, timesPerDay, timesPerWeek, durination, cardID] = props.number;

    const [mostureLevel, setML] = useState([]);
    const [plant_name, setPlantName] = useState(props.number[0]);
    const [device_id, setDeviceID] = useState(props.number[1]);
    const [time_per_day, setTPD] = useState(props.number[2]);
    const [time_per_week, setTPW] = useState(props.number[3]);
    const [durination, setDurination] = useState(props.number[4]);
    const [card_id, setCardID] = useState(props.number[5]);

    const oddEven = props.index % 2 == 0 ? "#ffcdd2":"#81d4fa";
    const NameColor = props.index %2 == 0? "#ef5350":"#2196f3"

    const feedname = device_id == "abc_1"? "moist":"moistier";

    const url = "https://io.adafruit.com/kevinroot/feeds/" + feedname;

    const getDataUrl = "https://io.adafruit.com/api/v2/kevinroot/feeds/" + feedname + "/data/retain"



    useEffect(() => {
      const interval = setInterval(() => {
        fetch(getDataUrl)
        .then((response) => response.text())
        .then((data) => {
          console.log("Starting to Print Most Recent Data Point for " + device_id + ":");
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
      <div>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you want to change any of the values, just do it here!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="deviceID_edit"
            label="Device ID"
            value={device_id}
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setDeviceID(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="plant_name_edit"
            label="Plant Name"
            value={plant_name}
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setPlantName(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="timesPerWeek_edit"
            value={time_per_week}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="timesPerDay_edit"
            value={time_per_day}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="durination_edit"
            value={durination}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={pushNewValue}>Submit Changes</Button>
        </DialogActions>
      </Dialog>

      <Card style={{backgroundColor: oddEven}}>
      
          <Typography display="block" align="center" variant="h3" style={{color: NameColor}}>{plant_name}</Typography>
          <Typography display="block" align="left" variant="h5">Water Scheduling: </Typography>
          <Typography display="block">Per Day: {time_per_day}</Typography>
          <Typography display="block">Per Week: {time_per_week}</Typography>
          <Typography display="block">Duration: {durination} sec</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" style={{backgroundColor: NameColor}} onClick={props.onRemove}>Remove Card</Button>
            <form action={url} target="_blank">
              <Button variant="contained" style={{backgroundColor: NameColor}} type="submit">View Chart</Button>
            </form>
            <Button variant="contained" style={{backgroundColor: NameColor}} onClick={handleClickOpen}>Edit Card</Button>
          </Stack>
          <Typography display="block" align="right">Device ID: {device_id}</Typography>
      </Card>
      </div>
    );
  };
  
  export default MainCard;
  