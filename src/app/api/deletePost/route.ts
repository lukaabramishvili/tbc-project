import { createClient } from "@/utils/supabase/server";

export async function DELETE(req: Request): Promise<Response> {
  try {
    const { id } = await req.json();
    const supabase = createClient();

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing post id" }), {
        status: 400,
      });
    }

    const { data: user, error: authError } = await (await supabase).auth.getUser();
    console.log("Deleting post. User:", user);
    if (authError) console.error("Auth Error:", authError.message);

    const { error } = await (await supabase).from("posts").delete().eq("id", id);

    if (error) {
      console.error("Supabase Delete Error:", error.message);
      return new Response(
        JSON.stringify({ error: "Failed to delete post", details: error.message }),
        { status: 500 }
      );
    }

    console.log(`✅ post ${id} deleted successfully`);
    return new Response(JSON.stringify({ message: "post deleted successfully" }), {
      status: 200,
    });
  } catch (err: unknown) {
    console.error("Error deleting post:", err instanceof Error ? err.message : err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
