"use client";

import { useState } from "react";
import ItemAutocomplete from "@/components/ItemAutocomplete";
import RegionSelect from "@/components/RegionSelect";
import { isItemAvailableInRegion } from "@/lib/region-item-availability";
import { pushEvent } from "@/lib/ga";

export default function Home() {
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [sido, setSido] = useState("");
  const [sigungu, setSigungu] = useState("");
  const canSubmit = Boolean(category && item && sido && sigungu);

  const handleItemChange = (newItem: string) => {
    if (!isItemAvailableInRegion(newItem, sido, sigungu)) {
      setSido("");
      setSigungu("");
    }
    setItem(newItem);
  };

  const handleSigunguChange = (newSigungu: string) => {
    if (!isItemAvailableInRegion(item, sido, newSigungu)) {
      setCategory("");
      setItem("");
    }
    setSigungu(newSigungu);
  };

  return (
    <main className="min-h-screen bg-background py-12 px-4 sm:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-10">
        <section className="rounded-lg border border-line-strong bg-surface p-8 shadow-[0_8px_8px_rgba(0,0,0,0.3)]">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
              우리집 큰 짐도, 큰 고민도
            </p>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              큰 짐 덜어요
            </h1>
            <p className="text-base leading-7 text-muted">
              가구를 버려야 할 때, 어떻게 버릴지 막막하다면? 맞춤 가이드를 알려드릴게요 🪑
            </p>
          </div>
        </section>

        <form action="/result" className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
          <ItemAutocomplete
            category={category}
            item={item}
            sido={sido}
            sigungu={sigungu}
            onCategoryChange={setCategory}
            onItemChange={handleItemChange}
          />
          <RegionSelect
            sido={sido}
            sigungu={sigungu}
            item={item}
            onSidoChange={setSido}
            onSigunguChange={handleSigunguChange}
          />
          <button
            type="submit"
            disabled={!canSubmit}
            onClick={() =>
              pushEvent("result_view_click", { category, item_name: item, sido, sigungu })
            }
            className="mt-4 inline-flex h-14 w-full items-center justify-center rounded-full bg-accent px-8 text-sm font-bold uppercase tracking-[0.14em] text-black transition hover:bg-accent-strong disabled:cursor-not-allowed disabled:bg-elevated disabled:text-subtle xl:col-span-2"
          >
            결과 보기
          </button>
        </form>
      </div>
    </main>
  );
}