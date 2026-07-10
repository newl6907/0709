import { categoryLabel, type WasteCompany } from "../lib/waste-companies";

export default function WasteCompanyList({ companies }: { companies: WasteCompany[] }) {
  if (companies.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg bg-surface p-6 shadow-[0_8px_8px_rgba(0,0,0,0.3)]">
      <p className="text-sm font-bold text-white">관할 대행업체</p>
      <p className="mt-1 text-sm text-muted">
        생활폐기물 수집·운반 대행업체 현황 (자치구 공개자료 기준)
      </p>
      <div className="mt-4 space-y-3">
        {companies.map((company) => (
          <div key={`${company.name}-${company.phone}`} className="rounded-lg bg-elevated p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-bold text-white">{company.name}</p>
              <a href={`tel:${company.phone}`} className="text-sm font-bold text-accent">
                {company.phone}
              </a>
            </div>
            <p className="mt-1 text-sm text-muted">{company.address}</p>
            {company.categories.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {company.categories.map((code) => (
                  <span
                    key={code}
                    className="rounded-full bg-background px-2 py-0.5 text-xs font-bold text-muted"
                  >
                    {categoryLabel(code)}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
