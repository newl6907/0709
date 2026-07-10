import availability from "@/data/region-item-availability.json";

type Availability = Record<string, Record<string, string[]>>;

const data = availability as Availability;

export function itemsForRegion(sido: string, sigungu: string): string[] {
  if (!sido || !sigungu) return [];
  return data[sido]?.[sigungu] ?? [];
}

export function isItemAvailableInRegion(item: string, sido: string, sigungu: string): boolean {
  if (!item || !sido || !sigungu) return true;
  return itemsForRegion(sido, sigungu).includes(item);
}

export function availableItemsAnywhere(): string[] {
  const items = new Set<string>();
  for (const sigunguMap of Object.values(data)) {
    for (const list of Object.values(sigunguMap)) {
      list.forEach((item) => items.add(item));
    }
  }
  return Array.from(items);
}

export function sidoOptionsForItem(item: string, allSido: string[]): string[] {
  if (!item) return allSido;
  return allSido.filter((sido) =>
    Object.values(data[sido] ?? {}).some((list) => list.includes(item))
  );
}

export function sigunguOptionsForItem(sido: string, item: string, allSigungu: string[]): string[] {
  if (!item || !sido) return allSigungu;
  return allSigungu.filter((sigungu) => (data[sido]?.[sigungu] ?? []).includes(item));
}
