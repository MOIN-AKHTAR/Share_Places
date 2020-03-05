import React, { useState } from "react";
import Input from "../../Shares/Input/Input";
import { useForm } from "../../Shares/Hooks/inputHooks";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../Shares/Utils/Validators.js";
import "./Auth.css";
function Auth() {
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
  const [isLogInMode, setLogInMode] = useState(true);
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
  const Show = e => {
    console.log(States);
  };
  return (
    <div className={"form-control"}>
      <h2>Login Required</h2>
      <hr />
      <form>
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
          errorText={"Please Provide Password (atleast (5) Character"}
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={InputHandler}
        />
        <div className={"form-control button_section"}>
          <button type="button" disabled={!States.isValid} onClick={Show}>
            {isLogInMode ? "LOGIN" : "SIGNUP"}
          </button>
          <button type="button" onClick={switchModeHandler}>
            Switch To {isLogInMode ? "SIGNUP" : "LOGIN"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Auth;
