import React,{useState} from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Popups from './Popup';


const BasicCard = props => {

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

      const DEBUG = true;

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

        if(DEBUG){
          console.log("The Result from adding the card " + deviceID + "is" + resJson);
        }

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

      togglePopup();
      //props.addCard([name, deviceID, timesPerDay, timesPerWeek, timePerWatering]);
    }
  
    
  
  return (
    <div >
        <Card onClick={togglePopup} sx={{ minWidth: 150, maxWidth: 150} }>
            <CardActionArea>
                <Typography>{props.name}</Typography>
            </CardActionArea>
        </Card>
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
              Watering Durination (Seconds):
              <input type="number" min="5" max="60" onChange = {(e) => setTimePerWatering(e.target.value)} value={timePerWatering}></input>
            </label>
            <br></br>
            <button type="submit">Submit Data!</button>
            
          </form>
      </>}
    />}
    </div>
  );
}

export default BasicCard;