import { useState, useCallback } from "react";

export const useModelHooks = () => {
  const [ShowModelState, setShowModelState] = useState(false);
  const ShowModel = useCallback(() => {
    setShowModelState(prev => !prev);
  }, []);
  return [ShowModelState, ShowModel];
};
