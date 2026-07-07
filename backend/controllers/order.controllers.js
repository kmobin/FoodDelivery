import { Cart } from "../models/cart.model.js"
import { DeliveryAssignment } from "../models/deliveryAssignment.order.js"
import Order from "../models/order.model.js"
import { Shop } from "../models/shop.model.js"
import { User } from "../models/user.model.js"

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
            console.log("cartItems---",cartItems,items)
            const subTotal = items?.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0)
            return {
                shop: shop._id,
                owner: shop.owner,
                subTotal,
                shopOrderItems: items.map(element => ({
                    item: element.id,
                    price: element.price,
                    quantity: element.quantity,
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
        const { userId } = req
        await Cart.findOneAndDelete(userId)

        return res.status(200).json(newOrder)

    } catch (e) {
        return res.status(500).json({ message: "placeOrder error: " + e })
    }
}

export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req
        const user = await User.findById(userId)
        if (user.role == "user") {
            const orders = await Order.find({ user: userId })
                .sort({ createdAt: -1 })
                .populate("shopOrders.shop", "name")
                .populate("shopOrders.owner", "name emai mobile")
                .populate("shopOrders.shopOrderItems.item", "name image price")
            return res.status(200).json(orders)
        } else if (user.role == "owner") {

            const orders = await Order.find({ "shopOrders.owner": userId })
                .sort({ createdAt: -1 })
                .populate("shopOrders.shop", "name")
                .populate("user")
                .populate("shopOrders.shopOrderItems.item", "name image price")
            console.log("orders----",orders)
             const filteredOrders = orders.map(order=>({
                _id:order._id,
                paymentMethod: order.paymentMethod,
                user:order.user,
                shopOrders: order?.shopOrders.find(o=> o.owner == userId),
                createdAt: order.createdAt,
                deliveryAddress: order.deliveryAddress,
             }))   
            return res.status(200).json(filteredOrders)
        }

    } catch (e) {
        return res.status(500).json({ message: "getUserOrders error: " + e })
    }
}

export const updateOrderStatus = async(req, res)=>{
    try{
        const {orderId, shopId} = req.params
        const {status} = req.body
        const order = await Order.findById(orderId)
        const shopOrder = order.shopOrders.find(o=> o.shop == shopId)
        if(!shopOrder)
            res.status(400).json({ message: "shop order not found "})
        shopOrder.status = status
        let deliveryBoysPayload = []
        if(!shopOrder.assignment || status == "out for delivery"){
            const {latitude, longitude} = order.deliveryAddress
            const nearByDeliveryBoys = await User.find({
                role: "deliveryPartner",
                location:{
                    $near :{
                        $geometry:{type:"Point",coordinates:[Number(longitude),Number(latitude)]},
                        $maxDistance: 10000
                    }
                }
            })
            const nearByIds = nearByDeliveryBoys.map(b=> b._id)
            const busyIds = await DeliveryAssignment.find({
                assignedTo: {$in:nearByIds},
                status:{$nin:["brodcasted","completed"]}
            }).distinct("assignedTo")
            console.log("nearByIds,busyIds---",nearByIds,busyIds)
            const busyIdsSet = new Set(busyIds.map(id=> String(id)))
            const availableBoys = nearByDeliveryBoys.filter(b=> busyIdsSet.has(String(b._id)))
            const candidates = availableBoys.map(b=> b._id)
            if(candidates.length == 0){
                await order.save()
                return res.json({message: "order status updated but there is no available delivery boys"})
            }
                
            const deliveryAssignment = await DeliveryAssignment.create({
                order: order._id,
                shop: shopOrder.shop,
                shopOrderId: shopOrder._id,
                brodCastedTo: candidates,
                status: "brodcasted"
            })
            shopOrder.assignedDeliveryBoy = deliveryAssignment.assignedTo
            shopOrder.assignment = deliveryAssignment._id
            deliveryBoysPayload = availableBoys.map(b=>({
                id: b._id,
                fullname: b.fullname,
                longitude: b.location.coordinates?.[0],
                latitude:b.location.coordinates?.[1],
                mobile:b.mobile
            }))
        }

        await order.save()
        console.log("order-----",order,order.shopOrders)
        await order.populate("shopOrders.shopOrderItems.item","name image price")
        await order.populate("shopOrders.assignedDeliverBoy","fullname email mobile")

        const updatedShopOrders = order.shopOrders.find(o=> o.shop == shopId)

        return res.status(200).json({
            shopOrder: updatedShopOrders,
            assignedDeliveryBoy: updatedShopOrders.assignedDeliveryBoy,
            availableBoys: deliveryBoysPayload,
            assignment: updatedShopOrders.assignment._id
        })
    }catch(e){
        return res.status(500).json({ message: "updateOrderStatus error: " + e })
    }
}
