import { Button, IconButton, Snackbar } from "@mui/material";
import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import CloseIcon from "@mui/icons-material/Close";
import "./Home.css";

function Home() {
  const [show, setShow] = useState(false);
  const action = (
    <React.Fragment>
      <Button color="primary" size="small">
        Complete now
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={(e) => setShow(false)}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <NavBar />
      <div className="HomePage">
        <div className="userDashStats" onClick={() => setShow(true)}></div>
      </div>
      <Snackbar color="secondary" autoHideDuration={6000} message="Finish Signup steps" open={show} action={action} />
      <Snackbar color="secondary" autoHideDuration={6000} message="Finish Signup steps" open={show} action={action} />
    </>
  );
}

export default Home;
