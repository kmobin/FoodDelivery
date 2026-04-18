import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentAddress, setCurrentCity, setCurrentState } from "../redux/userSlice.js";
import { setAddress, setLocation } from "../redux/mapSlice.js";

function useGetCity() {
  const dispatch = useDispatch();
  const {userData} = useSelector(state=>state.user)

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(async (position) =>{
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        dispatch(setLocation({ lat: latitude, long: longitude }));
         dispatch(setCurrentCity(data.results[0].city));
        dispatch(setCurrentState(data.results[0].state));
        dispatch(
          setCurrentAddress(
            data.results[0].address_line2 || data.results[0].address_line1
          )
        );
        dispatch(setAddress(data.results[0].address_line2));
    })
  },[userData])

  // useEffect(() => {
  //   const getLocation = () => {
  //     return new Promise((resolve, reject) => {
  //       navigator.geolocation.getCurrentPosition(resolve, reject, {
  //         timeout: 10000,
  //         maximumAge: 60000,
  //       });
  //     });
  //   };

  //   const fetchLocation = async () => {
  //     try {
  //       // ✅ Try GPS first
  //       const position = await getLocation();
  //       const latitude = position.coords.latitude;
  //       const longitude = position.coords.longitude;

  //       dispatch(setLocation({ lat: latitude, long: longitude }));

  //       const { data } = await axios.get(
  //         `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${import.meta.env.VITE_GEO_API_KEY}`
  //       );

  //       dispatch(setCurrentCity(data.results[0].city));
  //       dispatch(setCurrentState(data.results[0].state));
  //       dispatch(
  //         setCurrentAddress(
  //           data.results[0].address_line2 || data.results[0].address_line1
  //         )
  //       );
  //       dispatch(setAddress(data.results[0].address_line2));
  //     } catch (error) {
  //       console.log("GPS failed, using IP fallback");

  //       try {
  //         // ✅ IP-based fallback WITH lat/long
  //         const { data } = await axios.get("https://ipwho.is/");

  //         const latitude = data.latitude;
  //         const longitude = data.longitude;

  //         dispatch(setLocation({ lat: latitude, long: longitude }));
  //         console.log("latitude,longitude,data--",latitude,longitude,data)
  //         dispatch(setCurrentCity(data.city));
  //         dispatch(setCurrentState(data.region));
          
  //       } catch (err) {
  //         console.log("Fallback failed", err);
  //       }
  //     }
  //   };

  //   fetchLocation();
  // }, []);
}

export default useGetCity;