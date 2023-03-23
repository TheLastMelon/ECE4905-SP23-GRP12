import React, { useState } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import "./StyleSheets/style.css";
import MainCard from "./MainCard";

function App() {

  

  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);

    if(!sidebarOpen){
      setMarginSize("15%")
    }else{
      setMarginSize("0%")
    }
  };

  const [marginSize, setMarginSize] = useState("0%")

  const [cards, setCards] = useState([]);

  const addCard = (value) =>{

    //console.log(value.Show)

    if(value.Show === 0){

      console.log("This Card Will be Shown")
      
      /*
        Formating
        [name, deviceID, timesPerDay, timesPerWeek, timePerWatering]
      */
      const singleCard = [value.PlantName, value.DeviceID, value.TimesPerDay, value.TimesPerWeek, value.Duration]

      const newCard = [...cards, ["s", "s"]];

      setCards([...cards, newCard]);
  
      console.log("Current Value of Cards State:");
      console.log(newCard);
    }else{
      console.log("This Card Will Not be Shown");
    }

  }

  const temp = () => {

    if(sidebarOpen){
      return {marginRight: "80px"}
    }
  }

  /**
   * This function will get a list of all cards from the Database where 
   * All the Show columns have a value of 0.
   */
  const getCards = () =>{

    // Setting the card array with an empty set
    setCards([]);

    // Starting the fetch process to get all the cards
    fetch('https://h2bros.ddns.net/cards')
         .then((response) => response.json())
         .then((data) => {
            console.log("======== Got the Data From Server ========")
            console.log(data);
            console.log("======== End of the Data ========")
            var c = []
            for(let i = 0; i < Object.keys(data).length; i++){
              
              var singleCard = [data[i].PlantName, data[i].DeviceID, data[i].TimesPerDay, data[i].TimesPerWeek, data[i].Duration, data[i].ID]
              
              c = [...c, singleCard]
              
              console.log("New Card:")
              console.log(c)
            }

            setCards(c);
         })
         .catch((err) => {
            console.log(err.message);
         });
  }

  const  removeCard = async (cardIndex, cardID) => {

    // create a new array without the item that you are removing
    const newCards = cards.filter((card, index) => index !== cardIndex);
    console.log("The Card ID is: " + cardID);

    try{
      let res = await fetch("https://h2bros.ddns.net/remove_card", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: cardID,
        }),
      });
    }catch{
      console.log("Error has occured while remove the card");
    }

    setCards(newCards);
  };

  return (
    <span onLoad={getCards}>
      <Header onClick={handleViewSidebar} />
      <SideBar onClick={handleViewSidebar} isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} addCard={addCard} getCard={getCards}/>
      <div style={{marginTop: "70px", marginLeft: marginSize, transition: "left 1.3s ease-in-out"}}>
      {cards.map((cardNumber, index) => (
           <MainCard number={cardNumber} onRemove={() => removeCard(index, cardNumber[5])} index={index} />
      ))}
      </div>
      
    </span>

   
  );
}

export default App;
