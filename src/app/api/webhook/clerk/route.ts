import { type IncomingHttpHeaders } from "http";
import { Webhook, type WebhookRequiredHeaders } from "svix";
import { type WebhookEvent } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/env.mjs";
import { createTRPCContext } from "@/server/api/trpc";
import { clerkEvent } from "@/server/api/routers/clerk/eventType.schema";
import { appRouter } from "@/server/api/root";

const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SECRET;
export const dynamic = "force-dynamic";
export async function POST(
  req: NextRequest & {
    headers: IncomingHttpHeaders & WebhookRequiredHeaders;
  },
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await req.json();
  const parsed = clerkEvent.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }

  const payload = parsed.data;
  const headers = Object.fromEntries(req.headers.entries());
  const wh = new Webhook(WEBHOOK_SECRET);

  try {
    if (env.NODE_ENV === "production") {
      wh.verify(JSON.stringify(json), headers) as WebhookEvent;
    }
  } catch (_) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const ctx = await createTRPCContext({ headers: req.headers });
  const caller = appRouter.createCaller(ctx);
  const event = payload.type;

  switch (event) {
    case "user.created":
      await caller.clerk.webhook.userCreated({ data: payload });
      break;

    // TODO: handle different events, update details, delete user and all data, store activity logs of MAU
    case "user.updated":
    case "user.deleted":
    case "session.created":
    case "session.revoked":
    case "session.removed":
    case "session.ended":
      break;

    default:
      console.error(`${event as string} is not a valid event`);
      return new Response("", { status: 200 });
  }

  return NextResponse.json({ success: true });
}
