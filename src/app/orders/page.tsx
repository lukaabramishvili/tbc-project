import { createClient } from "../../utils/supabase/server";
import Link from "next/link";

export default async function OrdersPage() {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  const user = userData?.user;

  if (userError || !user) {
    console.error("Error fetching user:", userError?.message);
    return (
      <main className="max-w-[136rem] mx-auto p-8 flex flex-col justify-center items-center gap-8">
        <h1 className="text-3xl">Orders</h1>
        <p className="text-red-600">
          You must be logged in to view your orders.
        </p>
      </main>
    );
  }

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id);

  const sortedOrders = orders?.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB.getTime() - dateA.getTime();
  });

  if (ordersError) {
    console.error("Error fetching orders:", ordersError.message);
  }

  return (
    <section className="max-w-[136rem] mx-auto p-8 flex flex-col justify-center items-center gap-12 w-full min-h-screen dark:bg-[#2C2758]">
      <h1 className="text-4xl font-bold text-gray-800 text-center w-full dark:text-white">Your Orders</h1>

      {sortedOrders && sortedOrders.length > 0 ? (
        <ul className="flex flex-col gap-2 w-full max-w-6xl space-y-6 px-4 sm:px-8 md:px-12 lg:px-16">
          {sortedOrders.map((order) => (
            <Link href={`/orders/${order.id}`} key={order.id} className="w-full">
              <li className="list-none border border-gray-300 bg-[#7F73EB] dark:bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-blue-500 shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300 cursor-pointer w-full">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
                  <div className="w-full">
                    <p className="text-lg font-semibold text-white">
                      <strong>Order ID:</strong> {order.id}
                    </p>
                    <p className="text-lg text-white">
                      <strong>Product ID:</strong> {order.product_id}
                    </p>
                    <p className="text-lg text-white">
                      <strong>Price:</strong> $
                      ${new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(order.price / 100)}
                    </p>
                  </div>
                  <p className="text-sm text-white mt-4 md:mt-0 w-full md:w-auto">
                    <strong>Date:</strong>{" "}
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-white text-lg text-center w-full">You have no orders yet.</p>
      )}
    </section>
  );
}
