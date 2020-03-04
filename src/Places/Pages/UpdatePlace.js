import React, { useEffect } from "react";
import Input from "../../Shares/Input/Input";
import { VALIDATOR_REQUIRE } from "../../Shares/Utils/Validators.js";
import { useForm } from "../../Shares/Hooks/inputHooks";
import "./NewPlace.css";

function UpdatePlace() {
  const [state, InputHandler, SetDataHandler] = useForm(
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

  // After Making AJAX Call We Get A Place From Server---
  let Place = {};
  useEffect(() => {
    SetDataHandler(
      {
        title: {
          value: Place.title,
          // Validity Of Title Is Also True Because We Will Have Value After Ajax Call
          isValid: true
        },
        description: {
          value: Place.description,
          // Validity Of Description Is Also True Because We Will Have Value After Ajax Call
          isValid: true
        }
      },
      // Overall Form Validity Changes To True
      true
    );
  });
  if (!state.inputs.title.value) {
    return <h1>NOT FOUND SORRY</h1>;
  }
  return (
    <form className="place-form ">
      <Input
        id={"title"}
        type={"text"}
        element={"Input"}
        label={"Title"}
        placeholder={"Please Insert Title"}
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
        <button type="submit" disabled={!state.isValid}>
          Update
        </button>
      </div>
    </form>
  );
}

export default UpdatePlace;
