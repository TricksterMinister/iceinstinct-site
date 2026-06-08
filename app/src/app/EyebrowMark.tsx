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

/**
 * The brand cube mark rendered INSIDE the navigation trigger button.
 * The cube IS the menu button site-wide (replaces the old hamburger glyph).
 * The parent <button className="va-trigger"> keeps its class + click wiring,
 * so the open/close behaviour is untouched - only the visual changes.
 * Styled via .va-trigger-mark in cinema.css / cinema-chrome.css.
 */
export function TriggerMark() {
  return (
    <img
      className="va-trigger-mark"
      src={markUrl}
      alt=""
      aria-hidden="true"
      width={34}
      height={34}
      draggable={false}
    />
  );
}
