import React, { useState } from "react";
import "./signUp_comoponent.scss";
import TextInputComponent from "../form_inputs_components/text";
import Button from "../buttons/button";
import { Link, withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loginSucceced } from "../../redux/user/user_action";
const SignUpComponent = ({ match, location, history, logInSucceed }) => {
  const [signUpdata, setSignUpdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (
      signUpdata.name === "" ||
      signUpdata.email === "" ||
      signUpdata.password === "" ||
      signUpdata.confirmPassword === ""
    ) {
      return false;
    }
    try {
      const resp = await fetch(`/signUp`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpdata),
      });
      const data = await resp.json();
      if (data.type === "success") {
        console.log(data)
        logInSucceed(data);
      }
      console.log(data.message);
    } catch (error) {
      error.message = "sorry something went wrong, please try again latter";
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpdata({
      ...signUpdata,
      [name]: value,
    });
  };

  return (
    <div className="form__signUp">
      <h1 className="form__signUp__heading">SIGN UP</h1>
      <form method="post" onSubmit={onSubmit} className="form">
        <TextInputComponent
          name="name"
          value
          type="text"
          handleChange={handleChange}
          placeholder="name"
          type="text"
          value={signUpdata.name}
        />
        <TextInputComponent
          type="email"
          handleChange={handleChange}
          placeholder="email"
          name="email"
          value={signUpdata.email}
        />
        <TextInputComponent
          type="password"
          handleChange={handleChange}
          placeholder="password"
          name="password"
          value={signUpdata.password}
        />
        <TextInputComponent
          type="password"
          handleChange={handleChange}
          placeholder="confirPassword"
          name="confirmPassword"
          value={signUpdata.confirmPassword}
        />
        <Button value="SignUp" />
        <Button value="Signin" outline onClick={() => history.push("/")} />
      </form>
    </div>
  );
};

const mapDispatch = (dispatch) => ({
  logInSucceed: (user) => dispatch(loginSucceced(user)),
});

export default connect(null, mapDispatch)(withRouter(SignUpComponent));
