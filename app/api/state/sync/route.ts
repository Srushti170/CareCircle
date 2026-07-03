import { stateEmitter } from "@/lib/state-emitter";

export async function GET(request: Request) {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  // Send initial connection header
  try {
    writer.write(encoder.encode("event: connected\ndata: {}\n\n"));
  } catch (err) {
    console.error("Failed to write initial connection header:", err);
  }

  // Listener to write state changes to client stream
  const onStateUpdate = (state: any) => {
    try {
      writer.write(encoder.encode(`event: update\ndata: ${JSON.stringify(state)}\n\n`));
    } catch (err) {
      // If client closed or error writing, clean up listener
      stateEmitter.off("update", onStateUpdate);
      try {
        writer.close();
      } catch {}
    }
  };

  stateEmitter.on("update", onStateUpdate);

  // Clean up if connection is aborted/closed by the client
  request.signal.addEventListener("abort", () => {
    stateEmitter.off("update", onStateUpdate);
    try {
      writer.close();
    } catch {}
  });

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive"
    }
  });
}
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
