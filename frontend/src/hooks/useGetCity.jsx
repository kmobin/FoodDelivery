import React, { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentAddress, setCurrentCity, setCurrentState, setUserData } from "../redux/userSlice.js";

function useGetCity() {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.user)  


  useEffect(() => {
    console.log()
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const { data } = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${import.meta.env.VITE_GEO_API_KEY}`
      );

      dispatch(setCurrentCity(data.results[0].city));
      dispatch(setCurrentState(data.results[0].state));
      dispatch(setCurrentAddress(data.results[0].address_line2 || data.results[0].address_line1));

      console.log("city--", data.results[0].city);
    });
  }, [userData]);
}

export default useGetCity;