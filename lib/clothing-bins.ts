export type ClothingBin = {
  관리단체: string;
  관리코드: string;
  행정동: string;
  도로명주소: string;
  위도: number;
  경도: number;
  데이터기준일자: string;
};

import seoulJongno from "../data/clothing-bins/서울특별시-종로구.json";

const bins: Record<string, ClothingBin[]> = {
  "서울특별시|종로구": seoulJongno,
};

export function getClothingBins(sido: string, sigungu: string): ClothingBin[] | undefined {
  return bins[`${sido}|${sigungu}`];
}
