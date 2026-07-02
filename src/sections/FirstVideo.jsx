import { useRef } from "react"
import { addVideoScrub, gsap, scrollTriggerConfig, smoothScrub, useGSAP } from "../lib/gsap";

const FirstVideo = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const heroSection = document.querySelector('.hero-section');

    gsap.set(section, { autoAlpha: 0, willChange: "opacity" });

    const tl = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
      },
      scrollTrigger: scrollTriggerConfig({
        trigger: section,
        start: 'top top',
        end: '+=220%',
        scrub: smoothScrub(1.25),
        pin: true,
      })
    })

    if (heroSection) {
      tl.to(heroSection, { autoAlpha: 0, duration: 0.75 }, 0.15);
    }

    tl.to(section, { autoAlpha: 1, duration: 1 }, 0.2);

    return addVideoScrub(tl, videoRef.current, { duration: 3.2, position: 0.25 });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="first-vd-wrapper">
      <div className="h-dvh">
        <video 
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output1.mp4"
          className="first-vd"
        />
      </div>
    </section>
  )
}

export default FirstVideo
