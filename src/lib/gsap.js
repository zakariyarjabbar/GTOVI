import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

gsap.config({
  nullTargetWarn: false,
});

gsap.defaults({
  duration: 1,
  ease: "power2.inOut",
});

ScrollTrigger.config({
  ignoreMobileResize: true,
});

ScrollTrigger.defaults({
  anticipatePin: 1,
});

export const smoothScrub = (seconds = 1.25) => seconds;

export const scrollTriggerConfig = (config) => ({
  invalidateOnRefresh: true,
  fastScrollEnd: true,
  ...config,
});

export const addVideoScrub = (
  timeline,
  video,
  { duration = 3, position = "<" } = {},
) => {
  let tween;

  const createScrubTween = () => {
    if (!video || tween || !Number.isFinite(video.duration) || video.duration <= 0) {
      return;
    }

    tween = timeline.to(
      video,
      {
        currentTime: video.duration,
        duration,
        ease: "none",
      },
      position,
    );

    ScrollTrigger.refresh();
  };

  if (video?.readyState >= 1) {
    createScrubTween();
  } else {
    video?.addEventListener("loadedmetadata", createScrubTween, { once: true });
  }

  return () => {
    video?.removeEventListener("loadedmetadata", createScrubTween);
    tween?.kill();
  };
};

if (typeof window !== "undefined") {
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger, useGSAP };
