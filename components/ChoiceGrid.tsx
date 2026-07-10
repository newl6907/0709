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
      <p id={labelId} className="block text-sm font-bold text-white">
        {label}
      </p>
      {options.length === 0 ? (
        <p className="mt-2 text-sm text-subtle">{emptyMessage}</p>
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
                className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-bold transition ${
                  selected
                    ? "border-accent bg-elevated text-white"
                    : "border-transparent bg-elevated text-muted hover:border-line-strong hover:text-white"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-4 w-4 flex-none items-center justify-center rounded-[4px] border-2 ${
                    selected ? "border-accent bg-accent" : "border-line-strong bg-transparent"
                  }`}
                >
                  {selected && (
                    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-black" fill="none">
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
