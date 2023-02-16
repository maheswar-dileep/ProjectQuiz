import { Avatar, Button } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../context/User";
import "./NavBar.css";

function NavBar() {
  const userContext = useContext(User);
  const navigate = useNavigate();
  return (
    <div className="Navbar">
      <div className="bar">
        <h4 className="logo">Quizo</h4>
        {userContext?.user && (
          <Avatar
            alt={userContext?.user?.name ? userContext?.user?.name : userContext?.user?.email}
            src={userContext?.user?.photoURL ? userContext?.user?.photoURL : "/img/Profile-Demo.jpg"}
          />
        )}
        {!userContext?.user && <Button onClick={(e) => navigate("/login")}>Login</Button>}
      </div>
      <div className="spacer"></div>
    </div>
  );
}

export default NavBar;
