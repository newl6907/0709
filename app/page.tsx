import Link from "next/link";

export default function IntroPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-24">
      {/* 작은 안내 문구 */}
      <p className="text-sm font-bold tracking-wide text-[#E8604A] mb-4">
        가구·가전 버리기 가이드
      </p>

      {/* 큰 제목 */}
      <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 text-center leading-tight mb-8">
        큰 짐{" "}
        <span className="relative inline-block">
          <span
            className="absolute inset-x-0 bottom-1 h-4 sm:h-5 bg-[#E8604A]/25 -rotate-1 rounded-sm"
            aria-hidden="true"
          />
          <span className="relative">수거함</span>
        </span>
      </h1>

      {/* 작은 설명 문구 */}
      <p className="text-base sm:text-lg text-gray-500 text-center leading-relaxed mb-12">
        가구를 버려야 할 때, 어떻게 버릴지 막막하다면?
        <br />
        맞춤 가이드를 알려드릴게요 🪑
      </p>

      {/* CTA 버튼 */}
      <Link
        href="/search"
        className="inline-flex items-center justify-center rounded-full bg-[#E8604A] px-10 py-4 text-base font-bold text-white shadow-lg shadow-[#E8604A]/30 transition-transform hover:scale-105 hover:bg-[#d6543f] active:scale-95"
      >
        지금 버리러 가기
      </Link>
    </main>
  );
}