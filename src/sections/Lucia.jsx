import { useRef } from "react";
import { gsap, scrollTriggerConfig, smoothScrub, useGSAP } from "../lib/gsap";

const Lucia = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const q = gsap.utils.selector(sectionRef);
    const section = sectionRef.current;
    const secondVideo = document.querySelector('.second-vd');

    gsap.timeline({
      defaults: {
        ease: "power2.out",
      },
      scrollTrigger: scrollTriggerConfig({
        trigger: section,
        start: 'top 80%',
        end: '10% center',
        scrub: smoothScrub(1.15),
      })
    }).to(secondVideo, { autoAlpha: 0, duration: 1 });

    gsap.fromTo(q('.img-box'), {
      y: 70,
    }, {
      y: -190,
      ease: "none",
      scrollTrigger: scrollTriggerConfig({
        trigger: section,
        start: 'top center',
        end: '80% center',
        scrub: smoothScrub(1.25)
      })
    })
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="lucia-life">
      <div className="flex flex-col gap-5 items-end img-box lg:w-1/2 ps-10 mt-96">
        <div className="lucia-1">
          <img src="/images/lucia-1.webp" />
        </div>
        <div className="lucia-3">
          <img src="/images/lucia-3.webp" />
        </div>
      </div>

      <div className="lg:w-1/2 lucia-life-content">
        <div className="max-w-xl lg:ps-32 ps-10">
          <h1>Alia Nassif</h1>
          <h2>Alia built her name shouting against corruption while allegations circled closer daily.</h2>
          <p>Power kept coming at Iraq swinging ever since. Campaigns, committees, and accusations followed her trail; then security raids named her among lawmakers arrested in a corruption sweep, turning her own slogan against her.</p>
        </div>

        <div className="lucia-2">
          <img src="/images/lucia-2.webp" />
        </div>

        <p className="max-w-xl lg:ps-32 ps-10">More than anything, Alia wanted the untouchable life politics can buy — but instead of fighting graft, reports now paint her as another accused player in the same dirty system she once pretended to expose.</p>
      </div>
    </section>
  )
}

export default Lucia
