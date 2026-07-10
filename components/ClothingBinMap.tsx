"use client";

import { useEffect } from "react";
import { pushEvent } from "../lib/ga";
import type { ClothingBin } from "../lib/clothing-bins";

type ClothingBinMapProps = {
  bins: ClothingBin[];
};

type KakaoMapOptions = {
  center: unknown;
  level: number;
};

type KakaoMaps = {
  load: (callback: () => void) => void;
  LatLng: new (lat: number, lng: number) => unknown;
  Map: new (container: HTMLElement, options: KakaoMapOptions) => unknown;
  Marker: new (params: { position: unknown; map: unknown }) => unknown;
  InfoWindow: new (params: { content: string }) => { open: (map: unknown, marker: unknown) => void };
  event: {
    addListener: (marker: unknown, eventName: string, callback: () => void) => void;
  };
};

export default function ClothingBinMap({ bins }: ClothingBinMapProps) {
  useEffect(() => {
    pushEvent("clothing_bin_viewed");
  }, []);

  useEffect(() => {
    if (!bins.length) {
      return;
    }

    const mapKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
    if (!mapKey) {
      return;
    }

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${encodeURIComponent(mapKey)}`;
    script.async = true;
    script.onload = () => {
      if (typeof window === "undefined") return;
      const kakao = (window as unknown as { kakao?: unknown }).kakao;
      if (!kakao || typeof kakao !== "object") return;
      const kakaoMaps = (kakao as { maps?: KakaoMaps }).maps;
      if (!kakaoMaps) return;
      kakaoMaps.load(() => {
        const container = document.getElementById("kakao-map");
        if (!container) return;

        const options: KakaoMapOptions = {
          center: new kakaoMaps.LatLng(bins[0].위도, bins[0].경도),
          level: 5,
        };
        const map = new kakaoMaps.Map(container, options);

        bins.forEach((bin) => {
          const marker = new kakaoMaps.Marker({
            position: new kakaoMaps.LatLng(bin.위도, bin.경도),
            map,
          });
          const infowindow = new kakaoMaps.InfoWindow({
            content: `<div style="padding:10px;font-size:12px;">${bin.도로명주소}<br/>${bin.행정동}</div>`,
          });
          kakaoMaps.event.addListener(marker, "click", () => {
            infowindow.open(map, marker);
          });
        });
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [bins]);

  if (bins.length === 0) {
    return <p className="text-sm text-muted">의류수거함 위치 정보가 없습니다.</p>;
  }

  return (
    <div className="space-y-4 rounded-lg border border-line-strong bg-surface p-6 shadow-[0_8px_8px_rgba(0,0,0,0.3)]">
      <div>
        <p className="text-sm font-bold text-white">근처 의류수거함</p>
        <p className="mt-1 text-sm text-muted">서울 종로구 기준 샘플 데이터입니다.</p>
      </div>
      <div id="kakao-map" className="h-80 w-full rounded-lg border border-line" />
    </div>
  );
}
