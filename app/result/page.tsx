import FeeResultCard from "../../components/FeeResultCard";
import FreePickupBanner from "../../components/FreePickupBanner";
import ClothingBinMap from "../../components/ClothingBinMap";
import ResultPageEvent from "../../components/ResultPageEvent";
import { getClothingBins } from "../../lib/clothing-bins";

export const metadata = {
  title: "우리 동네 버리기 가이드 - 결과",
};

export default async function ResultPage({
  searchParams,
}: {
  searchParams: {
    item?: string;
    sido?: string;
    sigungu?: string;
  };
}) {
  const item = searchParams.item ?? "";
  const sido = searchParams.sido ?? "";
  const sigungu = searchParams.sigungu ?? "";

  const query = new URLSearchParams({
    sido,
    sigungu,
    item,
  });

  const feeResponse = await fetch(`/api/fee-search?${query.toString()}`, {
    cache: "no-store",
  });

  const feeData = await feeResponse.json();
  const records = feeData.items ?? [];
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
          <FeeResultCard records={records} />
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
          <a
            href={`https://www.daangn.com/search/${encodeURIComponent(item || "")}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex h-12 items-center justify-center rounded-2xl bg-amber-500 px-5 text-sm font-semibold text-white transition hover:bg-amber-600"
          >
            당근마켓에서 검색하기
          </a>
        </section>
      </div>
      <ResultPageEvent item={item} sigungu={sigungu} fee={feeSummary} />
    </main>
  );
}
