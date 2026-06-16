import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

const dbPath = path.join(process.cwd(), "lib", "db.json");

export async function GET() {
  try {
    const data = await fs.readFile(dbPath, "utf-8");
    const parsed = JSON.parse(data);
    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({});
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await fs.writeFile(dbPath, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
