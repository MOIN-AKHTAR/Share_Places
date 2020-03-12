import React, { useState, useContext } from "react";
import Model from "../../../Shares/Model/Model";
import Background from "../../../Shares/Bakground/Background";
import { useModelHooks } from "../../../Shares/Hooks/modelHooks";
import { useHttpHook } from "../../../Shares/Hooks/httpHooks";
import LoadingSpinner from "../../../Shares/Loading_Spinner/LoadingSpinner";
import { Appcontext } from "../../../Shares/Context/AppContext";
import { Link } from "react-router-dom";
import "./PlaceList.css";

export default function PlaceList(props) {
  const Auth = useContext(Appcontext);
  // Destructuring
  const { Place } = props;
  // Destructuring
  const { places: Places } = Place;
  const [myplaces, setMyplaces] = useState(Places);
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
  const DeletePlace = async Id => {
    try {
      await makeRequest(
        "http://localhost:5000/api/v1/place/" + Id,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + Auth.token
        }
      );
      setMyplaces(prevState => prevState.filter(Place => Place._id !== Id));
    } catch (error) {}
  };
  const [ShowModelState, ShowModel] = useModelHooks();
  // If no place-
  if (myplaces.length === 0) {
    return (
      <h1 style={{ textAlign: "center", color: "red" }}>NO PLACE FOUND :(</h1>
    );
  } else {
    {
      /* If we are loading we will show spinner */
    }
    if (isLoading) {
      return <LoadingSpinner asOverlay />;
    }
    {
      /* If any error occur and request send response with error we will show model with black backgound */
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
        // If everything Ok-
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
                  <img
                    src={`http://localhost:5000/${Place.image}`}
                    alt="No Preview"
                  />
                </div>

                <div className="list_info__section">
                  <h1>{Place.title}</h1>
                  <h2>
                    {Place.address.length <= 15
                      ? Place.address
                      : Place.address.slice(0, 14) + "..."}
                  </h2>
                  <h3>
                    {Place.description.length <= 15
                      ? Place.description
                      : Place.description.slice(0, 14) + "..."}
                  </h3>
                </div>

                <div className="list_action__section">
                  <div>
                    <Link
                      to="#"
                      className="btn"
                      onClick={() => {
                        DeletePlace(Place._id, Place.image);
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
