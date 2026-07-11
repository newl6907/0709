import Link from "next/link";

export default function IntroPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-24">
      {/* 작은 안내 문구 */}
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted mb-4">
        우리집 큰 짐도, 큰 고민도
      </p>

      {/* 큰 제목 */}
      <h1 className="text-5xl sm:text-6xl font-bold text-white text-center leading-tight mb-8">
        <span className="relative inline-block">
          <span
            className="absolute inset-x-0 bottom-1 h-4 sm:h-5 bg-accent/25 -rotate-1 rounded-sm"
            aria-hidden="true"
          />
          <span className="relative">큰 짐</span>
        </span>{" "}
        덜자
      </h1>

      {/* 작은 설명 문구 */}
      <p className="text-base sm:text-lg text-muted text-center leading-relaxed mb-12">
        가구를 버려야 할 때, 어떻게 버릴지 막막하다면?
        <br />
        맞춤 가이드를 알려드릴게요 🪑
      </p>

      {/* CTA 버튼 */}
      <Link
        href="/search"
        className="inline-flex items-center justify-center rounded-full bg-accent px-10 py-4 text-sm font-bold uppercase tracking-[0.14em] text-black shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 hover:bg-accent-strong active:scale-95"
      >
        지금 버리러 가기
      </Link>
    </main>
  );
}