import React, { useState, useContext } from "react";
import Input from "../../Shares/Input/Input";
import { useForm } from "../../Shares/Hooks/inputHooks";
import LoadingSpinner from "../../Shares/Loading_Spinner/LoadingSpinner";
import Background from "../../Shares/Bakground/Background";
import Model from "../../Shares/Model/Model";
import { useModelHooks } from "../../Shares/Hooks/modelHooks";
import { Appcontext } from "../../Shares/Context/AppContext";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../Shares/Utils/Validators.js";
import "./Auth.css";
function Auth() {
  const Auth = useContext(Appcontext);
  // It will be used for loading when any AJAX call is maded
  const [isLoading, setIsLoading] = useState(false);
  // This isError state make the Error Model visible if Any Error Occur After Completing AJAX call-
  const [isError, setIsError] = useState(false);
  // This state is used to set header of error on model
  const [errorHeader, setErrorHeader] = useState();
  // This state is used to set description of error on model
  const [errorDescription, seterrorDescription] = useState();
  // This Hook Used for Showing And Setting Model
  const [ShowModelState, ShowModel] = useModelHooks();
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
  // It will tell that any error occur after Ajax Call Completed
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
    // Since here we are going to make AJAX call therefor we make isLoading as true
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
        // Getting pure object
        const Data = await JSON_Data.json();
        //  Checking whether result of AJAX call is +ive or not
        if (Data.Status === "Fail") {
          throw new Error(Data.error.message);
        }
        // Since AJAX call has completed therefor making as false
        setIsLoading(false);
        // If Everything Ok Then We Will Set isLogin As True-
        Auth.login();
        console.log(Data);
      } catch (error) {
        // Setting Model Header when error occur
        setErrorHeader("Error Occur");
        // Setting Model Description when error occur
        seterrorDescription(error.message);
        // Since AJAX call has completed therefor making as false
        setIsLoading(false);
        // Since Error Occur therefor making  setIsError as true
        setIsError(true);
        // Making ShowModelState as true because in the begging it was false and this function revert state-
        ShowModel();
      }
    } else {
      try {
        const JSON_Data = await fetch(
          "http://localhost:5000/api/v1/user/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: States.inputs.email.value,
              password: States.inputs.password.value
            })
          }
        );
        // Getting pure object
        const Data = await JSON_Data.json();
        //  Checking whether result of AJAX call is +ive or not
        if (Data.Status === "Fail") {
          throw new Error(Data.error.message);
        }
        // Since AJAX call has completed therefor making as false
        setIsLoading(false);
        // If Everything Ok Then We Will Set isLogin As True-
        Auth.login();
        console.log(Data);
      } catch (error) {
        // Setting Model Header when error occur
        setErrorHeader("Error Occur");
        // Setting Model Description when error occur
        seterrorDescription(error.message);
        // Since AJAX call has completed therefor making as false
        setIsLoading(false);
        // Since Error Occur therefor making  setIsError as true
        setIsError(true);
        // Making ShowModelState as true because in the begging it was false and this function revert state-
        ShowModel();
      }
    }
  };
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      {isError && ShowModelState && (
        <React.Fragment>
          <Background />
          <Model
            CloseModel={ShowModel}
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
