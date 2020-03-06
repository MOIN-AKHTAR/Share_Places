import React from "react";
import Input from "../../Shares/Input/Input";
import { VALIDATOR_REQUIRE } from "../../Shares/Utils/Validators.js";
import { useForm } from "../../Shares/Hooks/inputHooks";
import "./NewPlace.css";

export default function NewPlace() {
  const [states, InputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      }
    },
    false
  );
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
      <div className="form-control buttons">
        <button type="submit" disabled={!states.isValid}>
          Submit
        </button>
      </div>
    </form>
  );
}
