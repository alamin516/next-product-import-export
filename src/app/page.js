import ProductsPage from "@/components/Products";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 p-5">
      <ProductsPage/>
    </main>
  );
}
