import React, { useState } from "react";
import Input from "../../Shares/Input/Input";
import { useForm } from "../../Shares/Hooks/inputHooks";
import LoadingSpinner from "../../Shares/Loading_Spinner/LoadingSpinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../Shares/Utils/Validators.js";
import "./Auth.css";
function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [States, InputHandler, SetDataHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    false
  );
  const [isLogInMode, setLogInMode] = useState(false);
  const switchModeHandler = () => {
    setLogInMode(true);
    if (!isLogInMode) {
      SetDataHandler(
        {
          ...States.inputs,
          name: undefined
        },
        States.inputs.email.isValid && States.inputs.password.isValid
      );
    } else {
      SetDataHandler(
        {
          ...States.inputs,
          name: {
            value: "",
            isValid: false
          }
        },
        false
      );
    }
    setLogInMode(prevMode => !prevMode);
  };
  const LoginOrSignup = async e => {
    e.preventDefault();
    setIsLoading(true);
    if (!isLogInMode) {
      try {
        const JSON_Data = await fetch(
          "http://localhost:5000/api/v1/user/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: States.inputs.name.value,
              email: States.inputs.email.value,
              password: States.inputs.password.value
            })
          }
        );
        const Data = await JSON_Data.json();
        setIsLoading(false);
        console.log(Data);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(States);
    }
  };
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <div className={"form-control"}>
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={switchModeHandler}>
          {!isLogInMode && (
            <Input
              element={"input"}
              id={"name"}
              type={"name"}
              label={"Name"}
              placeholder={"Please Enter Your Name"}
              errorText={"Please Provide Name"}
              validators={[VALIDATOR_REQUIRE()]}
              onInput={InputHandler}
            />
          )}
          <Input
            element={"input"}
            id={"email"}
            type={"email"}
            label={"Email"}
            placeholder={"Please Enter Your Email"}
            errorText={"Please Provide Correct Email"}
            validators={[VALIDATOR_EMAIL()]}
            onInput={InputHandler}
          />
          <Input
            element={"input"}
            id={"password"}
            type={"password"}
            label={"Password"}
            placeholder={"Please Enter Your Password"}
            errorText={"Please Provide Password (atleast (6) Character"}
            validators={[VALIDATOR_MINLENGTH(6)]}
            onInput={InputHandler}
          />
          <div className={"form-control button_section"}>
            <button
              type="submit"
              disabled={!States.isValid}
              onClick={LoginOrSignup}
            >
              {isLogInMode ? "LOGIN" : "SIGNUP"}
            </button>
            <button type="button" onClick={switchModeHandler}>
              Switch To {isLogInMode ? "SIGNUP" : "LOGIN"}
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Auth;
