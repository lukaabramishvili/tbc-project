import { createClient } from "../../utils/supabase/server";

export default async function Profile() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;
  console.log(user?.email);

  return (
    <main className="flex flex-col gap-8 min-h-full items-center justify-center text-center max-w-[136rem] mx-auto p-8">
      <h1 className="text-3xl">Profile</h1>
      <a href={`mailto:${user?.email}`}>{user?.email}</a>
    </main>
  );
}
