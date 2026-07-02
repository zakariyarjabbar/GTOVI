import { useRef } from "react";
import { addVideoScrub, gsap, scrollTriggerConfig, smoothScrub, useGSAP } from "../lib/gsap";

const SecondVideo = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;

    gsap.set(section, { autoAlpha: 0, willChange: "opacity" });

    const tl = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
      },
      scrollTrigger: scrollTriggerConfig({
        trigger: section,
        start: 'top top',
        end: '+=200%',
        scrub: smoothScrub(1.35),
        pin: true
      })
    })

    tl.to(section, { autoAlpha: 1, duration: 0.85 }, 0)

    return addVideoScrub(tl, videoRef.current, { duration: 3.2, position: 0.05 });
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="lucia">
      <div className="h-dvh">
        <video 
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output2.mp4"
          className="size-full object-cover second-vd"
          style={{ 
            objectPosition: '15% 0%' 
          }}
        />
      </div>
    </section>
  )
}

export default SecondVideo
