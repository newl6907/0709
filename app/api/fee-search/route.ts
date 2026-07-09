import { NextResponse } from "next/server";

const API_ENDPOINT = "https://api.data.go.kr/openapi/tn_pubr_public_lar_was_fee_api";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sido = url.searchParams.get("sido")?.trim();
  const sigungu = url.searchParams.get("sigungu")?.trim();
  const item = url.searchParams.get("item")?.trim();
  const serviceKey = process.env.PUBLIC_DATA_API_KEY;

  if (!serviceKey) {
    return NextResponse.json(
      { error: "PUBLIC_DATA_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  if (!sido || !sigungu || !item) {
    return NextResponse.json(
      { error: "Missing required query parameters: sido, sigungu, item." },
      { status: 400 }
    );
  }

  const params = new URLSearchParams({
    serviceKey,
    pageNo: "1",
    numOfRows: "1000",
    type: "json",
    ctpvNm: sido,
    sggNm: sigungu,
    larWasNm: item,
  });

  const response = await fetch(`${API_ENDPOINT}?${params.toString()}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: 21600,
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: `Failed to fetch public data API. Status: ${response.status}` },
      { status: 502 }
    );
  }

  const data = await response.json();
  const items = data?.response?.body?.items?.item;
  if (!items) {
    return NextResponse.json({ items: [] }, { status: 200 });
  }

  return NextResponse.json({ items });
}
