import React, { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
import PlaceItem from "../Components/PlaceItem/PlaceItem";
import Background from "../../Shares/Bakground/Background";
import Model from "../../Shares/Model/Model";
import { useHttpHook } from "../../Shares/Hooks/httpHooks";
import LoadingSpinner from "../../Shares/Loading_Spinner/LoadingSpinner";
import { Appcontext } from "../../Shares/Context/AppContext";

export default function Places() {
  const Auth = useContext(Appcontext);
  // useHttpHook is our custom hook which will give you are we loading while making request
  // isError will show do we have any error during request-
  // errorheader and description will give you whole information on a model-
  // Makerequest is a function which help you to make request-
  // clearError is a function which will set isError as false inorder to close the error model
  const [loadedPlaces, setLoadedPlaces] = useState();
  const [
    isLoading,
    isError,
    errorHeader,
    errorDescription,
    makeRequest,
    clearError
  ] = useHttpHook();
  // // Extracting uid part of URL-
  // const UserId = useParams().uid;
  try {
    useEffect(() => {
      // Since we can not make useEffect inner function as async that's why we created new function
      // and call inside which is not async because making useEffect function as async is not recomended-
      const MakePlaceGetRequest = async () => {
        const Data = await makeRequest(
          `http://localhost:5000/api/v1/place/user/${Auth.loggedInUser}`
        );
        setLoadedPlaces(Data);
      };
      MakePlaceGetRequest();
    }, [Auth.loggedInUser, makeRequest]);
  } catch (error) {}
  if (isLoading) {
    {
      /* If we are loading we will show spinner */
    }
    return <LoadingSpinner asOverlay />;
  }
  if (isError && !isLoading) {
    {
      /* If any error occur and request send response with error we will show model with black backgound */
    }
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
  // If we have set loadPlaces after making request we will pass to PlaceItem Component there all places will be rendered-
  if (loadedPlaces) {
    return <PlaceItem places={loadedPlaces} />;
  } else {
    {
      /* If we are loading we will show spinner */
    }
    return <LoadingSpinner asOverlay />;
  }
}
