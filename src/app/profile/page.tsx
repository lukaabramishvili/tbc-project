import Link from "next/link";
import { createClient } from "../../utils/supabase/server";
import { logout } from "../logout/actions";
import Image from "next/image";

export default async function Profile() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    return;
  }
  const user = data?.user;

  return (
    <section className="flex flex-col gap-8 min-h-full items-center justify-center text-center max-w-[136rem] mx-auto p-8">
      <h1 className="text-3xl">Profile</h1>
      <div className="flex items-center gap-6 justify-center">
        <Image
          src="/profile-icon.png"
          alt="user"
          width={50}
          height={50}
        ></Image>
        <a href={`mailto:${user?.email}`}>{user?.email}</a>
      </div>

      <div className="flex gap-4 justify-center">
        {/* Navigate to orders */}
        <Link href="/orders">
          <button className="rounded-lg px-6 py-2 cursor-pointer text-white bg-slate-700 hover:bg-slate-600 duration-300">
            Orders
          </button>
        </Link>
        {/* Logout */}
        <form action={logout}>
          <button
            data-cy="logout"
            type="submit"
            className="rounded-lg px-6 py-2 cursor-pointer text-white bg-slate-700 hover:bg-slate-600 duration-300"
          >
            Logout
          </button>
        </form>
      </div>
    </section>
  );
}
