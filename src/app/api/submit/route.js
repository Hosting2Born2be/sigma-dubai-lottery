import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      id,
      firstName,
      lastName,
      phone,
      email,
      industry,
      company,
      websiteUrl,
      currentPaymentProviders,
    } = body;

    // Повторна перевірка унікальності id
    const checkResult = await pool.query(
      'SELECT COUNT(*) FROM "sigma-dubai-lottery" WHERE id = $1',
      [id]
    );
    const count = parseInt(checkResult.rows[0].count, 10);
    if (count > 0) {
      return NextResponse.json({ error: "Duplicate id" }, { status: 400 });
    }

    const insertQuery = `
      INSERT INTO "sigma-dubai-lottery"
      (id, "firstName", "lastName", phone, email, industry, company, "websiteUrl", "currentPaymentProviders")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    await pool.query(insertQuery, [
      id,
      firstName,
      lastName,
      phone,
      email,
      industry,
      company,
      websiteUrl,
      currentPaymentProviders,
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
