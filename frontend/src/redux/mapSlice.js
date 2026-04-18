import { createSlice } from "@reduxjs/toolkit"

const mapSlice = createSlice({
  name: "map",
  initialState: {
    location: {
      lat: 20.7366555,
      long: 77.0087498
    },
    address: "Akot fail Akola"
  },
  reducers: {
    setLocation: (state, action) => {
      const { lat, long } = action.payload
      state.location.lat = lat
      state.location.long = long
    },
    setAddress: (state, action) => {
      state.address = action.payload
    }
  }
})

export const { setLocation,
  setAddress
} = mapSlice.actions
export default mapSlice.reducer