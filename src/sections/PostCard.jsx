import { useRef } from "react"
import { addVideoScrub, gsap, scrollTriggerConfig, smoothScrub, useGSAP } from "../lib/gsap";

const PostCard = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(() => {
    const q = gsap.utils.selector(sectionRef);

    const tl = gsap.timeline({
      scrollTrigger: scrollTriggerConfig({
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: smoothScrub(1.2),
      })
    })

    gsap.fromTo(q('.animated-gradient-bg'), {
      yPercent: 6,
    }, {
      yPercent: -8,
      ease: "none",
      scrollTrigger: scrollTriggerConfig({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: smoothScrub(1.4),
      })
    })

    return addVideoScrub(tl, videoRef.current, { duration: 3, position: 0 });
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="post-card">
      <div className="animated-gradient-bg" />

      <div className="post-card-wrapper group hover:rotate-1 hover:scale-[1.02] transition duration-700">
        <img src="/images/overlay.webp" />

        <video 
          ref={videoRef}
          muted
          playsInline
          autoPlay
          preload="auto"
          src="/videos/postcard-vd.mp4"
        />

        {/* <button className="group-hover:bg-yellow transation duration-700">
          Explore Leonida Keys
        </button> */}
      </div>
    </section>
  )
}

export default PostCard
