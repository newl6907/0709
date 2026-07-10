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
    <section className="rounded-lg border border-line-strong bg-surface p-6 shadow-[0_8px_8px_rgba(0,0,0,0.3)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-announcement">
            무상 방문수거 대상
          </p>
          <p className="mt-2 text-lg font-bold text-white">
            {itemName}은 무상 방문수거 대상입니다.
          </p>
          <p className="mt-1 text-sm text-muted">
            방문 예약은 15990903 홈페이지에서 신청하세요.
          </p>
        </div>
        <a
          href="https://www.15990903.or.kr"
          target="_blank"
          rel="noreferrer"
          onClick={() => pushEvent("free_pickup_link_click")}
          className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-5 text-sm font-bold uppercase tracking-[0.1em] text-black transition hover:bg-accent-strong"
        >
          예약하러 가기
        </a>
      </div>
    </section>
  );
}