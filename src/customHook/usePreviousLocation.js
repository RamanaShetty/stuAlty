// usePreviousLocation.js
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const usePreviousLocation = () => {
  const location = useLocation();
  const prevLocationRef = useRef();

  useEffect(() => {
    prevLocationRef.current = location;
  }, [location]);

  return prevLocationRef.current;
};
