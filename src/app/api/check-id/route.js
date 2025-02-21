import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  try {
    const result = await pool.query(
      'SELECT COUNT(*) FROM "sigma-dubai-lottery" WHERE id = $1',
      [id]
    );
    const count = parseInt(result.rows[0].count, 10);
    return NextResponse.json({ unique: count === 0 });
  } catch (error) {
    console.error("Error checking id:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
