import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  console.log("DELETE endpoint hit");

  try {
    const supabase = await createClient();
    console.log("Supabase client initialized");

    const body = await request.json();
    console.log("Request Body:", body);

    const { id } = body;

    if (!id) {
      console.log("Missing Product ID");
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    console.log(`Deleting product with ID: ${id}`);
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.log("Supabase error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("Product deleted successfully");
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.log("Server error:", error);
    return NextResponse.json({ error: (error as any).message || "An error occurred" }, { status: 500 });
  }
}
