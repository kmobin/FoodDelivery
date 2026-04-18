import { Cart } from "../models/cart.model.js"
import Order from "../models/order.model.js"
import { Shop } from "../models/shop.model.js"

export const placeOrder = async (req, res) => {
    try {
        const { cartItems, paymentMethod, deliveryAddress, totalAmount } = req.body
        if (!cartItems || cartItems.length == 0) return res.status(404).json({ message: "cart is emtpy" })
        if (!deliveryAddress?.text || !deliveryAddress?.latitude || !deliveryAddress?.longitude)
            return res.status(404).json({ message: "send complete delivery address" })

        const groupItemsByShop = {}
        cartItems.forEach(async (element) => {
            const shopId = element.shop
            if (!groupItemsByShop[shopId]) groupItemsByShop[shopId] = []
            groupItemsByShop[shopId].push(element)
        });
        const shopOrders = await Promise.all(Object.keys(groupItemsByShop).map(async (shopId) => {
            const shop = await Shop.findById(shopId)
            if (!shop)
                return res.status(400).json({ message: "shop not found" })
            
            const items = groupItemsByShop[shopId]
            const subTotal = items?.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0)
            return {
                shop: shop._id,
                owner: shop.owner,
                subTotal,
                shopOrderItems: items.map(element => ({
                    item: element._id,
                    price: element.price,
                    quanityt: element.quantity,
                    name: element.name
                }))
            }
        }))
        const newOrder = await Order.create({
            user: req.userId,
            paymentMethod,
            deliveryAddress,
            totalAmount,
            shopOrders
        })
        const {userId} = req
        await Cart.findOneAndDelete(userId)

        return res.status(200).json(newOrder)

    } catch (e) {
        return res.status(500).json({ message: "placeOrder error: " + e })
    }
}