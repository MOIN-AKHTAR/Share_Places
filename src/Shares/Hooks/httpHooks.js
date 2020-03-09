import { useState, useCallback } from "react";

export const useHttpHook = () => {
  // It will be used for loading when any AJAX call is maded
  const [isLoading, setIsLoading] = useState(false);
  // This isError state make the Error Model visible if Any Error Occur After Completing AJAX call-
  const [isError, setIsError] = useState(false);
  // This state is used to set header of error on model
  const [errorHeader, setErrorHeader] = useState();
  // This state is used to set description of error on model
  const [errorDescription, seterrorDescription] = useState();
  //   This Is Method For Making Request
  const makeRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      try {
        setIsLoading(true);
        const JSONData = await fetch(url, {
          method,
          body,
          headers
        });
        // Extracting Data....
        const Data = await JSONData.json();

        //  Checking whether result of AJAX call is +ive or not
        if (Data.Status === "Fail") {
          console.log(Data);
          throw new Error(Data.error.message || Data.Message);
        }
        // Since AJAX call has completed therefor making as false
        setIsLoading(false);
        return Data;
      } catch (error) {
        // Setting Model Header when error occur
        setErrorHeader("Error Occur");
        // Setting Model Description when error occur
        seterrorDescription(error.message);
        // Since AJAX call has completed therefor making as false
        setIsLoading(false);
        // Since Error Occur therefor making  setIsError as true
        setIsError(true);
        throw error;
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setIsError(false);
  }, []);
  return [
    isLoading,
    isError,
    errorHeader,
    errorDescription,
    makeRequest,
    clearError
  ];
};
