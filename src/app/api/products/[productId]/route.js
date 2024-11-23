

import connectionSrt from "@/utils/db";
import { Product } from "@/utils/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {

    console.log(params);
    const { productId } = await params;
    console.log(productId);
    const filter = { _id: productId }
    console.log(filter);
    let result = []
    try {
        const payload = await req.json()
        console.log(payload);
        await mongoose.connect(connectionSrt);
        console.log("Connected to MongoDB Atlas with Mongoose");
        result = await Product.findOneAndUpdate(filter, payload)


    } catch (err) {
        console.error("Error connecting to MongoDB Atlas:", err);
        throw new Error("Database connection failed");
    }


    return NextResponse.json({ result, success: true }, { status: 200 });
}





export async function GET(req, { params }) {

    console.log(params);
    const { productId } = await params;
    console.log(productId);
    const filter = { _id: productId }
    console.log(filter);
    let result = []
    try {
        await mongoose.connect(connectionSrt);
        console.log("Connected to MongoDB Atlas with Mongoose");
        result = await Product.findById(filter)

        if (!result) {
            return NextResponse.json({ error: "Product not found", success: false }, { status: 404 });
        }

    } catch (err) {
        console.error("Error connecting to MongoDB Atlas:", err);
        throw new Error("Database connection failed");
    }
    return NextResponse.json({ result, success: true });
}




export async function DELETE(req, { params }) {

    const { productId } = await params;
    console.log(productId);
    const filter = { _id: productId }
    console.log(filter);

    try {
        await mongoose.connect(connectionSrt);
        console.log("Connected to MongoDB Atlas with Mongoose");
        const result = await Product.deleteOne(filter)
        console.log(result);

        // result --- database  present deletedCount
        if (result.deletedCount > 0) {
            return NextResponse.json({ message: "Product deleted successfully", success: true }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Product not found", success: false }, { status: 404 });
        }

    } catch (err) {
        console.error("Error connecting to MongoDB Atlas:", err);
        return NextResponse.json({ message: "Database connection failed", success: false }, { status: 500 });
    }
}
