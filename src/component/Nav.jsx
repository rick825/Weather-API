import React from 'react';
import '../css/Nav.css';

const Nav = () => {
  return (
    <>
      <div className="nav">
        <div className="navlogo">
          <h2>Weather App</h2>
        </div>
        <div className="navmain">
          <ul className="navlist">
            <li className="navitem">Home</li>
            <li className="navitem">About</li>
            <li className="navitem">Contact</li>
            <li className="navitem">Help</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Nav;
