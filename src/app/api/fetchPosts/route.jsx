import ProductDetail from "@/app/products/[id]/page";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  try {
    const supabase = await createClient();

    const { data } = await supabase.from("posts").select();

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
