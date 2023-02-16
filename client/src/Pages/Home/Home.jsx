import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import BatteryCharging20OutlinedIcon from '@mui/icons-material/BatteryCharging20Outlined';
import "./Home.css";

function Home() {
  return (
    <>
      <NavBar />
      <div className="HomePage">
        <div className="userDashStats"></div>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BatteryCharging20OutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Spam" />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </>
  );
}

export default Home;
