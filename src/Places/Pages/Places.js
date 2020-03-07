import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceItem from "../Components/PlaceItem/PlaceItem";
import Background from "../../Shares/Bakground/Background";
import Model from "../../Shares/Model/Model";
import { useHttpHook } from "../../Shares/Hooks/httpHooks";
import LoadingSpinner from "../../Shares/Loading_Spinner/LoadingSpinner";

export default function Places() {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const [
    isLoading,
    isError,
    errorHeader,
    errorDescription,
    makeRequest,
    clearError
  ] = useHttpHook();
  // Extracting uid part of URL-
  const UserId = useParams().uid;
  try {
    useEffect(() => {
      const MakePlaceGetRequest = async () => {
        const Data = await makeRequest(
          "http://localhost:5000/api/v1/place/user/" + UserId
        );
        setLoadedPlaces(Data);
      };
      MakePlaceGetRequest();
    }, [UserId, makeRequest]);
  } catch (error) {}
  if (isLoading) {
    return <LoadingSpinner asOverlay />;
  }
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
  if (loadedPlaces) {
    return <PlaceItem places={loadedPlaces} />;
  } else {
    return <LoadingSpinner asOverlay />;
  }
}
