

import mongoose from "mongoose";


const productModel = new mongoose.Schema({

    product: String,
    price: String,
    company: String,

})

// Check if the model is already created, otherwise create it
// products - collection name
export const Product = mongoose.models.products || mongoose.model("products", productModel)