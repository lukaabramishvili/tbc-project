import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({
  children,
}: LayoutProps): Promise<JSX.Element> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userData } = await supabase
    .from("user_profiles")
    .select("stripe_customer_id")
    .eq("id", user?.id)
    .single();

  return !userData || !userData.stripe_customer_id ? (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-500 rounded-lg shadow-lg p-8 text-center max-w-md">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Not subscribed
        </p>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
           Please, visit
        </h1>
        <Link href="/pricing">
          Pricing Page
        </Link>
      </div>
    </div>
  ) : (
    <div>{children}</div>
  );
}
