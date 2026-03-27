import { NextResponse } from "next/server";
import { getAllPoolsoopRecords } from "@/lib/supabase/crud";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const data = await getAllPoolsoopRecords(supabase);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error getting poolsoop records:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
