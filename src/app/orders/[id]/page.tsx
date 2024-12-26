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

  // Fetch order details by ID
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

  // Fetch product details using product_id from the order
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
    <section className="max-w-[136rem] mx-auto p-8 flex flex-col items-center gap-12">
      <h1 className="text-4xl font-extrabold text-gray-900">Order Details</h1>
      <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        {/* Order Information */}
        <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">
            Order Information
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Order ID:</span>
            <span className="text-gray-800">{order.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Price:</span>
            <span className="text-gray-800">
              ${new Intl.NumberFormat("en-US").format(order.price)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Order Date:</span>
            <span className="text-gray-800">
              {new Date(order.created_at).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Product Information */}
        <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">
            Product Information
          </h2>
        </div>
        <div className="p-6 space-y-4">
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
                <span className="font-medium text-gray-600">Product Name:</span>
                <span className="text-gray-800">{product.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Price:</span>
                <span className="text-gray-800">
                  ${new Intl.NumberFormat("en-US").format(product.price)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
