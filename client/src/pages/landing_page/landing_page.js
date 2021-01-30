import React from "react";
import SignInComponent from "../../components/signIn_component/signIn_comoponent";
import "./landing_page.scss";

const LandingPage = () => {

    return (
      <div className="landing_page__container">
        <img src={'/images/desktop.png'} alt='bg '/>
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
