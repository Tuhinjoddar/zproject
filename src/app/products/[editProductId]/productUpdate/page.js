

"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {
    const router = useRouter()

    const [isClient, setIsClient] = useState(false);
    const [product, setProduct] = useState("");
    const [price, setPrice] = useState("");
    const [company, setCompany] = useState("");


    // error solved code.
    useEffect(() => {
        setIsClient(true);
    }, [])



    // Fetch user details on component mount
    useEffect(() => {
        async function fetchData() {
            //console.log(params);
            const editProductId = await params.editProductId;
            // console.log(editProductId);
            try {
                const res = await fetch(`http://localhost:3000/api/products/${editProductId}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch user details. Status: ${res.status}`);
                }
                const data = await res.json();
                // Pre-fill form fields with fetched data
                console.log(data.success);
                console.log(data.result?.product);
                if (data.success) {
                    setProduct(data.result?.product || "");
                    setPrice(data.result?.price || "");
                    setCompany(data.result?.company || "");
                }

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchData();
    }, [params]); // This will rerun when `params` changes





    const updateProduct = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        // console.log(params);
        const editProductId = await params.editProductId
        // Validate required fields
        if (!product || !price || !company) {
            alert("All fields are required. Please fill in the missing values.");
            return;
        }
        try {
            const res = await fetch(`http://localhost:3000/api/products/${editProductId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ product, price, company }), // Include updated data
            })
            if (!res.ok) {
                throw new Error(`Failed to update user. Status: ${res.status}`);
            }

            const result = await res.json()
            if (result.success) {
                alert("Product update successfully!");
                router.push("/products")

            }
        } catch (error) {
            console.error("Error updating user:", error);
            alert("An error occurred while updating the product."); // Notify user of error
        }
    };



    // Only render the component once it's confirmed to be client-side
    if (!isClient) return null;


    return (
        <div className="p-6">
            <h1 className=" shadow-md rounded-lg  max-w-[36rem] mx-auto text-4xl font-bold mb-6">Update product Details Informations</h1>
            <form
                onSubmit={updateProduct} // Handle form submission
                className="bg-white shadow-md rounded-lg p-8 max-w-lg mx-auto"
            >
                {/* Name Field */}
                <div className="mb-6">
                    <label htmlFor="product" className="block text-lg text-black font-medium mb-2">
                        Product Name:
                    </label>
                    <input
                        type="text"
                        id="product"
                        value={product}
                        name="product"
                        placeholder="Enter product name"
                        onChange={(e) => setProduct(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring text-black focus:ring-blue-300"
                    />
                </div>
                {/* Age Field */}
                <div className="mb-6">
                    <label htmlFor="price" className="block text-lg text-black font-medium mb-2">
                        Product Price:
                    </label>
                    <input
                        type="text"
                        id="price"
                        value={price}
                        name="price"
                        placeholder="Enter product price"
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none text-black focus:ring focus:ring-blue-300"
                    />
                </div>
                {/* Email Field */}
                <div className="mb-6">
                    <label htmlFor="company" className="block text-lg text-black font-medium mb-2">
                        Company:
                    </label>
                    <input
                        type="text"
                        id="company"
                        value={company}
                        name="company"
                        placeholder="Enter company name"
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none text-black focus:ring focus:ring-blue-300"
                    />
                </div>
                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Update Product
                </button>
            </form>
        </div>
    )
}
