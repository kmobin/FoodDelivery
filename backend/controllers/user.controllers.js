import { Cart } from "../models/cart.model.js"
import { User } from "../models/user.model.js"

export const getCurrentUser = async (req, res) => {
    try {
        console.log("user----", req.userId)
        const userId = req.userId
        if (!userId) return res.status(400).json({ message: "userId not found" })

        const user = await User.findById(userId)
        if (!user) return res.status(400).json({ message: "user not found" })

        return res.status(200).json(user)
    } catch (e) {
        return res.status(400).json({ message: `get current user error ${e}` })
    }
}

export const updateUserLocation = async (req, res) => {
    try {
        const { lat, long } = req.body
        const user = await User.findByIdAndUpdate(req.userId, {
            location: {
                type: "Point",
                coordinates: [long, lat]
            }
        }, { new: true })
        res.status(200).json({ message: "Location updated!" })
    } catch (e) {
        return res.status(400).json({ message: `updateUserLocation error ${e}` })
    }
}