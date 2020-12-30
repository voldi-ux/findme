import React from "react";
import "./signIn.scss";
import { connect } from "react-redux";
import SignInComponent from "../../components/signIn_component/signIn_comoponent";
const SignIn = () => (
  <div className="signin_page">
    <SignInComponent />
  </div>
);

export default SignIn;
