import React, { useState, useEffect } from "react";

// kein property information.
const Header = () => {
  const [menuLinksData, setMenuLinksData] =  useState([]);

  // Load the menu links data from the API Gateway
  const loadMenuLinksData = async() => {
    // Query the API Gateway
    const resp = await fetch('https://d4lqayj2ff.execute-api.ca-central-1.amazonaws.com/Production/menu_links');
    let jsonData = await resp.json();

    // Assign response data to our state variable
    setMenuLinksData(jsonData);
  }

  useEffect(() => {
    loadMenuLinksData();
  }, []);

  return (
    <header id="intro">
      <article className="fullheight">
        <div className="hgroup">
          <h1>Landon Hotelss</h1>
          <h2>West London</h2>
          <span style={{ color: "red" }}>恋の予感</span>
          <p>
            <a href="#welcome">
              <img
                src="https://landonhotel.com/images/misc/arrow.png"
                alt="down arrow"
              />
            </a>
          </p>
        </div>
        
      </article>

      <nav id="nav">
        <div className="navbar">
          <div className="brand">
            <a href="#welcome">
              Landon <span>Hotel</span>
            </a>
          </div>
          <ul>
            {menuLinksData.map((link) => (
              <li>
                <a className={`icon ${link.class}`} href={link.href}>
                  <span>{link.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
