import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const FEE_FILE_PATH = path.join(process.cwd(), "data", "large-waste-fees.json");

type FeeRecord = Record<string, unknown>;

function normalizeValue(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function matchesField(value: unknown, expected: string) {
  return normalizeValue(value) === expected.trim().toLowerCase();
}

function matchesRecord(row: FeeRecord, expectedSido: string, expectedSigungu: string, expectedItem: string) {
  const matchesSido =
    matchesField(row.sido, expectedSido) ||
    matchesField(row.시도, expectedSido) ||
    matchesField(row.city, expectedSido) ||
    matchesField(row.ctpvNm, expectedSido) ||
    matchesField(row.orgName, expectedSido);

  const matchesSigungu =
    matchesField(row.sigungu, expectedSigungu) ||
    matchesField(row.시군구, expectedSigungu) ||
    matchesField(row.district, expectedSigungu) ||
    matchesField(row.sggNm, expectedSigungu);

  const matchesItem =
    matchesField(row.itemName, expectedItem) ||
    matchesField(row.item, expectedItem) ||
    matchesField(row.name, expectedItem) ||
    matchesField(row.품목, expectedItem) ||
    matchesField(row.larWasNm, expectedItem);

  return matchesSido && matchesSigungu && matchesItem;
}

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

  let fileContent: string;
  try {
    fileContent = await fs.readFile(FEE_FILE_PATH, "utf-8");
  } catch {
    return NextResponse.json(
      { error: "정적 요금 파일을 읽을 수 없습니다." },
      { status: 500 }
    );
  }

  let data: unknown;
  try {
    data = JSON.parse(fileContent);
  } catch {
    return NextResponse.json(
      { error: "정적 요금 파일이 올바른 JSON이 아닙니다." },
      { status: 500 }
    );
  }

  const records = Array.isArray(data)
    ? (data as unknown[])
    : ((data as { items?: unknown[] }).items ?? []);

  const filtered = (records as unknown[]).filter((record) => {
    const row = record as FeeRecord;
    return matchesRecord(row, sido, sigungu, item);
  });

  return NextResponse.json({ items: filtered }, { status: 200 });
}
