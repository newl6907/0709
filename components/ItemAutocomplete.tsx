"use client";

import { useEffect } from "react";
import categories from "../data/item-categories.json";
import { pushEvent } from "../lib/ga";
import { availableItemsAnywhere, itemsForRegion } from "../lib/region-item-availability";

type ItemAutocompleteProps = {
  category: string;
  item: string;
  sido: string;
  sigungu: string;
  onCategoryChange: (category: string) => void;
  onItemChange: (item: string) => void;
};

export default function ItemAutocomplete({
  category,
  item,
  sido,
  sigungu,
  onCategoryChange,
  onItemChange,
}: ItemAutocompleteProps) {
  const feeAvailableItems =
    sido && sigungu ? itemsForRegion(sido, sigungu) : availableItemsAnywhere();

  const availableCategories = categories.filter((entry) =>
    entry.items.some((name) => feeAvailableItems.includes(name))
  );

  const availableItems = (
    categories.find((entry) => entry.category === category)?.items ?? []
  ).filter((name) => feeAvailableItems.includes(name));

  useEffect(() => {
    if (category && item) {
      pushEvent("item_search", { category, item_name: item });
    }
  }, [category, item]);

  return (
    <div className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div>
        <label htmlFor="category" className="block text-sm font-semibold text-zinc-700">
          품목 카테고리
        </label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={(event) => {
            onCategoryChange(event.target.value);
            onItemChange("");
          }}
          className="mt-2 w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
        >
          <option value="">카테고리를 선택하세요</option>
          {availableCategories.map((entry) => (
            <option key={entry.category} value={entry.category}>
              {entry.category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="item" className="block text-sm font-semibold text-zinc-700">
          표준 품목
        </label>
        <select
          id="item"
          name="item"
          value={item}
          onChange={(event) => onItemChange(event.target.value)}
          disabled={!category}
          className="mt-2 w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="">품목을 선택하세요</option>
          {availableItems.map((itemName) => (
            <option key={itemName} value={itemName}>
              {itemName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
