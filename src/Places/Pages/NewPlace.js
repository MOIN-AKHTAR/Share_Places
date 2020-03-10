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
import UploadImage from "../../Shares/UploadImage/UploadImage";
import "./NewPlace.css";

export default function NewPlace() {
  // It is a Context which will bes used to check the loggedInuser Status And His/Her Id-
  const Auth = useContext(Appcontext);
  // useHistory Hook is used to give you history related method and properties-
  const historyObj = useHistory();
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
  // here useForm is a custom hook which will set your initial data and provude you states-
  // Inputhandler will let you to check whether the whole form data is valid or not-
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
      },
      image: {
        value: "",
        isValid: false
      }
    },
    false
  );
  // It will add the place-
  const AddPlace = useCallback(
    async event => {
      event.preventDefault();
      try {
        const formData = new FormData();
        formData.append("title", states.inputs.title.value);
        formData.append("description", states.inputs.description.value);
        formData.append("address", states.inputs.address.value);
        formData.append("creator", Auth.loggedInUser);
        formData.append("image", states.inputs.image.value);
        await makeRequest(
          "http://localhost:5000/api/v1/place/",
          "POST",
          formData
        );
        // Taking user to his/her places
        historyObj.push(`/${Auth.loggedInUser}/places`);
      } catch (error) {}
    },
    // Dependencies
    [makeRequest, historyObj, states, Auth.loggedInUser]
  );

  return (
    <React.Fragment>
      {/* If we are loading we will show spinner */}
      {isLoading && <LoadingSpinner asOverlay />}
      {/* If any error occur and request send response with error we will show model with black backgound */}
      {isError &&
        !isLoading(
          <React.Fragment>
            <Background />
            <Model
              CloseModel={clearError}
              header={errorHeader}
              description={errorDescription}
            />
          </React.Fragment>
        )}
      {/* Otherwise form will be shown */}
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
        <UploadImage id={"image"} onInput={InputHandler} />
        <div className="form-control buttons">
          {/* Submit button will be able if whole form data is valid otherwise it i'll be disabled- */}
          <button type="submit" disabled={!states.isValid}>
            Submit
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}
