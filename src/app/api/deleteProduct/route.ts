import { createClient } from "@/utils/supabase/server";

export async function DELETE(req: Request): Promise<Response> {
  try {
    const { id } = await req.json();
    const supabase = createClient();

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing product id" }), {
        status: 400,
      });
    }

    const { data: user, error: authError } = await (await supabase).auth.getUser();
    console.log("Deleting product. User:", user);
    if (authError) console.error("Auth Error:", authError.message);

    const { error } = await (await supabase).from("products").delete().eq("id", id);

    if (error) {
      console.error("Supabase Delete Error:", error.message);
      return new Response(
        JSON.stringify({ error: "Failed to delete product", details: error.message }),
        { status: 500 }
      );
    }

    console.log(`✅ Product ${id} deleted successfully`);
    return new Response(JSON.stringify({ message: "Product deleted successfully" }), {
      status: 200,
    });
  } catch (err: unknown) {
    console.error("Error deleting product:", err instanceof Error ? err.message : err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
