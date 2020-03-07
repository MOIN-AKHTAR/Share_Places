import React, { useCallback } from "react";
import Model from "../../../Shares/Model/Model";
import Background from "../../../Shares/Bakground/Background";
import { useModelHooks } from "../../../Shares/Hooks/modelHooks";
import { useHttpHook } from "../../../Shares/Hooks/httpHooks";
import LoadingSpinner from "../../../Shares/Loading_Spinner/LoadingSpinner";
import "./PlaceList.css";

export default function PlaceList(props) {
  const [
    isLoading,
    isError,
    errorHeader,
    errorDescription,
    makeRequest,
    clearError
  ] = useHttpHook();
  const DeletePlace = Id => {
    console.log(Id);
  };
  const EditPlace = Id => {
    console.log(Id);
  };

  const { Place } = props;
  const { places: Places } = Place;

  const [ShowModelState, ShowModel] = useModelHooks();
  const traverse = useCallback(() => {
    window.location.assign("/new/place");
  }, []);
  if (Places.length === 0) {
    return (
      <h1 style={{ textAlign: "center", color: "red" }}>NO PLACE FOUND :(</h1>
    );
  } else {
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
    } else {
      return (
        <React.Fragment key={Place._id}>
          {Places.map(Place => (
            <ul key={Place._id}>
              {ShowModelState && (
                <React.Fragment>
                  <Background />
                  <Model CloseModel={ShowModel} />
                </React.Fragment>
              )}
              <li id="places_list">
                <div id="list_img__section">
                  <img src={Place.image} alt="No Preview" />
                </div>
                <div id="list_info__section">
                  <h1>{Place.title}</h1>
                  <h2>{Place.address}</h2>
                  <h3>{Place.description}</h3>
                </div>
                <div id="list_action__section">
                  <button
                    onClick={() => {
                      DeletePlace(Place._id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      EditPlace(Place._id);
                    }}
                  >
                    Edit Place
                  </button>
                  <button onClick={traverse}>Create Place</button>
                </div>
              </li>
            </ul>
          ))}
        </React.Fragment>
      );
    }
  }
}
