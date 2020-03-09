import React, { useState, useContext } from "react";
import Input from "../../Shares/Input/Input";
import { useForm } from "../../Shares/Hooks/inputHooks";
import LoadingSpinner from "../../Shares/Loading_Spinner/LoadingSpinner";
import Background from "../../Shares/Bakground/Background";
import Model from "../../Shares/Model/Model";
import { Appcontext } from "../../Shares/Context/AppContext";
import { useHttpHook } from "../../Shares/Hooks/httpHooks";
// import { useModelHooks } from "../../Shares/Hooks/modelHooks";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../Shares/Utils/Validators.js";
import "./Auth.css";
function Auth() {
  const Auth = useContext(Appcontext);
  const [
    isLoading,
    isError,
    errorHeader,
    errorDescription,
    makeRequest,
    clearError
  ] = useHttpHook();

  // This State is used to figure out that we are in login mode or signup mode so that we can render and can make AJAX call appropriately..
  const [isLogInMode, setLogInMode] = useState(true);
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
  // It will tell that any Whether we are in login or signup mode-
  const switchModeHandler = () => {
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
    if (!isLogInMode) {
      try {
        const Data = await makeRequest(
          "http://localhost:5000/api/v1/user/signup",
          "POST",
          JSON.stringify({
            name: States.inputs.name.value,
            email: States.inputs.email.value,
            password: States.inputs.password.value,
            image: "/Imgs/IMG_20181224_164433.jpg"
          }),
          {
            "Content-Type": "application/json"
          }
        );
        // If Everything Ok Then We Will Set isLogin As True-
        Auth.login(Data.User.id);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const Data = await makeRequest(
          "http://localhost:5000/api/v1/user/login",
          "POST",
          JSON.stringify({
            email: States.inputs.email.value,
            password: States.inputs.password.value
          }),
          {
            "Content-Type": "application/json"
          }
        );
        // If Everything Ok Then We Will Set isLogin As True-
        Auth.login(Data.User.id);
      } catch (error) {
        // Making ShowModelState as true because in the begging it was false and this function revert state-
        console.log(error);
      }
    }
  };
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      {isError && !isLoading && (
        <React.Fragment>
          <Background />
          <Model
            CloseModel={clearError}
            header={errorHeader}
            description={errorDescription}
          />
        </React.Fragment>
      )}
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
              SWITCH TO {isLogInMode ? "SIGNUP" : "LOGIN"}
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Auth;
