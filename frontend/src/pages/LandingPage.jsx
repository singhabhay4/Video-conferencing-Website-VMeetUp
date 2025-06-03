import { Link } from "react-router-dom";
import React from "react";
export default function LandingPage() {
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
        
          <h2>VMeetUp</h2>
        </div>
        <div role="button">
          <Link to={"/auth"}>Get Started</Link>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1>
            <span style={{ color: "#FF9839" }}>Connect</span> with your loved
            Ones
          </h1>

          <p>
            Cover a distance by{" "}
            <span style={{ color: "#FF9839" }}>VMeetUp</span>
          </p>
          <p>Enjoy uninterrupted video calls, anywhere.</p>
        </div>
        <div>
          <img
            src="home.png"
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
}
