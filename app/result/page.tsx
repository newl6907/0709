import FeeResultCard from "../../components/FeeResultCard";
import FreePickupBanner from "../../components/FreePickupBanner";
import ClothingBinMap from "../../components/ClothingBinMap";
import ResultPageEvent from "../../components/ResultPageEvent";
import DaangnLink from "../../components/DaangnLink";
import { getClothingBins } from "../../lib/clothing-bins";

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

  let records = [];
  let errorMessage = "";

  if (!item || !sido || !sigungu) {
    errorMessage = "검색어가 올바르지 않습니다. 지역과 품목을 모두 선택한 후 다시 시도해주세요.";
  } else {
    try {
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
      const feeUrl = new URL("/api/fee-search", siteUrl);
      feeUrl.searchParams.set("sido", sido);
      feeUrl.searchParams.set("sigungu", sigungu);
      feeUrl.searchParams.set("item", item);

      const feeResponse = await fetch(feeUrl, {
        cache: "no-store",
      });

      if (!feeResponse.ok) {
        throw new Error(`요청에 실패했습니다. 상태 코드: ${feeResponse.status}`);
      }

      const feeData = await feeResponse.json();
      records = feeData.items ?? [];
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : "알 수 없는 서버 오류가 발생했습니다.";
    }
  }

  const feeSummary = records[0]?.fee ?? "-";
  const clothingBins = getClothingBins(sido, sigungu);

  return (
    <main className="min-h-screen bg-zinc-50 py-10 px-4 sm:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="mb-6">
            <p className="text-sm font-semibold text-zinc-500">검색 결과</p>
            <h1 className="mt-2 text-3xl font-semibold text-zinc-950">
              {item || "품목 없음"} / {sido || "시도 없음"} {sigungu || "시군구 없음"}
            </h1>
          </div>
          {errorMessage ? (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm">
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
            <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-zinc-600">
                해당 지역의 의류수거함 데이터가 없습니다. 관할 구청 생활폐기물 안내 페이지를 확인하세요.
              </p>
            </section>
          )
        ) : null}

        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-zinc-700">당근마켓 나눔</p>
          <p className="mt-2 text-zinc-600">버리기 전에 무료 나눔이 가능한지 확인해보세요.</p>
          <DaangnLink item={item} />
        </section>
      </div>
      <ResultPageEvent item={item} sigungu={sigungu} fee={feeSummary} />
    </main>
  );
}
