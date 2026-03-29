import React from "react";
import { Link } from "react-router-dom";
import "./What.css";

function What() {
  return (
    <div className="container">
      <div className="text">
        <h1>New Zealand Trip Planner</h1>

        <h2>
          Ready to plan your trip to New Zealand?
          <span className="new-line">
            Organize and map your itinerary with our{" "}
            <Link to="/services" className="highlight">
              free trip planner
            </Link>.
          </span>
        </h2>

        <Link to="/services">
          <button className="start-button">Start Planning Trip</button>
        </Link>

      </div>

      <div className="image-container">
        <img src="/images/nzbluemap.png" alt="New Zealand trip planning map" />
      </div>
    </div>
  );
}

export default What;