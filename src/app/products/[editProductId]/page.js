

import DeleteProduct from "@/app/components/deleteProduct";
import Link from "next/link";

async function getProduct(id) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, { cache: "no-cache" });
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        return data.result;
    } catch (err) {
        console.error("Error fetching product:", err);
        return null; // Fallback if product fetch fails
    }
}


export default async function Page({ params }) {

    const editProductId = await params.editProductId
    //console.log(editProductId);
    const product = await getProduct(editProductId)
    //console.log(product.id);


    if (!product) {
        return <p className="text-red-500 text-xl">Product not found or could not be loaded.</p>;
    }

    return (
        <div>
            <h1 className="text-4xl font-bold p-10">Product Details</h1>
            <div className="ml-10">
                <table className="table-auto border-collapse border w-[600px] ml-10 mt-10">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Product Name</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Company</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">{product.product}</td>
                            <td className="border px-4 py-2">{product.price}</td>
                            <td className="border px-4 py-2">{product.company}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div className="flex flex-row m-20 w-[600px] border-2 h-14 px-40 justify-between">
                <Link className="border-2 bg-slate-200 text-blue-500 text-2xl px-6 py-2" href={`${editProductId}/productUpdate`}>Edit</Link>
                <span className="text-red-500 text-2xl bg-slate-200  border-2 px-6 py-2"><DeleteProduct id={editProductId} /></span>
            </div>
        </div>
    );
}
