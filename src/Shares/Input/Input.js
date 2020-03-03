import React, { useReducer, useEffect } from "react";
import { validate } from "../Utils/Validators.js";
import "./Input.css";
const inputReducer = (State = {}, Action) => {
  switch (Action.type) {
    case "CHANGE": {
      return {
        ...State,
        value: Action.value,
        isValid: validate(Action.value, Action.validators)
      };
    }
    case "ONBLUR": {
      return {
        ...State,
        isTouched: true
      };
    }
    default: {
      return State;
    }
  }
};
export default function Input(props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    isValid: props.isValid || false,
    isTouched: false
  });
  const { value, isValid } = inputState;
  const { id, onInput } = props;
  useEffect(() => {
    onInput(id, value, isValid);
  }, [value, isValid, id, onInput]);
  const eventChange = event => {
    dispatch({
      type: "CHANGE",
      value: event.target.value,
      validators: props.validators
    });
  };

  const touchChange = event => {
    dispatch({
      type: "ONBLUR"
    });
  };
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={eventChange}
        onBlur={touchChange}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={eventChange}
        onBlur={touchChange}
        value={inputState.value}
        placeholder={props.placeholder}
      />
    );
  return (
    <div
      className={`form-control ${!inputState.isValid &&
        inputState.isTouched &&
        "form-control--invalid"}`}
    >
      <label>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
}
