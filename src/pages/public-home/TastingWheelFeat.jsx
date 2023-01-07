import React, { useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import TasteWheelsImg from '../../assets/images/coffeastock-wheels.webp';
import tiltImageOnMouseMove from '../../animation/TiltImageOnMouseMove';

const TastingWheelFeat = () => {
  
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo("#tasting-wheel .right-section", {x:30, opacity: 0}, {x:0, opacity: 1, delay:0.5, scrollTrigger: {trigger: "#tasting-wheel .right-section"}}, "<");
  }, [])

  document.addEventListener("mousemove", (event) => {
    tiltImageOnMouseMove("#tasting-wheel-img", event)
  });

  return (
    <article id="tasting-wheel" className="flex flex-col lg:flex-row-reverse items-center w-full max-w-[1300px] mx-auto mt-32 lg:mt-48">
      <section className="right-section max-w-[680px]">
        <div className="bg-circle-pink w-full p-3">
          <img 
            src={TasteWheelsImg}
            id="tasting-wheel-img"
            width="600" height="400"
            alt="coffeastock coffee tasting wheel large"
          />
        </div>
      </section>
      <section className="left-section w-full lg:max-w-[620px] px-4 mt-8 text-center">
        <span className="uppercase font-mono tracking-widest text-pink-red font-medium">2. Record</span>          
        <h2 className="bottom-line-pink text-4xl md:text-5xl font-bold md:leading-snug py-5">
          Log up to 20 palate ranges on your tasting wheel
        </h2>
        <p className="text-base md:text-lg leading-8">
          Do you need to record <strong>complex tasting profile</strong>? Up to <strong>20 custom palates</strong> can be attached to a recipe.
          <br/> 
          Of course, you can go for a smaller wheel if that's too much!
        </p>
      </section>
    </article>
  )
}

export default TastingWheelFeat