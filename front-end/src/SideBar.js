import React from "react";
import BasicCard from "./BasicCard";
import { CardMedia, Grid, Stack, Box } from "@mui/material";
import Popup from "./Popup";

const SideBar = props => {

    const sidebarClass = props.isOpen ? "sidebar open" : "sidebar";

    return (
      <div className={sidebarClass}>
        {
        props.isOpen && 
        <Grid  >
          <Box sx={{width: '50%'}}>
            <BasicCard name="Add a Plant!" addCard={props.addCard} getCard={props.getCard}/>
          </Box>
        </Grid>
        }
        <div>
          <Button variant="contained" onClick={props.onClick} >Close Me!</Button>
        </div>        
      </div>
    );
  }

  export default SideBar;
  