import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { getMongoClientPromise } from "@/lib/mongodb";

const dbPath = path.join(process.cwd(), "lib", "db.json");

async function getLocalBackup() {
  try {
    const data = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

export async function GET() {
  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI environment variable is missing. Falling back to local db.json file.");
    const data = await getLocalBackup();
    return NextResponse.json(data);
  }

  try {
    const client = await getMongoClientPromise();
    const db = client.db();
    const collection = db.collection("states");
    const doc = await collection.findOne({ _id: "global_state" as any });

    if (!doc) {
      // Seed from db.json if database document is empty
      const localData = await getLocalBackup();
      if (localData && Object.keys(localData).length > 0) {
        await collection.updateOne(
          { _id: "global_state" as any },
          { $set: { ...localData } },
          { upsert: true }
        );
        return NextResponse.json(localData);
      }
      return NextResponse.json({});
    }

    // Strip MongoDB specific _id field
    const { _id, ...state } = doc;
    return NextResponse.json(state);
  } catch (error) {
    console.error("MongoDB GET Error:", error);
    // Graceful fallback to file system on connection error
    const localData = await getLocalBackup();
    return NextResponse.json(localData);
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!process.env.MONGODB_URI) {
    try {
      await fs.writeFile(dbPath, JSON.stringify(body, null, 2), "utf-8");
      return NextResponse.json({ ok: true });
    } catch (error) {
      return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
    }
  }

  try {
    const client = await getMongoClientPromise();
    const db = client.db();
    const collection = db.collection("states");

    // Clean body to prevent saving any existing MongoDB metadata if present
    const cleanBody = { ...body };
    delete cleanBody._id;

    await collection.updateOne(
      { _id: "global_state" as any },
      { $set: cleanBody },
      { upsert: true }
    );

    // Keep db.json in sync as a local backup
    try {
      await fs.writeFile(dbPath, JSON.stringify(body, null, 2), "utf-8");
    } catch (fsErr) {
      console.warn("Failed to write local backup file:", fsErr);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("MongoDB POST Error:", error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
