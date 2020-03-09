import React, { useState, useEffect } from "react";
import UserItem from "../Components/UserItem";
import Background from "../../Shares/Bakground/Background";
import Model from "../../Shares/Model/Model";
import { useHttpHook } from "../../Shares/Hooks/httpHooks";
import LoadingSpinner from "../../Shares/Loading_Spinner/LoadingSpinner";
export default function User() {
  const [loadedUsers, setLoadedUsers] = useState();
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
  try {
    useEffect(() => {
      const MakeUserGetRequest = async () => {
        const Data = await makeRequest("http://localhost:5000/api/v1/user/");
        setLoadedUsers(Data);
      };
      MakeUserGetRequest();
    }, [makeRequest]);
  } catch (error) {}
  if (isLoading) {
    // If we are loading show spinner
    return <LoadingSpinner asOverlay />;
  }
  // If any error the show error model with background
  if (isError && !isLoading) {
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
  if (loadedUsers) {
    // If we set loadedusers after making request pass to UserItem Component-
    return <UserItem items={loadedUsers} />;
  } else {
    // Show spinner
    return <LoadingSpinner asOverlay />;
  }
}
