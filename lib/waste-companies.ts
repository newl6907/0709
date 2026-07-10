import companies from "@/data/waste-companies.json";

export type WasteCompany = {
  sido: string;
  sigungu: string;
  name: string;
  address: string;
  phone: string;
  categories: number[];
};

const CATEGORY_LABELS: Record<number, string> = {
  1: "일반",
  2: "음식",
  3: "재활용",
  4: "대형",
  5: "가로",
};

export function getWasteCompanies(sido: string, sigungu: string): WasteCompany[] {
  return (companies as WasteCompany[]).filter(
    (company) => company.sido === sido && company.sigungu === sigungu
  );
}

export function categoryLabel(code: number): string {
  return CATEGORY_LABELS[code] ?? `${code}`;
}

export function formatPhone(phone: string): string {
  return `02-${phone}`;
}
