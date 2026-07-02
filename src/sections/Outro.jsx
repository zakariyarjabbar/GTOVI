import { useRef } from "react"
import { gsap, scrollTriggerConfig, smoothScrub, useGSAP } from "../lib/gsap"

const Outro = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const finalContent = document.querySelector('.final-content');

    gsap.set(sectionRef.current, { autoAlpha: 0, willChange: "opacity" })

    const tl = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
      },
      scrollTrigger: scrollTriggerConfig({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: smoothScrub(1.2),
      })
    })

    tl.to(finalContent, { autoAlpha: 0, duration: 1 }, 0)
    tl.to(sectionRef.current, { autoAlpha: 1, duration: 1 }, 0.15)
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="final-message">
      <div className="h-full col-center gap-10">
        <img src="/images/logo.webp" alt="logo" className="md:w-72 w-52" />

        <div>
          <h3 className="gradient-title">
            Coming <br /> Nov 19th <br /> 3026
          </h3>
        </div>

        <div className="flex-center gap-10">
          {/* <img src="/images/ps-logo.svg" className="md:w-32 w-20" /> */}
          {/* <img src="/images/x-logo.svg" className="md:w-52 w-40" /> */}
        </div>
      </div>
    </section>
  )
}

export default Outro
