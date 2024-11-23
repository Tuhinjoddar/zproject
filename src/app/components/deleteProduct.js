

"use client"

import { useRouter } from "next/navigation";

export default function DeleteProduct(props) {
    const productId = props.id

    //router.back() navigates to the previous page in the browser's history after successful deletion.
    const router = useRouter();
    console.log(router);


    const deleteProduct = async () => {
        const confirmDelete = confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;
        try {
            const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error("Failed to fetch delete product");
            }
            const result = await response.json();
            if (result.success) {
                alert(result.message)
                router.push("/products")

            } else {
                alert("Failed to delete the product."); // Handle server-side issues
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("An error occurred while deleting the product."); // Notify user of error
        }
    }

    return (
        <button onClick={deleteProduct}  >Delete</button>
    )
}

