"use client";

import { useState } from "react";
import ItemAutocomplete from "@/components/ItemAutocomplete";
import RegionSelect from "@/components/RegionSelect";

export default function Home() {
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [sido, setSido] = useState("");
  const [sigungu, setSigungu] = useState("");
  const canSubmit = Boolean(category && item && sido && sigungu);

  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-10">
        <section className="rounded-[32px] bg-[#FDECE8] p-8 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C94B37]">
              우리 동네 가구 버리기
            </p>
            <h1 className="text-4xl font-semibold text-[#222222] sm:text-5xl">
              큰 짐 수거함
            </h1>
            <p className="text-base leading-7 text-[#484848]">
              가구를 버려야 할 때, 어떻게 버릴지 막막하다면? 맞춤 가이드를 알려드릴게요 🪑
            </p>
          </div>
        </section>

        <form action="/result" className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
          <ItemAutocomplete
            category={category}
            item={item}
            onCategoryChange={setCategory}
            onItemChange={setItem}
          />
          <RegionSelect
            sido={sido}
            sigungu={sigungu}
            onSidoChange={setSido}
            onSigunguChange={setSigungu}
          />
          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-4 inline-flex h-14 w-full items-center justify-center rounded-full bg-[#E8604A] px-8 text-sm font-semibold text-white transition hover:bg-[#C94B37] disabled:cursor-not-allowed disabled:bg-[#DDDDDD] disabled:text-[#929292] xl:col-span-2"
          >
            결과 보기
          </button>
        </form>

        <p className="max-w-2xl text-sm text-[#717171]">
          선택한 항목이 최소 하나라도 없으면 결과 페이지로 이동할 수 없습니다. 현재는 샘플 지역/품목 데이터로 동작합니다.
        </p>
      </div>
    </main>
  );
}