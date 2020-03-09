import React, { useEffect, useState, useContext } from "react";
import Input from "../../Shares/Input/Input";
import Background from "../../Shares/Bakground/Background";
import Model from "../../Shares/Model/Model";
import { VALIDATOR_REQUIRE } from "../../Shares/Utils/Validators.js";
import { useForm } from "../../Shares/Hooks/inputHooks";
import { useHttpHook } from "../../Shares/Hooks/httpHooks";
import { useParams, useHistory } from "react-router-dom";
import LoadingSpinner from "../../Shares/Loading_Spinner/LoadingSpinner";
import { Appcontext } from "../../Shares/Context/AppContext";
import "./NewPlace.css";

function UpdatePlace() {
  const Auth = useContext(Appcontext);
  const id = useParams().uid;
  const historyObj = useHistory();
  const [loadedPlace, setLoadedPlace] = useState();
  const [States, InputHandler, SetDataHandler] = useForm(
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
  const [
    isLoading,
    isError,
    errorHeader,
    errorDescription,
    makeRequest,
    clearError
  ] = useHttpHook();

  const Update = async e => {
    e.preventDefault();
    try {
      await makeRequest(
        `http://localhost:5000/api/v1/place/${id}`,
        "PATCH",
        JSON.stringify({
          title: States.inputs.title.value,
          description: States.inputs.description.value
        }),
        { "Content-Type": "application/json" }
      );
      historyObj.push(`/${Auth.loggedInUser}/places`);
    } catch (error) {}
  };
  useEffect(() => {
    const getPlace = async () => {
      const Data = await makeRequest(
        `http://localhost:5000/api/v1/place/${id}`
      );
      setLoadedPlace(Data.Place);
      SetDataHandler(
        {
          title: {
            value: Data.Place.title,
            isValid: true
          },
          description: {
            value: Data.Place.description,
            isValid: true
          }
        },
        true
      );
    };
    getPlace();
  }, [SetDataHandler, id, makeRequest]);
  if (loadedPlace) {
    return (
      <form className="place-form" onSubmit={Update}>
        <Input
          value={loadedPlace.title}
          isValid={true}
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
          value={loadedPlace.description}
          isValid={true}
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
          <button type="submit" disabled={!States.isValid}>
            Update
          </button>
        </div>
      </form>
    );
  }
  if (!isLoading && !isError) {
    return <LoadingSpinner asOverlay />;
  }
  if (!isLoading && !isError && !loadedPlace) {
    return (
      <h1
        style={{
          textAlign: "center",
          color: "red"
        }}
      >
        Couldn't Find Place :(
      </h1>
    );
  }
  if (isLoading) {
    return <LoadingSpinner asOverlay />;
  }
  if (!isLoading && isError) {
    return (
      <React.Fragment>
        <Background />
        <Model
          CloseModel={clearError}
          header={errorHeader}
          description={errorDescription}
        />
      </React.Fragment>
    );
  }
}

export default UpdatePlace;
