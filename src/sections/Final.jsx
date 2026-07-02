import { useRef } from "react";
import { addVideoScrub, gsap, scrollTriggerConfig, smoothScrub, useGSAP } from "../lib/gsap";

const Final = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(() => {
    const q = gsap.utils.selector(sectionRef);

    gsap.set(q('.final-content'), { autoAlpha: 0, scale: 1.08, willChange: "opacity, transform" });

    const tl = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
      },
      scrollTrigger: scrollTriggerConfig({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: smoothScrub(1.25),
        pin: true,
      })
    })

    tl.to(q('.final-content'), { autoAlpha: 1, duration: 1, scale: 1 }, 0);

    return addVideoScrub(tl, videoRef.current, { duration: 3.2, position: 0.15 });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="final">
      <div className="final-content size-full">
        <video 
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output3.mp4"
          className="size-full object-cover"
        />
      </div>
    </section>
  )
}

export default Final
