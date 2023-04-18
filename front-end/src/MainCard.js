
import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CardMedia, { cardMediaClasses } from '@mui/material/CardMedia';
import SamplePlant from './images/article-cal-s.png'
import { ClassNames } from "@emotion/react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const MainCard = props => {

  const DEBUG = true;

  const [open, setOpen] = React.useState(false);

  /**
   * This fuction will update a entry in the MariaDB for the
   * respective card
   */
  const pushNewValue = async (e) => {

    e.preventDefault();


    try{

      // Creating the POST request with the proper data
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

      if(DEBUG){
        console.log("The Result from editing the card with ID " + card_id + " is" + resJson);
      }

    }catch(event){
      console.log(event)
    }

    setOpen(false);
  };

  //Opening the popup box
  const handleClickOpen = () => {
    setOpen(true);
    
  };

  //Closing the Popup Box
  const handleClose = () => {
    setOpen(false);
  };

    //const [plantName, deviceID, timesPerDay, timesPerWeek, durination, cardID] = props.number;

    const [mostureLevel, setML] = useState(-69);
    const [plant_name, setPlantName] = useState(props.number[0]);
    const [device_id, setDeviceID] = useState(props.number[1]);
    const [time_per_day, setTPD] = useState(props.number[2]);
    const [time_per_week, setTPW] = useState(props.number[3]);
    const [durination, setDurination] = useState(props.number[4]);
    const card_id = props.number[5];

    const oddEven = props.index % 2 === 0 ? "#ffcdd2":"#81d4fa";
    const NameColor = props.index %2 === 0? "#ef5350":"#2196f3"

    const feedname = device_id === "abc_1"? "moisture":"moistier";

    const url = "https://io.adafruit.com/kevinroot/feeds/" + feedname;

    const getDataUrl = "https://io.adafruit.com/api/v2/kevinroot/feeds/" + feedname + "/data/retain"


    useEffect(() => {
      const interval = setInterval(() => {

        if(DEBUG){
          console.log("Going to fetch Moisture Level for Device ID: " + device_id);
        }

        
      fetch(getDataUrl)
      .then((response) => response.text())
      .then((data) => {

        if(DEBUG){
          console.log("Starting to Print Most Recent Data Point for " + device_id + ": " + data);
        }
        setML(data.substring(0, data.indexOf(",")));
        
      })
      .catch((err) => {
        console.log(err.message);
      });

      }, 60000);

      return () => clearInterval(interval);
    }, [DEBUG, device_id, getDataUrl]);

    return (
      <div>
        {/** 
         * This is a popup box to change the current values of the
         * schedule
         */}
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
            onChange={(event) => setTPW(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="timesPerDay_edit"
            value={time_per_day}
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setTPD(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="durination_edit"
            value={durination}
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setDurination(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={pushNewValue}>Submit Changes</Button>
        </DialogActions>
        </Dialog>
      
        { /**
        * This Card is shown on the main webpage to display these values
        * Small Change
        */
        }
        <Grid container spacing={0}>
        <Grid item xs={14}>
            <Item elevation={0}>
              <Item elevation={3} style={{padding: '1', backgroundColor: oddEven}}>              
                <Card elevation={0} style={{backgroundColor: oddEven}}>
                  <Grid container spacing={2} columns={12}>
                    <Grid item xs={4}> 
                      <Typography display="left" JustifyContent="flex-end">Device ID: {device_id}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography display="block" align="center" variant="h3" style={{color: NameColor}}>{plant_name}</Typography>
                      <Typography display="block" align="center" variant="h5">Water Scheduling: </Typography>
                      <Typography display="block">Per Day: {time_per_day}</Typography>
                      <Typography display="block">Per Week: {time_per_week}</Typography>
                      <Typography display="block">Duration: {durination} sec</Typography>

                    

                      { 
                        /**
                        * This will hide the moisture level until it gets updated with a proper value.
                        * 
                        * We check agaist -69 which is the default value
                        */
                        mostureLevel !== -69 &&
                        
                        <Typography display="block">Moisture Level: {mostureLevel} Units</Typography>
                      }
                    </Grid> 
                      <Grid item xs={4}> 
                          <Stack direction="column" justifyContent="space-evenly" alignItems="flex-end" spacing={3}>
                            <Button variant="contained" style={{backgroundColor: NameColor}} onClick={props.onRemove}>Remove Card</Button>
                            <form action={url} target="_blank">
                              <Button variant="contained" style={{backgroundColor: NameColor}} type="submit">View Chart</Button>
                            </form>
                            <Button variant="contained" style={{backgroundColor: NameColor}} onClick={handleClickOpen}>Edit Card</Button>
                          </Stack>
                      </Grid>  
                  </Grid> 
                </Card>
              </Item>
            </Item>
          </Grid>
        </Grid>
      </div>
   );
  };
  
  export default MainCard;
  