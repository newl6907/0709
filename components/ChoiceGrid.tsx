"use client";

type ChoiceGridProps = {
  id: string;
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  emptyMessage?: string;
};

export default function ChoiceGrid({
  id,
  label,
  name,
  options,
  value,
  onChange,
  emptyMessage = "선택 가능한 항목이 없습니다.",
}: ChoiceGridProps) {
  const labelId = `${id}-label`;

  return (
    <div>
      <p id={labelId} className="block text-sm font-semibold text-zinc-700">
        {label}
      </p>
      {options.length === 0 ? (
        <p className="mt-2 text-sm text-zinc-400">{emptyMessage}</p>
      ) : (
        <div role="radiogroup" aria-labelledby={labelId} className="mt-2 flex flex-wrap gap-2">
          {options.map((option) => {
            const selected = option === value;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onChange(selected ? "" : option)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                  selected
                    ? "border-[#E8604A] bg-[#FDECE8] text-[#C94B37]"
                    : "border-zinc-300 bg-zinc-50 text-zinc-700 hover:border-[#E8604A] hover:text-[#C94B37]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-4 w-4 flex-none items-center justify-center rounded border-2 ${
                    selected ? "border-[#E8604A] bg-[#E8604A]" : "border-zinc-300 bg-white"
                  }`}
                >
                  {selected && (
                    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-white" fill="none">
                      <path
                        d="M2 6l2.5 2.5L10 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      )}
      <input type="hidden" name={name} value={value} />
    </div>
  );
}
