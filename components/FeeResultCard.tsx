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

// 결과 개수에 따른 사이즈 라벨 규칙
const SIZE_LABELS: Record<number, string[]> = {
  2: ["소형", "대형"],
  3: ["소형", "중형", "대형"],
  4: ["소형", "중형", "대형", "특대형"],
};

function getSizeLabel(index: number, total: number) {
  const preset = SIZE_LABELS[total];
  if (preset) return preset[index];
  return `${index + 1}호`;
}

function getItemName(record: FeeRecord) {
  return record.itemName || record.larWasNm || "품목 정보 없음";
}

function getSpec(record: FeeRecord) {
  return record.spec || record.larWasSeNm || record.larWasSpcfct || "";
}

function isFree(record: FeeRecord) {
  return record.paidFree === "무료" || record.paidFreeYn === "무료";
}

function toNumber(fee?: string | number): number {
  if (typeof fee === "number") return fee;
  if (typeof fee === "string" && fee.trim() !== "") {
    const parsed = Number(fee);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return 0;
}

function getFeeSortValue(record: FeeRecord) {
  return isFree(record) ? 0 : toNumber(record.fee);
}

function getFeeLabel(record: FeeRecord) {
  return isFree(record) ? "무료" : `${toNumber(record.fee).toLocaleString()}원`;
}

function getManagingOrg(record: FeeRecord) {
  return record.managingOrg || record.mngInstNm || "정보 없음";
}

function getBaseDate(record: FeeRecord) {
  return record.baseDate || record.crtrYmd || "-";
}

export default function FeeResultCard({ records }: { records: FeeRecord[] }) {
  if (records.length === 0) {
    return (
      <div className="rounded-lg bg-surface p-6 text-center text-muted shadow-[0_8px_8px_rgba(0,0,0,0.3)]">
        해당 지역에는 수수료 정보가 아직 없습니다.
      </div>
    );
  }

  // 같은 품목끼리 묶기
  const groups = new Map<string, FeeRecord[]>();
  records.forEach((record) => {
    const name = getItemName(record);
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name)!.push(record);
  });

  return (
    <div className="space-y-4">
      {Array.from(groups.entries()).map(([itemName, group]) => {
        const allSpecEmpty = group.every((record) => !getSpec(record));
        const uniqueFees = new Set(group.map(getFeeSortValue));
        const useLadder = group.length > 1 && allSpecEmpty && uniqueFees.size > 1;

        // spec 정보가 없고 가격만 여러 개인 경우 -> 소형~대형 가로 스케일
        if (useLadder) {
          const sorted = [...group].sort(
            (a, b) => getFeeSortValue(a) - getFeeSortValue(b)
          );

          return (
            <article
              key={itemName}
              className="rounded-lg bg-surface p-6 shadow-[0_8px_8px_rgba(0,0,0,0.3)]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                품목
              </p>
              <h3 className="mt-1 text-xl font-bold text-white">
                {itemName}
              </h3>
              <p className="mt-1 text-xs text-subtle">
                규격 정보가 제공되지 않아 금액이 낮은 순으로 정렬했어요
              </p>

              <div className="relative mt-9 flex items-start border-t-2 border-line pt-5">
                {sorted.map((record, index) => (
                  <div
                    key={index}
                    className="relative flex flex-1 flex-col items-center text-center"
                  >
                    <span className="absolute -top-[29px] h-3.5 w-3.5 rounded-full border-4 border-surface bg-accent shadow" />
                    <p className="text-sm font-semibold text-white">
                      {getSizeLabel(index, sorted.length)}
                    </p>
                    <p className="mt-1 text-lg font-bold text-accent">
                      {getFeeLabel(record)}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          );
        }

        // 그 외의 경우 -> 기존 카드 방식 그대로
        return (
          <div key={itemName} className="contents">
            {group.map((record, index) => {
              const specText = getSpec(record);
              return (
                <article
                  key={`${itemName}-${index}`}
                  className="rounded-lg bg-surface p-6 shadow-[0_8px_8px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                        품목
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-white">
                        {itemName}
                      </h3>
                      <p className="mt-1 text-sm text-muted">
                        {specText ? specText : "상세 정보 없음"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-elevated px-5 py-3 text-right">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
                        수수료
                      </p>
                      <p className="mt-1 text-2xl font-bold text-accent">
                        {getFeeLabel(record)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg bg-elevated p-4 text-sm text-muted">
                      <p className="font-semibold text-white">관리기관</p>
                      <p className="mt-1">{getManagingOrg(record)}</p>
                    </div>
                    <div className="rounded-lg bg-elevated p-4 text-sm text-muted">
                      <p className="font-semibold text-white">데이터 기준일</p>
                      <p className="mt-1">{getBaseDate(record)}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
