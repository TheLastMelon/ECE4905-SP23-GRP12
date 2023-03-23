import React from "react";
import BasicCard from "./BasicCard";
import {  Grid, Box } from "@mui/material";

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
          <button onClick={props.onClick} >Close Me!</button>
        </div>        
      </div>
    );
  }

  export default SideBar;
  