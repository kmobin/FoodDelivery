import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { deleteCartItem, getCartItems, saveCartItems } from "../controllers/cart.controllers.js";

const cartRouter = express.Router();

cartRouter.get("/get-cart-items",isAuth ,getCartItems);
cartRouter.post("/add-cart-items",isAuth ,saveCartItems);
cartRouter.delete("/remove-cart-items/:itemId",isAuth ,deleteCartItem);

export default cartRouter;
