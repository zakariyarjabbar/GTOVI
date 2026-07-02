import { useRef } from "react";

import { useMaskSettings } from '../../constants';
import { gsap, scrollTriggerConfig, smoothScrub, useGSAP } from "../lib/gsap";
import ComingSoon from "./ComingSoon"

const Hero = () => {
  const sectionRef = useRef(null);
  const { initialMaskPos, initialMaskSize, maskPos, maskSize } = useMaskSettings();

  useGSAP(() => {
    const q = gsap.utils.selector(sectionRef);

    gsap.set(q('.mask-wrapper'), {
      maskPosition: initialMaskPos,
      maskSize: initialMaskSize,
      willChange: "mask-size, mask-position, opacity",
    });

    gsap.set(q('.mask-logo'), { yPercent: -100, autoAlpha: 0 });

    gsap.set(q('.entrance-message'), { yPercent: 0 });
    gsap.set(q('.scale-out'), { transformOrigin: "center center", willChange: "transform" });

    const tl = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
      },
      scrollTrigger: scrollTriggerConfig({
        trigger: sectionRef.current,
        start: 'top top',
        scrub: smoothScrub(1.6),
        end: '+=200%',
        pin: true,
      })
    })

    tl
      .to(q('.fade-out'), { autoAlpha: 0, duration: 0.75 }, 0)
      .to(q('.scale-out'), { scale: 1, duration: 1.15, ease: 'power2.out' }, 0)
      .to(q('.mask-wrapper'), { maskPosition: maskPos, maskSize, duration: 1.2 }, 0)
      .to(q('.mask-wrapper'), { autoAlpha: 0, duration: 0.35 }, 0.82)
      .to(q('.overlay-logo'), { autoAlpha: 1, duration: 0.35 }, 0.82)
      .to(q('.overlay-logo'), { autoAlpha: 0, duration: 0.35 }, 1.12)
      .to(q('.entrance-message'), {
        duration: 1,
        maskImage: 'radial-gradient(circle at 50% 0vh, black 50%, transparent 100%)',
      }, 0.65)
  }, {
    scope: sectionRef,
    dependencies: [initialMaskPos, initialMaskSize, maskPos, maskSize],
    revertOnUpdate: true,
  });

  return (
    <section ref={sectionRef} className="hero-section">
      <div className="size-full mask-wrapper">
        <img src="/images/hero-bg.webp" alt="background" className="scale-out" />
        <img src="/images/hero-text.webp" alt="hero-logo" className="title-logo fade-out" />
        {/* <img  src="/images/watch-trailer.png" alt="trailer" className="trailer-logo fade-out" /> */}
        {/* <div className="play-img fade-out">
          <img src="/images/play.png" alt="play" className="w-7 ml-1" />
        </div> */}
      </div>

      <div>
        <img src="/images/big-hero-text.svg" alt="logo" className="size-full object-cover mask-logo" />
      </div>

      <div className="fake-logo-wrapper">
        <img src="/images/big-hero-text.svg" className="overlay-logo" />
      </div>

      <ComingSoon />
    </section>
  )
}

export default Hero
