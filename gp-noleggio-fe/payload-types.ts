export type Media = {
  id: string;
  url?: string | null;
  alt?: string | null;
  filename?: string | null;
};

export type FaqCategory = {
  id: string;
  title: string;
  slug?: string | null;
  order?: number | null;
};

export type Faq = {
  id: string;
  question: string;
  slug?: string | null;
  answer?: string | null;
  category?: string | FaqCategory | null;
  isActive?: boolean | null;
  order?: number | null;
};

export type Post = {
  id: string;
  slug: string;
  kicker: string;
  title: string;
  desc: string;
  cta: string;
  img: string | Media;
  imgAlt: string;
  content?: unknown;
};
