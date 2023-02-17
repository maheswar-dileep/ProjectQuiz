import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar/SideBar";
import LoaderFullPage from "./context/LoaderFullPage";
import User from "./context/User";
import { useSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";

//Importing Pages
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import NotFound from "./Pages/NotFound/NotFound";
import Quiz from "./Pages/Quiz/Quiz";
import Step1 from "./Pages/Step1/Step1";
import Step2 from "./Pages/Step2/Step2";
import Step3 from "./Pages/Step3/Step3";
import Step4 from "./Pages/Step4/Step4";
import { authServer } from "./Services/Axios";
import { Button, IconButton } from "@mui/material";

function App() {
  // constants
  const loader = useRef({});
  const [user, setUser] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  // full page loader handiler
  const showFullPageLoader = () => loader.current.classList.add("show");
  const hideFullPageLoader = () => loader.current.classList.remove("show");

  const updateUserData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) setUser(null);
    else
      try {
        const res = await authServer.get("/user_data", { headers: { authorization: `Bearer ${accessToken}` } });
        setUser(res.data?.data);
        return true;
      } catch (error) {
        try {
          if (!error.response?.status === 401) throw error;
          const headers = { headers: { authorization: `Bearer ${refreshToken}` } };
          const res = await authServer.post("/generate_access_token", {}, headers);
          localStorage.setItem("accessToken", res.data?.data?.accessToken);
          updateUserData();
          return true;
        } catch (error) {
          console.warn(error);
          return false;
        }
      }
    return false;
  };
  // this use effect act as data initializer for entier application
  useEffect(() => {
    const getUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) setUser(null);
      else
        try {
          const res = await authServer.get("/user_data", { headers: { authorization: `Bearer ${accessToken}` } });
          setUser(res.data?.data);
          if (res?.data?.data?.steps <= 4) {
            const action = (
              <React.Fragment>
                <Button color="primary" size="small">
                  Complete now
                </Button>
                <IconButton size="small" aria-label="close" color="inherit">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            );
            enqueueSnackbar("Complete Login steps", { action: action });
          }
          return true;
        } catch (error) {
          try {
            if (!error.response?.status === 401) throw error;
            // headers whith refresh token
            const headers = { headers: { authorization: `Bearer ${refreshToken}` } };
            const res = await authServer.post("/generate_access_token", {}, headers);
            localStorage.setItem("accessToken", res.data?.data?.accessToken);
            getUserData();
            return true;
          } catch (error) {
            // error while accessing data or error while getting new access token
            console.warn(error);
            return false;
          }
        }
      return false;
    };
    //
    showFullPageLoader();
    const loadingHideDelay = Date.now() + 500; // loading will show for atleast 1/2s.
    // getting user data
    getUserData().then(() => {
      while (loadingHideDelay > Date.now()) {}
      hideFullPageLoader();
    });
    // eslint-disable-next-line
  }, []);

  return (
    <LoaderFullPage.Provider value={{ showFullPageLoader, hideFullPageLoader }}>
      <User.Provider value={{ user, setUser, updateUserData }}>
        <div className="App">
          <div className="loadingFullPage" ref={loader}>
            <div className="banter-loader">
              <div className="banter-loader__box"></div>
              <div className="banter-loader__box"></div>
              <div className="banter-loader__box"></div>
              <div className="banter-loader__box"></div>
              <div className="banter-loader__box"></div>
              <div className="banter-loader__box"></div>
              <div className="banter-loader__box"></div>
              <div className="banter-loader__box"></div>
              <div className="banter-loader__box"></div>
            </div>
            <h2>Team Quiz</h2>
          </div>

          <Routes>
            <Route
              path="/"
              element={
                <SideBar>
                  <Home />
                </SideBar>
              }
            />
            <Route
              path="/quiz"
              element={
                <SideBar>
                  <Quiz />
                </SideBar>
              }
            ></Route>
            <Route path="/explore" element={<SideBar>Explore</SideBar>}></Route>
            <Route path="/tasks" element={<SideBar>Tasks</SideBar>}></Route>
            <Route path="/settings" element={<SideBar>Settings</SideBar>}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/quiz" element={<Quiz />}></Route>
            <Route path="/Profile" element={<Profile />}></Route>
            <Route path="/step" element={<Step1 />}></Route>
            <Route path="/step2" element={<Step2 />}></Route>
            <Route path="/step3" element={<Step3 />}></Route>
            <Route path="/step4" element={<Step4 />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </User.Provider>
    </LoaderFullPage.Provider>
  );
}

export default App;