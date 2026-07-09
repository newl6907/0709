"use client";

import { useState } from "react";
import ItemAutocomplete from "../components/ItemAutocomplete";
import RegionSelect from "../components/RegionSelect";

export default function Home() {
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [sido, setSido] = useState("");
  const [sigungu, setSigungu] = useState("");
  const canSubmit = Boolean(category && item && sido && sigungu);

  return (
    <main className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-10">
        <section className="rounded-[40px] border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.25em] text-sky-600">우리 동네 버리기 가이드</p>
            <h1 className="text-4xl font-semibold text-zinc-950 sm:text-5xl">
              내 품목의 배출 수수료와 서비스 정보를 한 번에 확인하세요.
            </h1>
            <p className="text-base leading-7 text-zinc-600">
              품목과 지역을 선택하면 대형폐기물 배출 수수료, 방문수거 가능 여부, 의류수거함 정보와 당근마켓 나눔 링크까지 제공합니다.
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
          <input type="hidden" name="category" value={category} />
          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-4 inline-flex h-14 w-full items-center justify-center rounded-3xl bg-sky-900 px-8 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-zinc-300 xl:col-span-2"
          >
            결과 보기
          </button>
        </form>

        <p className="max-w-2xl text-sm text-zinc-600">
          선택한 항목이 최소 하나라도 없으면 결과 페이지로 이동할 수 없습니다. 현재는 샘플 지역/품목 데이터로 동작합니다.
        </p>
      </div>
    </main>
  );
}
