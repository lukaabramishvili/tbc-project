import ProductDetail from "@/app/products/[id]/page";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import React from "react";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const { data } = await supabase.from("products").select();

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
