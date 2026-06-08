/**
 * Proof - real client testimonials.
 * Empty by design. The Proof section renders nothing until a real entry is
 * added here. No placeholders, no fabricated reviews.
 */
export type Testimonial = {
  name: string;
  event: string;
  date: string;
  quote: string;
  photo?: string;
};

export const testimonials: Testimonial[] = [];
