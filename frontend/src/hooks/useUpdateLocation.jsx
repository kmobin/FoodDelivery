import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useSelector } from 'react-redux'

function useUpdateLocation() {
    const { userData } = useSelector(state => state.user)

    useEffect(() => {
        if (!navigator.geolocation) {
            console.log("Geolocation not supported")
            return
        }

        const updateUserLocation = async (lat, long) => {
            try {
                const result = await axios.post(
                    `${serverUrl}/api/user/update-location`,
                    { lat, long },
                    { withCredentials: true }
                )
                console.log("result--", result)
            } catch (err) {
                console.log("API error", err)
            }
        }

        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                updateUserLocation(pos.coords.latitude, pos.coords.longitude)
            },
            (error) => {
                updateUserLocation("20.68486","77.01103")
                console.log("Location error:", error.code, error.message)
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        )

        return () => {
            navigator.geolocation.clearWatch(watchId)
        }

    }, []) 

}

export default useUpdateLocation