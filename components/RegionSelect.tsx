"use client";

import { useEffect, useMemo } from "react";
import regionOptions from "../data/region-options.json";
import { pushEvent } from "../lib/ga";
import { sidoOptionsForItem, sigunguOptionsForItem } from "../lib/region-item-availability";

type RegionSelectProps = {
  sido: string;
  sigungu: string;
  item: string;
  onSidoChange: (sido: string) => void;
  onSigunguChange: (sigungu: string) => void;
};

export default function RegionSelect({
  sido,
  sigungu,
  item,
  onSidoChange,
  onSigunguChange,
}: RegionSelectProps) {
  const availableSido = useMemo(
    () => sidoOptionsForItem(item, regionOptions.map((entry) => entry.sido)),
    [item]
  );

  const currentSigunguOptions = useMemo(() => {
    const allSigungu = regionOptions.find((entry) => entry.sido === sido)?.sigungu ?? [];
    return sigunguOptionsForItem(sido, item, allSigungu);
  }, [sido, item]);

  useEffect(() => {
    if (sido && sigungu) {
      pushEvent("region_selected", { sido, sigungu });
    }
  }, [sido, sigungu]);

  return (
    <div className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div>
        <label htmlFor="sido" className="block text-sm font-semibold text-zinc-700">
          시도
        </label>
        <select
          id="sido"
          name="sido"
          value={sido}
          onChange={(event) => {
            onSidoChange(event.target.value);
            onSigunguChange("");
          }}
          className="mt-2 w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
        >
          <option value="">시도를 선택하세요</option>
          {regionOptions
            .filter((entry) => availableSido.includes(entry.sido))
            .map((entry) => (
              <option key={entry.sido} value={entry.sido}>
                {entry.sido}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label htmlFor="sigungu" className="block text-sm font-semibold text-zinc-700">
          시군구
        </label>
        <select
          id="sigungu"
          name="sigungu"
          value={sigungu}
          onChange={(event) => onSigunguChange(event.target.value)}
          disabled={!sido}
          className="mt-2 w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="">시군구를 선택하세요</option>
          {currentSigunguOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
