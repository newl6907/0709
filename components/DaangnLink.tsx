"use client";

import { pushEvent } from "../lib/ga";

type DaangnLinkProps = {
  item: string;
};

export default function DaangnLink({ item }: DaangnLinkProps) {
  return (
    <a
      href={`https://www.daangn.com/search/${encodeURIComponent(item || "")}`}
      target="_blank"
      rel="noreferrer"
      onClick={() => pushEvent("daangn_link_click", { item_name: item })}
      className="mt-4 inline-flex h-12 items-center justify-center rounded-full border border-line-strong px-5 text-sm font-bold text-white transition hover:border-white hover:bg-white/5"
    >
      🥕 당근마켓에서 &apos;{item}&apos; 검색하기
    </a>
  );
}