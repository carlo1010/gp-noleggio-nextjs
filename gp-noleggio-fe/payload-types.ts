export type Faq = {
  id: string;
  question: string;
  answer?: string | null;
  isActive?: boolean | null;
  order?: number | null;
};
