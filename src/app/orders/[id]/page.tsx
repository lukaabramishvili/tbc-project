import { createClient } from "../../../utils/supabase/server";
import Image from "next/image";

interface Params {
  params: {
    id: string;
  };
}

export default async function OrderDetailsPage({ params }: Params) {
  const supabase = await createClient();
  const id = params.id;

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (orderError) {
    console.error(orderError);
    return (
      <section className="max-w-[136rem] mx-auto p-8 flex flex-col justify-center items-center gap-12">
        <h1 className="text-3xl text-red-500">Error loading order details</h1>
        <p className="text-gray-500">Please try again later.</p>
      </section>
    );
  }

  const { data: product, error: productError } = await supabase
    .from("products")
    .select("*")
    .eq("id", order.product_id)
    .single();

  if (productError) {
    console.error(productError);
    return (
      <section className="max-w-[136rem] mx-auto p-8 flex flex-col justify-center items-center gap-12">
        <h1 className="text-3xl text-red-500">Error loading product details</h1>
        <p className="text-gray-500">Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="max-w-[136rem] mx-auto p-8 py-24 flex flex-col items-center gap-12 dark:bg-[#2C2758]">
      <h1 className="text-4xl font-extrabold dark:text-white dark:bg-[#2C2758] text-gray-900">Order Details</h1>
      <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 dark:bg-[#2C2758]">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
            Order Information
          </h2>
        </div>
        <div className="p-6 space-y-4 bg-[#7F73EB] dark:bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-blue-500">
          <div className="flex justify-between">
            <span className="font-medium text-white">Order ID:</span>
            <span className="text-white">{order.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-white">Price:</span>
            <span className="text-white">
              ${new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(product.price / 100)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-white">Order Date:</span>
            <span className="text-white">
              {new Date(order.created_at).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="bg-gray-100 px-6 py-4 border-t border-gray-200 dark:bg-[#2C2758] ">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
            Product Information
          </h2>
        </div>
        <div className="p-6 space-y-4 bg-[#7F73EB] dark:bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-blue-500">
          <div className="flex flex-col items-center md:flex-row md:items-start md:gap-6">
            <Image
              src={product.img_url}
              alt={product.title}
              width={150}
              height={150}
              className="rounded-lg shadow-sm border border-gray-300"
            />
            <div className="flex-1 space-y-4">
              <div className="flex justify-between">
                <span className="font-medium text-white">Product Name:</span>
                <span className="text-white">{product.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-white">Price:</span>
                <span className="text-white">
                  ${new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(product.price / 100)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
