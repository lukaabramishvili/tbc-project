import { createClient } from "../../utils/supabase/server";
import Link from "next/link";

export default async function OrdersPage() {
  const supabase = await createClient();

  // Get authenticated user
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

  // Fetch orders for the user
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id);

  if (ordersError) {
    console.error("Error fetching orders:", ordersError.message);
  }

  return (
    <section className="max-w-[136rem] mx-auto p-8 flex flex-col justify-center items-center gap-12">
      <h1 className="text-4xl font-bold text-gray-800">Your Orders</h1>

      {/* Orders Section */}
      {orders && orders.length > 0 ? (
        <ul className="flex flex-col gap-2 w-full max-w-4xl space-y-6">
          {orders.map((order) => (
            <Link href={`/orders/${order.id}`}>
              <li
                key={order.id}
                className="list-none border border-gray-300 bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-gray-700">
                      <strong>Order ID:</strong> {order.id}
                    </p>
                    <p className="text-lg text-gray-600">
                      <strong>Product ID:</strong> {order.product_id}
                    </p>
                    <p className="text-lg text-gray-600">
                      <strong>Price:</strong> $
                      {new Intl.NumberFormat("en-US").format(order.price)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 md:mt-0">
                    <strong>Date:</strong>{" "}
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-lg">You have no orders yet.</p>
      )}
    </section>
  );
}
