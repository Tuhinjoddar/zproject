

import connectionSrt from "@/utils/db";
import { Product } from "@/utils/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {

    let data = []
    try {
        await mongoose.connect(connectionSrt);
        console.log("Connected to MongoDB Atlas with Mongoose");
        data = await Product.find()

    } catch (err) {
        console.error("Error connecting to MongoDB Atlas:", err);
        throw new Error("Database connection failed");
    }

    console.log(data);

    return NextResponse.json({ result: data, success: true })
}


export async function POST(req) {

    let result = []

    try {
        const payload = await req.json()
        await mongoose.connect(connectionSrt);
        console.log("Connected to MongoDB Atlas with Mongoose");
        let data = new Product(payload)

        result = await data.save()
    } catch (err) {
        console.error("Error connecting to MongoDB Atlas:", err);
        throw new Error("Database connection failed");
    }


    return NextResponse.json({ message: "New product created successfully", result: result, success: true })
}