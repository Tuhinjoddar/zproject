

import { NextResponse } from 'next/server';

import fs from 'fs/promises'
import path from 'path';

export async function POST(req) {

    try {
        const data = await req.formData();
        const file = data.get('Image');

        if (!file) return NextResponse.json({ error: 'No file uploaded', success: false }, { status: 400 });

        // const byteData = await file.arrayBuffer();
        // console.log("hello", byteData);
        // const buffer = Buffer.from(byteData);
        // console.log("hii", buffer);
        // const path = `./public/${file.name}`
        // console.log("thu", path);
        // await writeFile(path, buffer);


        const uploadDir = path.join(process.cwd(), 'public');
        await fs.mkdir(uploadDir, { recursive: true }); // Ensure directory exists

        const filePath = path.join(uploadDir, file.name);
        await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));



        return NextResponse.json({ success: true, message: 'File uploaded successfully', filepath: file.name });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
    }


}
