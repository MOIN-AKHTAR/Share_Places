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
  // Getting context so that we can extract Loggedin user for authentication purpose-
  const Auth = useContext(Appcontext);
  // Extracting id from url-
  const id = useParams().uid;
  // making history object to get all the methods and properties related to history-
  const historyObj = useHistory();
  const [loadedPlace, setLoadedPlace] = useState();
  // here useForm is a custom hook which will set your initial data and provude you states-
  // Inputhandler will let you to check whether the whole form data is valid or not-
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
  // useHttpHook is our custom hook which will give you are we loading while making request
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
  // It will update the place-
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
      // Take you to users places-
      historyObj.push(`/${Auth.loggedInUser}/places`);
    } catch (error) {}
  };
  useEffect(() => {
    // Since we can not make useEffect inner function as async that's why we created new function
    // and call inside which is not async because making useEffect function as async is not recomended-
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
  // If places loaded after request successfull
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
  {
    /* If we are loading we will show spinner */
  }
  if (!isLoading && !isError) {
    return <LoadingSpinner asOverlay />;
  }
  // If we completed request and there is no error and after request response we still not able to set
  // loadplace it's mean that place doesn't occur any more-
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
  // If we are loading while making request we will show spinner-
  if (isLoading) {
    return <LoadingSpinner asOverlay />;
  }
  // After request if we get error then we will show background with error model-
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
