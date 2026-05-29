import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Buffer } from "buffer";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "No image file uploaded." },
        { status: 400 }
      );
    }

    if (!file.type || !file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed." },
        { status: 400 }
      );
    }

    const allowedTypes = {
      "image/png": ".png",
      "image/jpeg": ".jpg",
      "image/jpg": ".jpg",
      "image/webp": ".webp",
    };

    const extension = allowedTypes[file.type];

    if (!extension) {
      return NextResponse.json(
        { error: "Only PNG, JPG, JPEG, and WEBP images are allowed." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const originalName = file.name || "product";
    const cleanName = path
      .basename(originalName, path.extname(originalName))
      .replace(/[^a-z0-9-_]/gi, "-")
      .toLowerCase();

    const fileName = `${cleanName || "product"}-${Date.now()}${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const uploadPath = path.join(uploadDir, fileName);

    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(uploadPath, buffer);

    return NextResponse.json({
      url: `/uploads/${fileName}`,
    });
  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      { error: "Unable to upload image." },
      { status: 500 }
    );
  }
}