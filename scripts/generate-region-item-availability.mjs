// Regenerate data/region-item-availability.json whenever data/large-waste-fees.json,
// data/region-options.json, or data/item-categories.json changes:
//   node scripts/generate-region-item-availability.mjs
import { readFile, writeFile } from "fs/promises";
import path from "path";

const root = path.join(import.meta.dirname, "..");

function normalize(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

const [feeRecords, regionOptions, categories] = await Promise.all([
  readFile(path.join(root, "data", "large-waste-fees.json"), "utf-8").then(JSON.parse),
  readFile(path.join(root, "data", "region-options.json"), "utf-8").then(JSON.parse),
  readFile(path.join(root, "data", "item-categories.json"), "utf-8").then(JSON.parse),
]);

const allItems = categories.flatMap((entry) => entry.items);

const feeKeys = new Set(
  feeRecords.map((record) => `${normalize(record.sido)}|${normalize(record.sigungu)}|${normalize(record.itemName)}`)
);

const availability = {};
for (const { sido, sigungu: sigunguList } of regionOptions) {
  availability[sido] = {};
  for (const sigungu of sigunguList) {
    availability[sido][sigungu] = allItems.filter((item) =>
      feeKeys.has(`${normalize(sido)}|${normalize(sigungu)}|${normalize(item)}`)
    );
  }
}

const outPath = path.join(root, "data", "region-item-availability.json");
await writeFile(outPath, JSON.stringify(availability, null, 2) + "\n", "utf-8");
console.log(`Wrote ${outPath}`);
