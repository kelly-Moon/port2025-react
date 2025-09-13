import React, { useEffect, useRef } from "react";
import { portText } from "../constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Port = () => {
  const horizantalRef = useRef(null);
  const sectionRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const horinzontal = horizantalRef.current;
    const sections = sectionRef.current;

    let scrollTween = gsap.to(sections, {
      xPercent: -120 * sections.length,
      ease: "none",
      scrollTrigger: {
        trigger: horinzontal,
        start: "top 56px",
        end: () => "+=" + horinzontal.offsetWidth,
        pin: true,
        scrub: 1,
        markers: false,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    return () => {
      scrollTween.kill();
    };
  }, []);

  return (
    <section id="port" ref={horizantalRef}>
      <div className="port__inner">
        <h2 className="port__title">
          portfolio <em>포폴 작업물</em>
        </h2>
        <div className="port__wrap">
          {portText.map((port, key) => (
            <article
              className={`port__item p${key + 1}`}
              key={key}
              ref={(el) => (sectionRef.current[key] = el)}
            >
              <span className="num">{port.num}.</span>
              <a
                href={port.code}
                target="_blank"
                className="img"
                rel="noreferrer"
              >
                <img src={port.img} alt={port.name} />
              </a>
              <h3 className="title">{port.title}</h3>
              <p className="desc">{port.desc}</p>
              <a
                href={port.view}
                target="_blank"
                className="site"
                rel="noreferrer noopener"
              >
                사이트 보기
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Port;
