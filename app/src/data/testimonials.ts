/**
 * Proof - real client testimonials.
 * Only real, public, verifiable reviews. No placeholders, no fabricated
 * reviews. The Proof section renders nothing when this array is empty.
 */
export type Testimonial = {
  name: string;
  event: string;
  date: string;
  quote: string;
  rating?: number;
  photo?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Tom R.',
    event: 'Verified Google review',
    date: '2025',
    rating: 5,
    quote:
      'This mixology spot is seriously insane. Best night out in a minute. The drinks are legit fire and the whole vibe is next level.',
  },
];
