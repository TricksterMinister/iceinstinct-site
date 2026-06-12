/* ================================================
   videoIdle - autoplay loops only spend power while on screen.
   Tag a looping <video> with data-idle-video and call initVideoIdle()
   once after mount: an IntersectionObserver pauses the loop when it
   leaves the viewport and resumes it when it returns.
   Under prefers-reduced-motion the loop never runs at all - the video
   is stopped and reset so the poster frame holds the frame still.
   Wired from initHomeGsap (home) and useDeepScripts (deep pages).
   ================================================ */

export function initVideoIdle(): () => void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return () => {};
  const videos = Array.from(document.querySelectorAll<HTMLVideoElement>('video[data-idle-video]'));
  if (!videos.length) return () => {};

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    videos.forEach((video) => {
      video.autoplay = false;
      video.removeAttribute('autoplay');
      video.pause();
      // Reload with autoplay off and nothing prefetched: the element resets
      // to its poster frame and the loop never starts.
      video.preload = 'none';
      try {
        video.load();
      } catch {
        /* best effort - the video is paused either way */
      }
    });
    return () => {};
  }

  if (!('IntersectionObserver' in window)) return () => {};
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          if (video.paused) video.play().catch(() => { /* autoplay policy - poster stays */ });
        } else if (!video.paused) {
          video.pause();
        }
      });
    },
    // A little slack so the loop is already rolling as it scrolls into view.
    { rootMargin: '160px 0px' }
  );
  videos.forEach((video) => io.observe(video));
  return () => io.disconnect();
}
