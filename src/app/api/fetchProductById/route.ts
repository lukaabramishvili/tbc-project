import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const url = new URL(request.url);
    const productId = url.searchParams.get("id"); 

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("products") 
      .select("*")
      .eq("id", productId) 
      .single(); 

    if (error) {
      return NextResponse.json({ error: (error as any).message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as any).message }, { status: 400 });
  }
}
