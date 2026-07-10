import FeeResultCard from "../../components/FeeResultCard";
import FreePickupBanner from "../../components/FreePickupBanner";
import ClothingBinMap from "../../components/ClothingBinMap";
import ResultPageEvent from "../../components/ResultPageEvent";
import DaangnLink from "../../components/DaangnLink";
import { getClothingBins } from "../../lib/clothing-bins";
import { findFeeRecords } from "../../lib/fee-search";

export const metadata = {
  title: "우리 동네 버리기 가이드 - 결과",
};

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<{
    item?: string;
    sido?: string;
    sigungu?: string;
  }>;
}) {
  const params = await searchParams;
  const item = params.item ?? "";
  const sido = params.sido ?? "";
  const sigungu = params.sigungu ?? "";

  let records: Awaited<ReturnType<typeof findFeeRecords>> = [];
  let errorMessage = "";

  if (!item || !sido || !sigungu) {
    errorMessage = "검색어가 올바르지 않습니다. 지역과 품목을 모두 선택한 후 다시 시도해주세요.";
  } else {
    try {
      records = await findFeeRecords(sido, sigungu, item);
    } catch {
      errorMessage = "정적 요금 파일을 읽을 수 없습니다.";
    }
  }

  const feeSummary = String(records[0]?.fee ?? "-");
  const clothingBins = getClothingBins(sido, sigungu);

  return (
    <main className="min-h-screen bg-background py-10 px-4 sm:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <section className="rounded-lg bg-surface p-8 shadow-[0_8px_8px_rgba(0,0,0,0.3)]">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">검색 결과</p>
            <h1 className="mt-2 text-3xl font-bold text-white">
              {item || "품목 없음"} / {sido || "시도 없음"} {sigungu || "시군구 없음"}
            </h1>
          </div>
          {errorMessage ? (
            <div className="rounded-lg bg-elevated p-6 text-negative shadow-[0_8px_8px_rgba(0,0,0,0.3)]">
              {errorMessage}
            </div>
          ) : (
            <FeeResultCard records={records} />
          )}
        </section>

        <FreePickupBanner itemName={item} />

        {item === "의류" ? (
          clothingBins ? (
            <ClothingBinMap bins={clothingBins} />
          ) : (
            <section className="rounded-lg bg-surface p-6 shadow-[0_8px_8px_rgba(0,0,0,0.3)]">
              <p className="text-sm text-muted">
                해당 지역의 의류수거함 데이터가 없습니다. 관할 구청 생활폐기물 안내 페이지를 확인하세요.
              </p>
            </section>
          )
        ) : null}

        <section className="rounded-lg bg-surface p-6 shadow-[0_8px_8px_rgba(0,0,0,0.3)]">
          <p className="text-sm font-bold text-white">당근마켓 나눔</p>
          <p className="mt-2 text-muted">버리기 전에 무료 나눔이 가능한지 확인해보세요.</p>
          <DaangnLink item={item} />
        </section>
      </div>
      <ResultPageEvent item={item} sigungu={sigungu} fee={feeSummary} />
    </main>
  );
}