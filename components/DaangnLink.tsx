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
      className="mt-4 inline-flex h-12 items-center justify-center rounded-2xl bg-amber-500 px-5 text-sm font-semibold text-white transition hover:bg-amber-600"
    >
      당근마켓에서 검색하기
    </a>
  );
}
