import { promises as fs } from "fs";
import path from "path";

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

export async function findFeeRecords(sido: string, sigungu: string, item: string): Promise<FeeRecord[]> {
  const fileContent = await fs.readFile(FEE_FILE_PATH, "utf-8");
  const data: unknown = JSON.parse(fileContent);

  const records = Array.isArray(data) ? data : ((data as { items?: unknown[] }).items ?? []);

  return (records as FeeRecord[]).filter((row) => matchesRecord(row, sido, sigungu, item));
}
