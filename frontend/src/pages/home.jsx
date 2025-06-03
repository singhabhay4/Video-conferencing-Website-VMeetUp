import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";

import { Button, IconButton, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);
  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <div className="homeContainer">
      {/* Transparent Navbar */}
      <div className="navBar">
        <h2 className="logo">VMeetUp</h2>

        <div>
          <p onClick={() => navigate("/history")}>History</p>

          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            className="logoutButton"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Fullscreen Content Area */}
      <div className="meetContainer">
        {/* Left Panel with Text and Form */}
        <div className="leftPanel">
          <div>
            <p className="tagline">Connecting Minds. Anywhere. Anytime.</p>

            <div className="heroinput">
              <input
                onChange={(e) => setMeetingCode(e.target.value)}
                id="outlined-basic"
                placeholder="Meeting Code"
              />
              <Button onClick={handleJoinVideoCall} variant="contained">
                Join
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel with Image */}
        <div className="rightPanel">
          <img src="connect.jpg" alt="illustration" />
        </div>
      </div>
    </div>
  );
}

export default withAuth(HomeComponent);
