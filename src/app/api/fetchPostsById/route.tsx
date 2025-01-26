import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const url = new URL(request.url);
    const postId = url.searchParams.get("id"); // Get post ID from query string

    if (!postId) {
      return NextResponse.json({ error: "Post ID is required." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("posts") // Make sure you're using the correct table name
      .select("*")
      .eq("id", postId) // Filter by the post ID
      .single(); // Use .single() to get a single record

    if (error) {
      return NextResponse.json({ error: (error as any).message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as any).message }, { status: 400 });
  }
}
