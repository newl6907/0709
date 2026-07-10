import { NextResponse } from "next/server";
import { findFeeRecords } from "@/lib/fee-search";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sido = url.searchParams.get("sido")?.trim();
  const sigungu = url.searchParams.get("sigungu")?.trim();
  const item = url.searchParams.get("item")?.trim();

  if (!sido || !sigungu || !item) {
    return NextResponse.json(
      { error: "Missing required query parameters: sido, sigungu, item." },
      { status: 400 }
    );
  }

  let items;
  try {
    items = await findFeeRecords(sido, sigungu, item);
  } catch {
    return NextResponse.json(
      { error: "정적 요금 파일을 읽을 수 없습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json({ items }, { status: 200 });
}
