import React, { useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import BeansAndRecipeImg from '../../assets/images/coffeastock-bean-and-recipe.webp';
import tiltImageOnMouseMove from '../../animation/TiltImageOnMouseMove';

const RecordCoffeeFeat = () => {
  
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo("#record-coffee .left-section", {x:-30, opacity: 0}, {x:0, opacity: 1, delay:0.5, scrollTrigger: {trigger: "#record-coffee .left-section"}}, "<");

    document.addEventListener("mousemove", onMouseMove);
    return(() => {
      document.removeEventListener("mousemove", onMouseMove);
    })
  }, [])

  function onMouseMove(event) {
    tiltImageOnMouseMove("#beans-and-recipe-img", event)
  }

  return (
    <article id="record-coffee" className="flex flex-col lg:flex-row items-center w-full max-w-[1300px] mx-auto mt-32 lg:mt-48">
      <section className="left-section max-w-[680px]">
        <div className="bg-circle-green w-full p-3">
          <img 
            src={BeansAndRecipeImg}
            id="beans-and-recipe-img"
            width="600" height="400"
            alt="coffeastock coffee beans and recipe data"
          />
        </div>
      </section>
      <section className="right-section w-full lg:max-w-[620px] px-4 mt-8 text-center">
        <span className="uppercase font-mono tracking-widest text-deep-green font-medium">1. Organze</span>
        <h2 className="bottom-line-green text-4xl md:text-5xl font-bold md:leading-snug py-5">
          Record Beans Collection and brewing recipes
        </h2>
        <p className="text-base md:text-lg leading-8">
          Let you create your coffee beans collection and add brewing recipes to it.
          <br/>
          You can <strong>create your own list of Origin</strong>, <strong>Variety</strong>, <strong>Process</strong>, <strong>Roaster</strong>,  <strong>Method</strong>, <strong>Water</strong>, and many more attributes <strong>in your own words and language!</strong>
        </p>
      </section>
    </article>
  )
}

export default RecordCoffeeFeat