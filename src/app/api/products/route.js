import { products } from "@/data/products";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const result = products;
    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "failed", data: e });
  }
}

export async function POST(req, res) {
  try {
    const body = await req.json();
    const newProducts = body;
    console.log(newProducts);
    newProducts.forEach((product) => {
      const index = products.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        products[index] = product;
      } else {
        products.push(product);
      }
    });
    console.log(products)
    return NextResponse.json({ status: "success", data: products });
  } catch (e) {
    return NextResponse.json({ status: "failed", data: e });
  }
}
