"use client";

import freePickupItems from "../data/free-pickup-items.json";
import { pushEvent } from "../lib/ga";

type FreePickupBannerProps = {
  itemName: string;
};

export default function FreePickupBanner({ itemName }: FreePickupBannerProps) {
  const isFreePickup = freePickupItems.includes(itemName);

  if (!isFreePickup) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-sky-200/80 bg-sky-50 p-6 text-sky-950 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            무상 방문수거 대상
          </p>
          <p className="mt-2 text-lg font-semibold">
            {itemName}은 무상 방문수거 대상입니다.
          </p>
          <p className="mt-1 text-sm text-sky-800/80">
            방문 예약은 15990903 홈페이지에서 신청하세요.
          </p>
        </div>
        <a
          href="https://www.15990903.or.kr"
          target="_blank"
          rel="noreferrer"
          onClick={() => pushEvent("free_pickup_link_click")}
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-sky-700 px-5 text-sm font-semibold text-white transition hover:bg-sky-800"
        >
          예약하러 가기
        </a>
      </div>
    </section>
  );
}
