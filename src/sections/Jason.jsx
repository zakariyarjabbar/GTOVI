import { useRef } from "react"
import { gsap, scrollTriggerConfig, smoothScrub, useGSAP } from "../lib/gsap"

const Jason = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const q = gsap.utils.selector(sectionRef);
    const section = sectionRef.current;
    const firstVideo = document.querySelector('.first-vd');

    gsap.timeline({
      defaults: {
        ease: "power2.out",
      },
      scrollTrigger: scrollTriggerConfig({
        trigger: section,
        start: 'top 90%',
        end: '10% center',
        scrub: smoothScrub(1.15),
      })
    }).to(firstVideo, { autoAlpha: 0, duration: 1 });

    gsap.fromTo(q('.img-box'), {
      y: 80,
    }, {
      y: -240,
      ease: "none",
      scrollTrigger: scrollTriggerConfig({
        trigger: section,
        start: 'top center',
        end: '80% center',
        scrub: smoothScrub(1.25)
      })
    })
  }, { scope: sectionRef }) 

  return (
    <section ref={sectionRef} className="jason">
      <div className="max-w-lg jason-content">
        <h1>Adnan AlJumaili</h1>
        <h2>Adnan wants respect, but nobody trusts a famous snitch.</h2>
        <p>Adnan learned early that secrets are worth more than loyalty. After years moving through dirty deals and corrupt circles, he found safety by exposing the same people he once stood beside. In the Green Zone, everyone smiles — but no one forgets who talked.</p>

        <div className="jason-2">
          <img src="/images/jason-2.webp" />
        </div>
      </div>

      <div className="space-y-5 mt-96 img-box">
        <div className="jason-1">
          <img src="/images/jason-1.webp" />
        </div>
        <div className="jason-3">
          <img src="/images/jason-3.webp" />
        </div>
      </div>
    </section>
  )
}

export default Jason
