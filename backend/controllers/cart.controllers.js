import { Cart } from "../models/cart.model.js"

export const getCartItems = async (req, res) => {
    try {
        const userId = req.userId
        if (!userId) return res.status(400).json({ message: "userId not found" })

        const Items = await Cart.findOne({ userId }).populate("items.itemId");

        console.log("items---",Items.items)
        const data=[]
        Items?.items?.forEach(item=>{
            const {itemId} = item
            data.push({
            id: itemId._id,
            name: itemId.name,
            price: itemId.price,
            image: itemId.image,
            shop: itemId.shop,
            quantity: item.quantity,
            foodType: itemId.foodType
            })
        })

        return res.status(200).json(data)
    } catch (e) {
        return res.status(400).json({ message: `get cart Item error ${e}` })
    }
}

export const saveCartItems = async (req, res) => {
    try {
        const userId = req.userId
        if (!userId) return res.status(400).json({ message: "userId not found" })

        let cart = await Cart.findOne({ userId });
        console.log("req.body---", req.body)

        if (!cart) {
            cart = await Cart.create({
                userId,
                items: [{
                    itemId: req.body.itemId,
                    quantity: req.body.quantity
                }]
            });
            console.log("cart====", cart)
        } else {
            let isExist = false
            cart.items?.forEach(item => {
                if (item.itemId == req.body.itemId) {
                    item.quantity = req.body.quantity
                    isExist = true
                }
            })
            if (!isExist) cart.items.push({
                itemId: req.body.itemId,
                quantity: req.body.quantity
            })
            await cart.save()
            console.log("cart---", cart)
        }
        return res.status(200).json(cart)
    } catch (e) {
        return res.status(400).json({ message: `get cart Item error ${e}` })
    }
}

export const deleteCartItem = async (req, res) => {
    try {
        const userId = req.userId

        if (!userId) return res.status(400).json({ message: "userId not found" })

        let cart = await Cart.findOne({ userId });

        const Items = cart.items.filter(item => item.itemId != req.params.itemId)
        cart.items = Items
        await cart.save()
        return res.status(200).json(cart)

    } catch (e) {
        return res.status(400).json({ message: `delete cart Item error ${e}` })
    }
}