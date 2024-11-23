
'use client';

import Link from "next/link";
import { useState } from "react";


export default function Home() {

  const [file, setFile] = useState()


  const imageUpload = async (e) => {
    e.preventDefault();
    const data = new FormData()
    data.set("Image", file)
    const response = await fetch("api/uploadImages", {
      method: "POST",
      body: data,
    })

    const result = await response.json();
    console.log(result);

    if (result.success) {
      alert(result.message)
      alert(result.filepath)
    }

  }


  return (
    <main>
      <div className="flex flex-col mx-20 mt-7">
        <h1 className="text-4xl"> Home page </h1>
        <Link className="styleLink" href="/addProduct">Add product</Link>
        <Link className="styleLink" href="/products">Product List</Link>
      </div>

      <div className="flex flex-col mx-20 mt-7">
        <h1 className="text-4xl my-7">Upload Image</h1>
        <form onSubmit={imageUpload}>
          <input
            type="file"
            name="fileInput"
            onChange={(e) => setFile(e.target.files?.[0])}
          />
          <button type="submit" className="border-2 bg-green-400 text-red-600 p-2">Upload Image</button>
        </form>

      </div>
    </main>
  );
}


