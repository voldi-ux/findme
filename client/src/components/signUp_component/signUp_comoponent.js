import React, { useState, useEffect } from "react";
import "./signUp_comoponent.scss";
import TextInputComponent from "../form_inputs_components/text";
import Button from "../buttons/button";
import { Link, withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loginSucceed } from "../../redux/user/user_action";
import Alert from "../alert/alert";
const SignUpComponent = ({ match, location, history, logInSucceed }) => {
  const [err, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

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
      setErrMsg("all fields must be filled");
      setError(true);
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
        console.log(data);
        logInSucceed(data);
        return;
      }
      setErrMsg(data.message);
      setError(true);
      console.log(data.message);
    } catch (error) {
      error.message = "something went wrong, please try again later";
      setErrMsg(error.message);
      setError(true);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpdata({
      ...signUpdata,
      [name]: value,
    });
  };

  useEffect(() => {
    if (err || errMsg.length) {
      setTimeout(() => {
        setErrMsg("");
        setError(false);
      }, 5000);
    }
  }, [err, errMsg]);

  return (
    <div className="form__signUp">
      <h1 className="form__signUp__heading">SIGN UP</h1>
      <form autoComplete='off' method="post" onSubmit={onSubmit} className="form">
        {err ? <Alert message={errMsg} type="alert-danger" /> : null}

        <TextInputComponent
          id="fdssfs"
          name="name"
          err={err}
          type="text"
          handleChange={handleChange}
          placeholder="name"
          type="text"
          value={signUpdata.name}
        />
        <TextInputComponent
          err={err}
          id="ffdsfs"
          type="email"
          handleChange={handleChange}
          placeholder="email"
          name="email"
          value={signUpdata.email}
        />
        <TextInputComponent
          err={err}
          id="fdsfsd"
          type="password"
          handleChange={handleChange}
          placeholder="password"
          name="password"
          value={signUpdata.password}
        />
        <TextInputComponent
          id="fdsfs"
          err={err}
          type="password"
          handleChange={handleChange}
          placeholder="confirmPassword"
          name="confirmPassword"
          value={signUpdata.confirmPassword}
        />
        <Button value="SignUp" onClick={onSubmit} />
        <Button value="Signin" outline onClick={() => history.push("/")} />
      </form>
    </div>
  );
};

const mapDispatch = (dispatch) => ({
  logInSucceed: (user) => dispatch(loginSucceed(user)),
});

export default connect(null, mapDispatch)(withRouter(SignUpComponent));
