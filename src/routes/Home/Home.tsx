import * as React from "react";

import "./Home.scss";

const Home: React.SFC = () => {
  return (
    <div className="home">
      <h1 className="title">Welcome to a new React App!</h1>
      <img
        src={require("../../assets/images/React-icon.svg")}
        alt="react icon"
        className="react-logo"
      />
    </div>
  );
};

export default Home;
