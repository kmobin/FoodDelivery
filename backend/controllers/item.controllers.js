import { Item } from "../models/item.model.js";
import { Shop } from "../models/shop.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addItem = async (req, res) => {
  try {
    const { name, category, foodType, price } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    const shop = await Shop.findOne({ owner: req.userId }).populate("items");
    const item = await Item.create({
      name,
      category,
      foodType,
      price,
      image,
      shop: shop._id,
    });
    shop.items.push(item._id)
    await shop.save()
    await shop.populate("items owner")
    return res.status(200).json(shop);
  } catch (e) {
    return res.status(500).json({ message: `add item error ${e}` });
  }
};

export const editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { name, category, foodType, price } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    const item = await Item.findByIdAndUpdate(
      itemId,
      {
        name,
        category,
        foodType,
        price,
        image,
      },
      { new: true }
    );

    if (!item) return res.status(400).json({ message: "Item not found" });
    const shop = await Shop.findOne({ owner: req.userId }).populate("items");
    return res.status(200).json(shop);
  } catch (e) {
    return res.status(500).json({ message: `edit item error ${e}` });
  }
};

export const getItemById = async (req, res) => {
  try {
    const itemId = req.params.itemId
    console.log("itemId----",itemId,req.params.itemId)
    const item = await Item.findById(itemId)
    
    if (!item) return res.status(400).json({ message: "Item not found" });
    return res.status(200).json(item);
  } catch (e) {
    return res.status(500).json({ message: `get item error ${e}` });
  }
}

export const deleteItem = async(req, res) => {
  try{
    const itemId =  req.params.itemId
    const item = await Item.findByIdAndDelete(itemId)
    if (!item) return res.status(400).json({ message: "Item not found" });
    const shop = await Shop.findOne({owner: req.userId})
    shop.items = shop.items.filter(i => i._id != itemId)
    await shop.save()
    await shop.populate("items")
    return res.status(200).json(shop);
  }catch(e){
    return res.status(500).json({ message: `delete item error ${e}` });
  }
}

export const getItemsByCity = async(req, res) => {
  try{
    const {city} = req.params
    if (!city) return res.status(400).json({ message: "city is required" });

    const shops = await Shop.find({
      city: {$regex: new RegExp(`^${city}$`,"i")}
    }).populate("items")

    if(!shops){
      return res.status(400).json({message: "shop not found"})
    }
    const shopIds = shops.map(shop => shop._id)
    const items = await Item.find({
      shop: {$in:shopIds}
    })

    return res.status(200).json(items)

  }catch(e){
    return res.status(500).json({ message: `get items by city error ${e}` });
  }

}
