import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { title, body } = await request.json();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }
        
        const { data, error } = await supabase
          .from("posts")
          .insert([{ 
            user_id: user.id, 
            title, 
            body, 
            like: 0,      
            dislike: 0,   
            views: 0      
          }])
          .select();

        if (error) throw error;
    
        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
