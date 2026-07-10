"use client";

import { useEffect } from "react";
import categories from "../data/item-categories.json";
import { pushEvent } from "../lib/ga";
import { availableItemsAnywhere, itemsForRegion } from "../lib/region-item-availability";
import ChoiceGrid from "./ChoiceGrid";

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
      <ChoiceGrid
        id="category"
        label="품목 카테고리"
        name="category"
        options={availableCategories.map((entry) => entry.category)}
        value={category}
        onChange={(newCategory) => {
          onCategoryChange(newCategory);
          onItemChange("");
        }}
      />

      <ChoiceGrid
        id="item"
        label="표준 품목"
        name="item"
        options={availableItems}
        value={item}
        onChange={onItemChange}
        emptyMessage={category ? "선택 가능한 품목이 없습니다." : "카테고리를 먼저 선택하세요."}
      />
    </div>
  );
}
