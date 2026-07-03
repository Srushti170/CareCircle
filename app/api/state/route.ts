import { NextResponse } from "next/server";
import { getMongoClientPromise } from "@/lib/mongodb";

export async function GET() {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: "MONGODB_URI is missing" }, { status: 500 });
  }

  try {
    const client = await getMongoClientPromise();
    const db = client.db();

    // Fetch all collections in parallel
    const [
      authMeta,
      users,
      careCircleDoc,
      invites,
      onboardingDoc,
      patientDoc,
      medications,
      tasks,
      appointments,
      feed,
      healthLogs,
      documents,
      familyMembers,
      settingsDoc
    ] = await Promise.all([
      db.collection("metadata").findOne({ _id: "auth_meta" as any }),
      db.collection("users").find({}).toArray(),
      db.collection("metadata").findOne({ _id: "care_circle" as any }),
      db.collection("invites").find({}).toArray(),
      db.collection("metadata").findOne({ _id: "onboarding" as any }),
      db.collection("metadata").findOne({ _id: "patient" as any }),
      db.collection("medications").find({}).toArray(),
      db.collection("tasks").find({}).toArray(),
      db.collection("appointments").find({}).toArray(),
      db.collection("feed").find({}).toArray(),
      db.collection("health_logs").find({}).toArray(),
      db.collection("documents").find({}).toArray(),
      db.collection("family_members").find({}).toArray(),
      db.collection("metadata").findOne({ _id: "settings" as any })
    ]);

    // Helper to strip MongoDB specific _id from array entries
    const cleanArray = (arr: any[]) => arr.map(({ _id, ...rest }) => rest);


    const state = {
      auth: {
        currentUserId: authMeta ? authMeta.currentUserId : null,
        users: cleanArray(users)
      },
      careCircle: careCircleDoc ? { ...careCircleDoc, _id: undefined } : null,
      invites: cleanArray(invites),
      onboarding: onboardingDoc ? { ...onboardingDoc, _id: undefined } : { completed: false, step: "account" },
      patient: patientDoc ? { ...patientDoc, _id: undefined } : {
        name: "",
        fullName: "",
        age: "",
        relation: "",
        careNeeds: "",
        mood: "Neutral",
        sleepHours: 0,
        bloodPressure: "",
        sugarLevel: 0,
        painLevel: 0,
        lastMedication: ""
      },
      medications: cleanArray(medications),
      tasks: cleanArray(tasks),
      appointments: cleanArray(appointments),
      feed: cleanArray(feed),
      healthLogs: cleanArray(healthLogs),
      documents: cleanArray(documents),
      familyMembers: cleanArray(familyMembers),
      settings: settingsDoc ? { ...settingsDoc, _id: undefined } : {
        textSize: "Large",
        contrast: "High",
        locale: "en",
        carePreferences: {
          medicationReminders: true,
          appointmentAlerts: true,
          dailyHealthSummary: false,
          quietHours: true
        }
      }
    };

    return NextResponse.json(state);
  } catch (error) {
    console.error("MongoDB GET Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: "MONGODB_URI is missing" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const client = await getMongoClientPromise();
    const db = client.db();

    const operations: Promise<any>[] = [];

    // 1. Auth Meta (currentUserId)
    operations.push(
      db.collection("metadata").updateOne(
        { _id: "auth_meta" as any },
        { $set: { currentUserId: body.auth?.currentUserId || null } },
        { upsert: true }
      )
    );

    // 2. Users (users list)
    operations.push(db.collection("users").deleteMany({}));
    if (body.auth?.users && body.auth.users.length > 0) {
      operations.push(db.collection("users").insertMany(body.auth.users));
    }

    // 3. Care Circle
    if (body.careCircle) {
      const cleanCareCircle = { ...body.careCircle };
      delete cleanCareCircle._id;
      operations.push(
        db.collection("metadata").updateOne(
          { _id: "care_circle" as any },
          { $set: cleanCareCircle },
          { upsert: true }
        )
      );
    } else {
      operations.push(db.collection("metadata").deleteOne({ _id: "care_circle" as any }));
    }

    // 4. Invites
    operations.push(db.collection("invites").deleteMany({}));
    if (body.invites && body.invites.length > 0) {
      operations.push(db.collection("invites").insertMany(body.invites));
    }

    // 5. Onboarding
    if (body.onboarding) {
      const cleanOnboarding = { ...body.onboarding };
      delete cleanOnboarding._id;
      operations.push(
        db.collection("metadata").updateOne(
          { _id: "onboarding" as any },
          { $set: cleanOnboarding },
          { upsert: true }
        )
      );
    }

    // 6. Patient
    if (body.patient) {
      const cleanPatient = { ...body.patient };
      delete cleanPatient._id;
      operations.push(
        db.collection("metadata").updateOne(
          { _id: "patient" as any },
          { $set: cleanPatient },
          { upsert: true }
        )
      );
    }

    // 7. Medications
    operations.push(db.collection("medications").deleteMany({}));
    if (body.medications && body.medications.length > 0) {
      operations.push(db.collection("medications").insertMany(body.medications));
    }

    // 8. Tasks
    operations.push(db.collection("tasks").deleteMany({}));
    if (body.tasks && body.tasks.length > 0) {
      operations.push(db.collection("tasks").insertMany(body.tasks));
    }

    // 9. Appointments
    operations.push(db.collection("appointments").deleteMany({}));
    if (body.appointments && body.appointments.length > 0) {
      operations.push(db.collection("appointments").insertMany(body.appointments));
    }

    // 10. Feed
    operations.push(db.collection("feed").deleteMany({}));
    if (body.feed && body.feed.length > 0) {
      operations.push(db.collection("feed").insertMany(body.feed));
    }

    // 11. Health Logs
    operations.push(db.collection("health_logs").deleteMany({}));
    if (body.healthLogs && body.healthLogs.length > 0) {
      operations.push(db.collection("health_logs").insertMany(body.healthLogs));
    }

    // 12. Documents
    operations.push(db.collection("documents").deleteMany({}));
    if (body.documents && body.documents.length > 0) {
      operations.push(db.collection("documents").insertMany(body.documents));
    }

    // 13. Family Members
    operations.push(db.collection("family_members").deleteMany({}));
    if (body.familyMembers && body.familyMembers.length > 0) {
      operations.push(db.collection("family_members").insertMany(body.familyMembers));
    }

    // 14. Settings
    if (body.settings) {
      const cleanSettings = { ...body.settings };
      delete cleanSettings._id;
      operations.push(
        db.collection("metadata").updateOne(
          { _id: "settings" as any },
          { $set: cleanSettings },
          { upsert: true }
        )
      );
    }

    await Promise.all(operations);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("MongoDB POST Error:", error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
