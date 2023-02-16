import { Avatar, Badge, Button, Stack } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import CommentIcon from "@mui/icons-material/CommentOutlined";
import User from "../../context/User";
import "./NavBar.css";

function NavBar() {
  const userContext = useContext(User);
  const navigate = useNavigate();
  return (
    <div className="Navbar">
      <div className="bar">
        <h4 className="logo">Quizo</h4>
        <Stack spacing={3} direction="row" alignItems="center">
          {userContext?.user && (
            <>
              <Stack spacing={1} direction="row" alignItems="center">
                <CommentIcon />
                <Badge badgeContent={1} color="primary">
                  <NotificationsIcon />
                </Badge>
              </Stack>
              <Avatar
                alt={userContext?.user?.name ? userContext?.user?.name : userContext?.user?.email}
                src={userContext?.user?.photoURL ? userContext?.user?.photoURL : "/img/Profile-Demo.jpg"}
              />
            </>
          )}
          {!userContext?.user && <Button onClick={(e) => navigate("/login")}>Login</Button>}
        </Stack>
      </div>
      <div className="spacer"></div>
    </div>
  );
}

export default NavBar;
