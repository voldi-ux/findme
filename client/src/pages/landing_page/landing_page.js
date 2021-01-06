import React, { useEffect, useState } from "react";
import SignInComponent from "../../components/signIn_component/signIn_comoponent";
import "./landing_page.scss";
import { Link } from "react-router-dom";

const LandingPage = ({ match }) => {
  const [urlImg, setUrl] = useState("/images/desktop.png");
  const [width, setWidth] = useState(window.innerWidth);

  const checkWindowSize = () => {
    const Width = window.innerWidth;
    setWidth(Width);
    console.log(Width);
    if (width < 760) {
      setUrl("/images/phone.png");
    } else {
      setUrl("/images/desktop.png");
    }
  };

  useEffect(() => {
    if (width < 760) {
      setUrl("/images/phone.png");
    }
    window.addEventListener("resize", checkWindowSize);
    return () => window.removeEventListener("resize", checkWindowSize);
  }, [width]);

  
    return (
      <div className="landing_page__container">
        <img src={urlImg} />
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
