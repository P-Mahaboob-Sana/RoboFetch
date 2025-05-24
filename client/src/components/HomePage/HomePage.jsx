import React from "react";
import "./HomePage.css";


const Home = () => {
  return (
    <div className="home-container">
      <div className="home-text">
        <h1>Your Trusted Online Pharmacy</h1>
        <p>
          Find genuine medicines, health products, and healthcare essentials all in one place. 
          Fast delivery and secure packaging right at your doorstep.
        </p>
        <button className="shop-now-btn">Shop Now</button>
      </div>
      <div className="home-image">
        <img src="" alt="Pharmacy-img" />
      </div>
    </div>
  );
};

export default Home;
