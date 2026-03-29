import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

export const uploadOnCloudinary = async (file) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    const result = await cloudinary.uploader.upload(file);
    await fs.unlink(file)
    return result.secure_url
  } catch (e) {
    console.log(e);
  }
};
