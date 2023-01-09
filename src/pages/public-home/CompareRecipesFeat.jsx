import React, { useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import CompareRecipesImg from '../../assets/images/coffeastock-compare-recipes.webp';
import tiltImageOnMouseMove from '../../animation/TiltImageOnMouseMove';

const CompareRecipesFeat = () => {
  
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo("#compare-recipes .right-section", {x:30, opacity: 0}, {x:0, opacity: 1, delay:0.5, scrollTrigger: {trigger: "#compare-recipes .right-section"}}, "<");

    document.addEventListener("mousemove", onMouseMove);
    return(() => {
      document.removeEventListener("mousemove", onMouseMove);
    })
  }, [])

  function onMouseMove(event) {
    tiltImageOnMouseMove("#compare-recipes-img", event)
  }

  return (
    <article id="compare-recipes" className="flex flex-col lg:flex-row-reverse items-center w-full max-w-[1300px] mx-auto mt-32 lg:mt-48">
      <section className="right-section max-w-[680px]">
        <div className="bg-circle-orange w-full p-3">
          <img
            src={CompareRecipesImg}
            id="compare-recipes-img"
            width="600" height="400"
            alt="coffeastock compare recipes"
          />
        </div>
      </section>
      <section className="left-section w-full lg:max-w-[620px] px-4 mt-8 text-center">
        <span className="uppercase font-mono tracking-widest text-deep-orange font-medium">4. Analyze</span>
        <h2 className="bottom-line-orange text-4xl md:text-5xl font-bold md:leading-snug py-5">
          Compare recipes to analyze the difference
        </h2>
        <p className="text-base md:text-lg leading-8">
          You can <strong>compare any pair of recipes</strong> and let you analyze the difference between recipes.

        </p>
      </section>
    </article>
  )
}

export default CompareRecipesFeat