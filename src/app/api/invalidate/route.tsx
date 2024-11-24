import { revalidateTag } from "next/dist/server/web/spec-extension/revalidate";

import { NextResponse } from "next/server";

export async function GET() {
  revalidateTag("bond-series-list");
  revalidateTag("user-bonds");
  return NextResponse.json({ message: "Invalidated" });
}
