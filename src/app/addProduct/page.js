
"use client"

import { useEffect, useState } from "react";


export default function Page() {

    const [isClient, setIsClient] = useState(false);
    const [product, setProduct] = useState("");
    const [price, setPrice] = useState("");
    const [company, setCompany] = useState("");


    useEffect(() => {
        setIsClient(true);
    }, []);


    const addProduct = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        try {
            const response = await fetch("http://localhost:3000/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ product, price, company }),
            });
            const data = await response.json();
            console.log(data);
            if (data.success) {
                alert(data.message || "New product created success!");
                // null: Placeholder for a replacer function (not used here). It means no filtering is applied.
                //The number of spaces for indentation, making the JSON output more readable.
                alert(JSON.stringify(data.result, null, 2));
                setProduct("");
                setPrice("");
                setCompany("");
            } else {
                alert(data.message || "Error adding product. Please check the data and try again.");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            alert("An unexpected error occurred. Please try again later.");
        }
    };








    // Only render the component once it's confirmed to be client-side
    if (!isClient) return null;

    return (
        <main className="p-10 min-h-screen ">
            <h1 className="text-4xl font-bold text-center mb-8">Add Product</h1>
            <form
                onSubmit={addProduct} // Handle form submission
                className="bg-white shadow-md rounded-lg p-8 max-w-lg mx-auto"
            >
                {/* Name Field */}
                <div className="mb-6">
                    <label htmlFor="product" className="block text-lg text-black font-medium mb-2">
                        ProductName:
                    </label>
                    <input
                        type="text"
                        id="product"
                        value={product}
                        name="product"
                        placeholder="Enter product name"
                        required
                        onChange={(e) => setProduct(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring text-black focus:ring-blue-300"
                    />
                </div>
                {/* Age Field */}
                <div className="mb-6">
                    <label htmlFor="price" className="block text-lg text-black font-medium mb-2">
                        ProductPrice:
                    </label>
                    <input
                        type="text"
                        id="price"
                        value={price}
                        name="price"
                        placeholder="Enter product price"
                        required
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none text-black focus:ring focus:ring-blue-300"
                    />
                </div>
                {/* Email Field */}
                <div className="mb-6">
                    <label htmlFor="company" className="block text-lg text-black font-medium mb-2">
                        CompanyName:
                    </label>
                    <input
                        type="text"
                        id="company"
                        value={company}
                        name="company"
                        placeholder="Enter company name"
                        required
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none text-black focus:ring focus:ring-blue-300"
                    />
                </div>
                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Add Product
                </button>
            </form>
        </main>
    );
}
