import React from "react";

const AppBar = () => {
  return (
    <header class="header" data-header>
      <div class="container">
        <div class="overlay" data-overlay></div>
        <a href="#" class="logo">
          Code Lab
        </a>
        <div class="header-actions">
          <a href="" class="btn" aria-labelledby="aria-label-txt">
            <ion-icon name="car-outline"></ion-icon>
            <span id="aria-label-txt">
              <ion-icon name="add"></ion-icon>
              Place Add
            </span>
          </a>
          <a href="#" class="btn user-btn" aria-label="Profile">
            <ion-icon name="person-outline"></ion-icon>
          </a>
        </div>
      </div>
    </header>
  );
};

export default AppBar;
