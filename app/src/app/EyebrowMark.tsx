import markUrl from '../assets/ii-mark.png';

/**
 * The brand mark image used inside the overlay-menu eyebrow lockup.
 * Sits to the left of the "Ice & Instinct / ..." wordmark across every page so
 * the header lockup is mark + wordmark. Styled via .va-eyebrow-mark in cinema.css.
 */
export function EyebrowMark() {
  return (
    <img
      className="va-eyebrow-mark"
      src={markUrl}
      alt="Ice and Instinct"
      width={28}
      height={28}
    />
  );
}
