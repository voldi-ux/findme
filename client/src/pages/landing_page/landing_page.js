import React, { useEffect, useState } from "react";
import SignInComponent from "../../components/signIn_component/signIn_comoponent";
import "./landing_page.scss";
import { Link } from "react-router-dom";

const LandingPage = ({ match }) => {

    return (
      <div className="landing_page__container">
        <img src={'/images/desktop.png'} />
        <div className="landing_page__content">
          <div className="landing_page__content-1"></div>

          <div className="landing_page__content-2">
            <h1 className="landing_page__heading">SIGN IN</h1>
            <SignInComponent />
          </div>
        </div>
      </div>
    );

};

export default LandingPage;
