export type FeeRecord = {
  ctpvNm: string;
  sggNm: string;
  larWasNm: string;
  larWasSeNm: string;
  larWasSpcfct: string;
  paidFreeYn: string;
  fee: string;
  mngInstNm: string;
  crtrYmd: string;
};

export type FeeSearchResult = {
  items: FeeRecord[];
  baseDate?: string;
};

const API_ENDPOINT = "https://api.data.go.kr/openapi/tn_pubr_public_lar_was_fee_api";

export async function fetchFeeData({
  sido,
  sigungu,
  item,
}: {
  sido: string;
  sigungu: string;
  item: string;
}): Promise<FeeSearchResult> {
  const serviceKey = process.env.PUBLIC_DATA_API_KEY;
  if (!serviceKey) {
    throw new Error("PUBLIC_DATA_API_KEY is not configured.");
  }

  const params = new URLSearchParams({
    serviceKey,
    pageNo: "1",
    numOfRows: "1000",
    type: "json",
    ctpvNm: sido,
    sggNm: sigungu,
    larWasNm: item,
  });

  const response = await fetch(`${API_ENDPOINT}?${params.toString()}`, {
    next: { revalidate: 21600 },
  });

  if (!response.ok) {
    throw new Error(`Public data API request failed with status ${response.status}`);
  }

  const data = await response.json();
  const items = data?.response?.body?.items?.item;
  const baseDate = data?.response?.body?.items?.item?.[0]?.crtrYmd || data?.response?.body?.items?.item?.crtrYmd;

  if (!items) {
    return { items: [], baseDate };
  }

  const normalizedItems = Array.isArray(items) ? items : [items];

  const mapToRecord = (raw: unknown): FeeRecord => {
    const record = raw as Record<string, unknown>;
    return {
      ctpvNm: typeof record.ctpvNm === "string" ? record.ctpvNm : "",
      sggNm: typeof record.sggNm === "string" ? record.sggNm : "",
      larWasNm: typeof record.larWasNm === "string" ? record.larWasNm : "",
      larWasSeNm: typeof record.larWasSeNm === "string" ? record.larWasSeNm : "",
      larWasSpcfct: typeof record.larWasSpcfct === "string" ? record.larWasSpcfct : "",
      paidFreeYn: typeof record.paidFreeYn === "string" ? record.paidFreeYn : "",
      fee: typeof record.fee === "string" ? record.fee : "",
      mngInstNm: typeof record.mngInstNm === "string" ? record.mngInstNm : "",
      crtrYmd: typeof record.crtrYmd === "string" ? record.crtrYmd : "",
    };
  };

  return {
    items: normalizedItems.map(mapToRecord),
    baseDate,
  };
}
