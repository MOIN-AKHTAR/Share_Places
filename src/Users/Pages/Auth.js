import React, { useState, useContext } from "react";
import Input from "../../Shares/Input/Input";
import { useForm } from "../../Shares/Hooks/inputHooks";
import LoadingSpinner from "../../Shares/Loading_Spinner/LoadingSpinner";
import Background from "../../Shares/Bakground/Background";
import Model from "../../Shares/Model/Model";
import { Appcontext } from "../../Shares/Context/AppContext";
import { useHttpHook } from "../../Shares/Hooks/httpHooks";
import UploadImage from "../../Shares/UploadImage/UploadImage";
// import { useModelHooks } from "../../Shares/Hooks/modelHooks";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../Shares/Utils/Validators.js";
import "./Auth.css";
function Auth() {
  // It is a Context which will bes used to check the loggedInuser Status And His/Her Id-
  const Auth = useContext(Appcontext);
  // useHttpHook is our custom hook which will give you are we loading while making request or get some error from request's response-
  // isError will show do we have any error during request-
  // errorheader and description will give you whole information on a model-
  // Makerequest is a function which help you to make request-
  // clearError is a function which will set isError as false inorder to close the error model
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
  // here useForm is a custom hook which will set your initial data and provude you states-
  // Inputhandler will let you to check whether the whole form data is valid or not-
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
          name: undefined,
          image: undefined
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
          },
          image: {
            value: "",
            isValid: false
          }
        },
        false
      );
    }
    // It will change mode if we are in login it will change to signup and vice versa-
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
            image: States.inputs.image.value
          }),
          {
            "Content-Type": "application/json"
          }
        );
        // If Everything Ok Then We Will Set isLogin As True-
        Auth.login(Data.User.id);
      } catch (error) {}
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
      {/* If we are loading then we will show spinner */}
      {isLoading && <LoadingSpinner asOverlay />}
      {/* If any error we will show background and error model */}
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
        {isLogInMode ? <h2>Login Required</h2> : <h2>Signup Required</h2>}
        <hr />
        <form onSubmit={switchModeHandler}>
          {!isLogInMode && <UploadImage id={"image"} onInput={InputHandler} />}
          {/* If we are is not in loginmode the Name input will also be visible- */}
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
