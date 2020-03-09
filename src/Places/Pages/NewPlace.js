import React, { useCallback, useContext } from "react";
import Input from "../../Shares/Input/Input";
import { VALIDATOR_REQUIRE } from "../../Shares/Utils/Validators.js";
import { useForm } from "../../Shares/Hooks/inputHooks";
import { useHttpHook } from "../../Shares/Hooks/httpHooks";
import LoadingSpinner from "../../Shares/Loading_Spinner/LoadingSpinner";
import Background from "../../Shares/Bakground/Background";
import Model from "../../Shares/Model/Model";
import { Appcontext } from "../../Shares/Context/AppContext";
import { useHistory } from "react-router-dom";
import "./NewPlace.css";

export default function NewPlace() {
  const Auth = useContext(Appcontext);
  const historyObj = useHistory();
  const [
    isLoading,
    isError,
    errorHeader,
    errorDescription,
    makeRequest,
    clearError
  ] = useHttpHook();
  const [states, InputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      },
      address: {
        value: "",
        isValid: false
      }
    },
    false
  );
  const AddPlace = useCallback(
    async event => {
      event.preventDefault();
      try {
        await makeRequest(
          "http://localhost:5000/api/v1/place/",
          "POST",
          JSON.stringify({
            title: states.inputs.title.value,
            description: states.inputs.description.value,
            address: states.inputs.address.value,
            creator: Auth.loggedInUser,
            image: "/Imgs/IMG_20181224_164433.jpg"
          }),
          {
            "Content-Type": "application/json"
          }
        );
        historyObj.push(`/${Auth.loggedInUser}/places`);
      } catch (error) {
        console.log(error);
      }
    },
    [makeRequest, historyObj, states, Auth.loggedInUser]
  );

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      {isError && (
        <React.Fragment>
          <Background />
          <Model
            CloseModel={clearError}
            header={errorHeader}
            description={errorDescription}
          />
        </React.Fragment>
      )}
      <form className="place-form" onSubmit={AddPlace}>
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
        <Input
          id={"address"}
          type={"textarea"}
          element={"noinput"}
          placeholder={"Please Insert Address"}
          label={"Address"}
          errorText={"Please Provide Address"}
          validators={[VALIDATOR_REQUIRE()]}
          onInput={InputHandler}
        />
        <div className="form-control buttons">
          <button type="submit" disabled={!states.isValid}>
            Submit
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}
