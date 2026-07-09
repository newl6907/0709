"use client";

import { useEffect } from "react";
import { pushEvent } from "../lib/ga";

type ResultPageEventProps = {
  item: string;
  sigungu: string;
  fee: string;
};

export default function ResultPageEvent({ item, sigungu, fee }: ResultPageEventProps) {
  useEffect(() => {
    if (!item || !sigungu) {
      return;
    }

    pushEvent("fee_result_viewed", {
      item_name: item,
      sigungu,
      fee,
    });
  }, [item, sigungu, fee]);

  return null;
}
