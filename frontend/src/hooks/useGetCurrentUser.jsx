import React, { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import useGetCity from "./useGetCity.jsx";

function useGetCurrentUser() {
    const dispatch = useDispatch()
    useGetCity()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        console.log("result--", result);
        dispatch(setUserData(result.data))
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchUser();
    
  }, []);
}

export default useGetCurrentUser;
