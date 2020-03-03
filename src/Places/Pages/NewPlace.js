import React, { useCallback, useReducer } from "react";
import Input from "../../Shares/Input/Input";
import { VALIDATOR_REQUIRE } from "../../Shares/Utils/Validators.js";
import "./NewPlace.css";

const formReducer = (State = {}, Action) => {
  switch (Action.type) {
    case "INPUT_CHANGE": {
      let formIsValid = true;
      for (const inputId in State.inputs) {
        if (inputId === Action.inputId) {
          // For current input
          formIsValid = formIsValid && Action.isValid;
        } else {
          formIsValid = formIsValid && State.inputs[inputId].isValid;
        }
      }
      return {
        ...State,
        inputs: {
          ...State.inputs,
          [Action.inputId]: {
            value: Action.value,
            isValid: Action.isValid
          }
        },
        isValid: formIsValid
      };
    }
    default: {
      return State;
    }
  }
};
export default function NewPlace() {
  const [states, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      }
    },
    isValid: false
  });
  const InputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      inputId: id,
      value,
      isValid
    });
  }, []);
  const submitData = event => {
    event.preventDefault();
    console.log(states);
  };
  return (
    <form className="place-form" onSubmit={submitData}>
      <Input
        id={"title"}
        element={"input"}
        type={"text"}
        placeholder={"Please Insert Title"}
        label={"Title"}
        errorText={"Please Provide Title"}
        validators={[VALIDATOR_REQUIRE()]}
        onInput={InputHandler}
      />
      <Input
        id={"description"}
        type={"textarea"}
        element={"noinput"}
        placeholder={"Please Insert Description"}
        label={"Description"}
        errorText={"Please Provide Description"}
        validators={[VALIDATOR_REQUIRE()]}
        onInput={InputHandler}
      />
      <div className="form-control">
        <button type="submit" disabled={!states.isValid}>
          Submit
        </button>
      </div>
    </form>
  );
}
