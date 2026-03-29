import express from 'express'
import { isAuth } from "../middleware/isAuth.js";
import { createEditShop, getMyShops } from '../controllers/shop.controllers.js';
import { upload } from '../middleware/multer.js';

const shopRouter = express.Router()

shopRouter.post('/create-edit',isAuth,upload.single("image"), createEditShop)
shopRouter.get('/get-my-shop',isAuth, getMyShops)

export default shopRouter