import React, { useState, useEffect } from "react";
import "./signIn_comoponent.scss";
import TextInputComponent from "../form_inputs_components/text";
import Button from "../buttons/button";
import {  useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {  loginSucceed } from "../../redux/user/user_action";
import Alert from "../alert/alert";

const SignInComponent = ({ black, startLogin }) => {
  const history = useHistory();
  const [userInputs, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [err, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const login = async () => {
    try {
      const resp = await fetch("/signin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInputs),
      });

      const data = await resp.json();
      if (data.type === "success") {
        startLogin(data);
      }
      setErrMsg(data.message);
      setError(true);
    } catch (error) {
      error.message = "something went wrong, please try again later";
      setErrMsg(error.message);
      setError(true);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (userInputs.email === "" || userInputs.password === "") {
      setErrMsg("all fields must be filled");
      setError(true);
      return;
    }
    login();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInputs, [name]: value });
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
    <div className={`form__signIn ${black ? "black" : ""}`}>
       <form autoComplete='off' onSubmit={onSubmit} className="form ">
        {err ? <Alert message={errMsg} type="alert-danger" /> : null}
        <TextInputComponent
          id="sdfa"
          err={err}
          handleChange={handleChange}
          name="email"
          placeholder="email"
          type="email"
        />
        <TextInputComponent
          id="ssdfa"
          err={err}
          handleChange={handleChange}
          name="password"
          placeholder="password"
          type="password"
        />
        <Button value="SignIn" onClick={onSubmit} />
        <Button value="SignUp" outline onClick={() => history.push("signup")} />
      </form>
      <p></p>
    </div>
  );
};
const mapDispatchTprops = (dispatch) => ({
  startLogin: (data) => dispatch(loginSucceed(data)),
});
export default connect(null, mapDispatchTprops)(SignInComponent);
