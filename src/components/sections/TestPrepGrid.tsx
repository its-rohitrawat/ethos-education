"use client";

import Link from "next/link";
import { useState } from "react";
import { examCategoryLabels } from "@/content/exams";
import type { ExamCategory } from "@/content/types";
import type { ExamSummary } from "@/content/exams";
import { ChevronIcon } from "@/components/ui/primitives";

type Filter = "all" | ExamCategory;

/** Ten tests as rounded tiles with an accessible category filter. */
export function TestPrepGrid({ exams }: { exams: ExamSummary[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const filters: Filter[] = ["all", "undergraduate", "postgraduate", "business", "english", "subject"];
  const shown = exams.filter((e) => filter === "all" || e.categories.includes(filter));

  return (
    <div>
      <div role="group" aria-label="Filter tests by purpose" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className="min-h-10 rounded-full bg-mist px-4 text-[0.9rem] font-medium text-ink transition-colors hover:bg-cloud aria-pressed:bg-ink aria-pressed:text-canvas"
          >
            {f === "all" ? "All tests" : examCategoryLabels[f]}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} of {exams.length} tests
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {exams.map((exam) => (
          <li key={exam.slug} hidden={!shown.includes(exam)}>
            <Link
              href={exam.path}
              className="group flex h-full min-h-[10.5rem] flex-col rounded-[var(--radius-card)] bg-mist p-5 transition-colors duration-300 hover:bg-cloud"
            >
              <span className="text-xs font-medium text-ink-soft">{examCategoryLabels[exam.categories[0]]}</span>
              <span className="t-card mt-2 !text-[1.6rem]">{exam.name}</span>
              <span className="mt-2 text-[0.875rem] leading-snug text-ink-soft">{exam.tagline}</span>
              <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[0.875rem] font-medium text-brand-bright">
                Prepare <ChevronIcon className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
