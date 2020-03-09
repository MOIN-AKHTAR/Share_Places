import React, { useState } from "react";
import Model from "../../../Shares/Model/Model";
import Background from "../../../Shares/Bakground/Background";
import { useModelHooks } from "../../../Shares/Hooks/modelHooks";
import { useHttpHook } from "../../../Shares/Hooks/httpHooks";
import LoadingSpinner from "../../../Shares/Loading_Spinner/LoadingSpinner";
import { Link } from "react-router-dom";
import "./PlaceList.css";

export default function PlaceList(props) {
  const { Place } = props;
  const { places: Places } = Place;
  const [myplaces, setMyplaces] = useState(Places);
  const [
    isLoading,
    isError,
    errorHeader,
    errorDescription,
    makeRequest,
    clearError
  ] = useHttpHook();
  const DeletePlace = async Id => {
    try {
      await makeRequest("http://localhost:5000/api/v1/place/" + Id, "DELETE");
      setMyplaces(prevState => prevState.filter(Place => Place._id !== Id));
    } catch (error) {}
  };
  const [ShowModelState, ShowModel] = useModelHooks();
  if (myplaces.length === 0) {
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
          {myplaces.map(Place => (
            <ul key={Place._id}>
              {ShowModelState && (
                <React.Fragment>
                  <Background />
                  <Model CloseModel={ShowModel} />
                </React.Fragment>
              )}
              <li className="places_list">
                <div className="list_img__section">
                  <img src={Place.image} alt="No Preview" />
                </div>
                <div className="list_info__section">
                  <h1>{Place.title}</h1>
                  <h2>{Place.address}</h2>
                  <h3>{Place.description}</h3>
                </div>

                <div className="list_action__section">
                  <div>
                    <Link
                      to="#"
                      className="btn"
                      onClick={() => {
                        DeletePlace(Place._id);
                      }}
                    >
                      Delete
                    </Link>
                    <Link to={`/update/${Place._id}/places`} className="btn">
                      Update
                    </Link>
                    <Link to="/new/place" className="btn">
                      Create
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          ))}
        </React.Fragment>
      );
    }
  }
}
