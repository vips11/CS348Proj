import React from "react";
import "./Header.css"; // import the CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <div className="search-bar">
        {/* left-aligned search bar */}
        <input type="text" placeholder="Search" />
      </div>
      <div className="center-icons">
        {/* 3 centered squares */}
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
      <div className="right-icons">
        {/* 3 circles */}
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </header>
  );
};

const Home = () => {
  return (
    <div>
      <Header />
      <div>Hello, World!</div>
    </div>
  );
};

export default Home;
