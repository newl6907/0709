"use client";

import { useEffect, useMemo } from "react";
import regionOptions from "../data/region-options.json";
import { pushEvent } from "../lib/ga";
import { sidoOptionsForItem, sigunguOptionsForItem } from "../lib/region-item-availability";
import ChoiceGrid from "./ChoiceGrid";

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
      <ChoiceGrid
        id="sido"
        label="시도"
        name="sido"
        options={regionOptions
          .filter((entry) => availableSido.includes(entry.sido))
          .map((entry) => entry.sido)}
        value={sido}
        onChange={(newSido) => {
          onSidoChange(newSido);
          onSigunguChange("");
        }}
      />

      <ChoiceGrid
        id="sigungu"
        label="시군구"
        name="sigungu"
        options={currentSigunguOptions}
        value={sigungu}
        onChange={onSigunguChange}
        emptyMessage={sido ? "선택 가능한 시군구가 없습니다." : "시도를 먼저 선택하세요."}
      />
    </div>
  );
}
