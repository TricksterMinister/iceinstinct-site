// Shared shapes for the Journal. One JournalArticle.tsx shell renders these;
// article text lives in src/data/journal/<slug>.tsx modules, never in copies
// of the page shell.

import type { ReactNode } from 'react';

export type ArticleFaq = {
  q: string;
  a: string;
};

export type ArticleSection = {
  id: string;
  kicker: string;
  title: ReactNode;
  paras: ReactNode[];
};

export type JournalArticleContent = {
  slug: string;
  /** Giant background word behind the hero. */
  ghost: string;
  /** Mono eyebrow above the title, e.g. "Journal / No 01". */
  eyebrow: string;
  title: ReactNode;
  /** One-paragraph standfirst under the title. */
  standfirst: string;
  /** Human-readable date, e.g. "June 10, 2026". */
  date: string;
  /** ISO date mirrored in the Article JSON-LD inside the stub head. */
  dateISO: string;
  readTime: string;
  sections: ArticleSection[];
  /** Rendered as the sitewide FAQ ledger AND mirrored 1:1 in the stub's
      FAQPage JSON-LD. Edit both together. */
  faqs: ArticleFaq[];
  closing: {
    title: ReactNode;
    lead: ReactNode;
    ctaHref: string;
    ctaLabel: string;
  };
};

/** Lightweight metadata for the /journal/ ledger. */
export type JournalIndexEntry = {
  slug: string;
  n: string;
  title: string;
  standfirst: string;
  date: string;
  dateISO: string;
  readTime: string;
};
