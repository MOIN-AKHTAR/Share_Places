import React, { useEffect, useState } from "react";
import Input from "../../Shares/Input/Input";
import { VALIDATOR_REQUIRE } from "../../Shares/Utils/Validators.js";
import { useForm } from "../../Shares/Hooks/inputHooks";
import { useParams } from "react-router-dom";
import "./NewPlace.css";

function UpdatePlace() {
  const id = useParams().uid;
  const DUMMY_PLACES = [
    {
      id: "p1",
      title: "Empire State Building",
      description: "One of the most famous sky scrapers in the world!",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
      address: "20 W 34th St, New York, NY 10001",
      location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creator: "u1"
    },
    {
      id: "p2",
      title: "Emp. State Building",
      description: "One of the most famous sky scrapers in the world!",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
      address: "20 W 34th St, New York, NY 10001",
      location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creator: "u2"
    }
  ];
  const [isLoading, setLoading] = useState(true);
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
  const IdentifiedPlace = DUMMY_PLACES.find(Place => Place.id === id);
  useEffect(() => {
    if (IdentifiedPlace) {
      SetDataHandler(
        {
          title: {
            value: IdentifiedPlace.title,
            isValid: true
          },
          description: {
            value: IdentifiedPlace.description,
            isValid: true
          }
        },
        true
      );
    }
    setLoading(false);
  }, [setLoading]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (!IdentifiedPlace) {
    return <h1>CAN NOT FIND :(</h1>;
  }
  return (
    <form className="place-form ">
      <Input
        value={IdentifiedPlace.title}
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
        value={IdentifiedPlace.description}
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
      <div className="form-control">
        <button type="submit" disabled={!States.isValid}>
          Update
        </button>
      </div>
    </form>
  );
}

export default UpdatePlace;
