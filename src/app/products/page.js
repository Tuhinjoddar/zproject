
import Link from "next/link";

export const getProducts = async () => {

    const response = await fetch("http://localhost:3000/api/products");
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data.result


};

export default async function Page() {

    const products = await getProducts(); // Fetch product list


    return (
        <div className="p-10">
            <h1 className="text-4xl font-bold mb-6">Product List</h1>
            {products && products.length > 0 ? (
                <table className="table-auto border-collapse border w-full">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Product ID</th>
                            <th className="border px-4 py-2">Product Name</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Company</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (

                            <tr key={item._id}>
                                <td className="border px-4 py-2">{item._id}</td>
                                <td className="border px-4 py-2">
                                    <Link className="underline text-blue-500" href={`products/${item._id}`}>
                                        {item.product}
                                    </Link>
                                </td>
                                <td className="border px-4 py-2">{item.price}</td>
                                <td className="border px-4 py-2">{item.company}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-red-500 text-lg">Data cannot be fetched. Please try again later.</p>
            )}
        </div>
    );
}
