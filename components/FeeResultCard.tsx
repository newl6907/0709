type FeeRecord = {
  ctpvNm?: string;
  sggNm?: string;
  larWasNm?: string;
  larWasSeNm?: string;
  larWasSpcfct?: string;
  paidFreeYn?: string;
  fee?: string | number;
  mngInstNm?: string;
  crtrYmd?: string;
  sido?: string;
  sigungu?: string;
  itemName?: string;
  category?: string;
  spec?: string;
  paidFree?: string;
  managingOrg?: string;
  baseDate?: string;
};

export default function FeeResultCard({
  records,
}: {
  records: FeeRecord[];
}) {
  if (records.length === 0) {
    return (
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-center text-zinc-600 shadow-sm">
        해당 지역에는 수수료 정보가 아직 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {records.map((record, index) => {
        const itemName = record.itemName || record.larWasNm || "품목 정보 없음";
        const specText = record.spec || record.larWasSeNm || record.larWasSpcfct || "";
        const feeValue = typeof record.fee === "number" ? record.fee : record.fee ?? 0;
        const feeLabel = record.paidFree === "무료" || record.paidFreeYn === "무료" ? "무료" : `${feeValue}원`;
        const managingOrg = record.managingOrg || record.mngInstNm || "정보 없음";
        const baseDate = record.baseDate || record.crtrYmd || "-";

        return (
          <article key={`${itemName}-${index}`} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-zinc-500">품목</p>
                <h3 className="mt-1 text-xl font-semibold text-zinc-950">{itemName}</h3>
                <p className="mt-1 text-sm text-zinc-600">{specText ? `${specText}` : "상세 정보 없음"}</p>
              </div>
              <div className="rounded-3xl bg-zinc-100 px-5 py-3 text-right">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">수수료</p>
                <p className="mt-1 text-2xl font-semibold text-zinc-950">{feeLabel}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-700">
                <p className="font-semibold">관리기관</p>
                <p className="mt-1">{managingOrg}</p>
              </div>
              <div className="rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-700">
                <p className="font-semibold">데이터 기준일</p>
                <p className="mt-1">{baseDate}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
