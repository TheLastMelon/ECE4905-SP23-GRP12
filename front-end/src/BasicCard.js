import React,{useState} from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Popups from './Popup';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';

const feed_name = "soil-moisture";
const user_name = "kevinroot";

const feed_one = "moisture";
const feed_two = "moistier";

// https://io.adafruit.com/speedlights/feeds/soil-moisture


const BasicCard = props => {

  const [open, setOpen] = React.useState(false);

    //Opening the popup box
    const handleClickOpen = () => {
      setOpen(true);
      
    };
  
    //Closing the Popup Box
    const handleClose = () => {
      setOpen(false);
    };



    const [isPopupOpen, setIsPopupOpen] = useState(false);
 
    const togglePopup = () => {
      setIsPopupOpen(!isPopupOpen);
      console.log("Toggling the Popup.")
    }

    const [name, setName] = useState('');
    const [deviceID, setDeviceID] = useState('');
    const [timesPerDay, setTimesPerDay] = useState('');
    const [timesPerWeek, setTimesPerWeek] = useState('');
    const [timePerWatering, setTimePerWatering] = useState('');

    const handleSubmit = async (e) => {

      // IDK
      e.preventDefault();

      try {
        let res = await fetch("https://h2bros.ddns.net/add_card", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plant_name: name,
            device_id: deviceID,
            tpd: timesPerDay,
            tpw: timesPerWeek,
            tpwater: timePerWatering,
            show_card: 0,
          }),
        });
        let resJson = await res.json();

        if (res.status === 200) {
          setDeviceID("");
          setName("");
          setTimesPerDay("");
          setTimesPerWeek("");
          setTimePerWatering("");
          props.getCard();
          console.log("Plant Card Created Successfully");
        } else {
          console.log("Some error occured");
        }
      } catch (err) {
        console.log(err);
      }

      handleClose();
    }
  
    
  
  return (
    <div >
        <Card onClick={handleClickOpen} sx={{ minWidth: 150, maxWidth: 150} }>
            <CardActionArea>
                <Typography>{props.name}</Typography>
            </CardActionArea>
        </Card>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add A New Plant!</DialogTitle>
        <DialogContent>
          <DialogContentText>
              Enter the new plants information here!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="deviceID_edit"
            label="Device ID"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setDeviceID(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="plantName"
            label="Plant Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            autoFocus
            type="number"
            margin="dense"
            id="tpd_water"
            label="Waterings Per Day"
            fullWidth
            variant="standard"
            onChange={(event) => setTimesPerDay(event.target.value)}
          />
          <TextField
            autoFocus
            inputProps={{ min: 1, max: 7 }}
            type="number"
            margin="dense"
            id="tpw_water"
            label="Watering Per Week"
            fullWidth
            variant="standard"
            onChange={(event) => setTimesPerWeek(event.target.value)}
          />
          <TextField
            autoFocus
            type="number"
            margin="dense"
            id="durination"
            label="How long Per Watering"
            fullWidth
            variant="standard"
            onChange={(event) => setTimePerWatering(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit this Data</Button>
        </DialogActions>
      </Dialog>
        {isPopupOpen && <Popups onClick={togglePopup} content={<>
          <form onSubmit={handleSubmit}>
            <label>
              Plant Name:
              <input type="text" onChange = {(e) => setName(e.target.value)} value={name}></input>
            </label>
            <br></br>
            <label>
              Device ID:
              <input type="text" onChange = {(e) => setDeviceID(e.target.value)} value={deviceID}></input>
            </label>
            <br></br>
            <label>
              Water How Many Time Per Day:
              <input type="number" min="1" max="6" onChange = {(e) => setTimesPerDay(e.target.value)} value={timesPerDay}></input>
            </label>
            <br></br>
            <label>
              How Many Days Per Week:
              <input type="number" min="1" max="7" onChange = {(e) => setTimesPerWeek(e.target.value)} value={timesPerWeek}></input>
            </label>
            <br></br>
            <label>
              Watering Duration (Seconds):
              <input type="number" min="5" max="60" onChange = {(e) => setTimePerWatering(e.target.value)} value={timePerWatering}></input>
            </label>
            <br></br>
            <Button type="submit">Submit Data!</Button>
            
          </form>
      </>}
    />}
    </div>
  );
}

export default BasicCard;