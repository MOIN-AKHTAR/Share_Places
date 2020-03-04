import { useCallback, useReducer } from "react";

const formReducer = (State = {}, Action) => {
  switch (Action.type) {
    case "INPUT_CHANGE": {
      let formIsValid = true;
      for (const inputId in State.inputs) {
        if (inputId === Action.inputId) {
          // For current Inputs
          formIsValid = formIsValid && Action.isValid;
        } else {
          // For Other Inputs
          formIsValid = formIsValid && State.inputs[inputId].isValid;
        }
      }
      return {
        ...State,
        inputs: {
          ...State.inputs,
          [Action.inputId]: {
            value: Action.value,
            isValid: Action.isValid
          }
        },
        isValid: formIsValid
      };
    }
    case "SET_DATA": {
      return {
        inputs: Action.inputs,
        isValid: Action.isValid
      };
    }
    default: {
      return State;
    }
  }
};

export const useForm = (initialState, formValidation) => {
  const [States, dispatch] = useReducer(formReducer, {
    inputs: initialState,
    isValid: formValidation
  });
  const InputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      inputId: id,
      value,
      isValid
    });
  }, []);

  const SetDataHandler = useCallback((inputs, isValid) => {
    dispatch({
      type: "SET_DATA",
      inputs,
      isValid
    });
  }, []);
  return [States, InputHandler, SetDataHandler];
};
