import React, { useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import LogoSm from '../../assets/images/logo.png';
import RecipesImg from '../../assets/images/coffeastock-recipes.webp';
import separateLetters from '../../helpers/SeparateLettersForAnimation';



const About = () => {
  
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const words = document.querySelectorAll("#aboutTitle .words");
    separateLetters(words);
    gsap.set("#aboutTitle .letter", {display: "inline-block"});

    gsap.fromTo("#aboutTitle .letter", {y: '100%'}, {scrollTrigger: {trigger: "#aboutTitle"}, y: -4, stagger: 0.02});
    gsap.fromTo("#aboutImg", {x:-30, opacity: 0}, {x:0, opacity: 1, delay:0.5, scrollTrigger: {trigger: "#aboutImg"}}, "<");
    gsap.fromTo("#aboutText", {y:30, opacity: 0}, {y:0, opacity: 1, delay:0.5, scrollTrigger: {trigger: "#aboutImg"}}, "<");
  }, [])

  return (
    <article id="about-coffeasatock" className="w-full mt-24 md:mt-80 lg:mt-64 bg-ash-blue p-3">
      <section className="flex flex-col lg:flex-row w-full max-w-[1300px] mx-auto pt-8  pb-16">
        <div className="flex md:justify-end md:items-center w-full min-w-[36rem] p-3">
          <img 
            src={RecipesImg} 
            alt="coffeastock recipe list"
            width="600" height="400"
            className="h-auto min-w-[42rem]"
            id="aboutImg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <img 
            src={LogoSm} 
            alt="coffeastock logo"
            width="60" height="60"
            className="w-14"
          />
          <h2 
            className="text-4xl md:text-5xl font-bold md:leading-snug py-5 flex flex-wrap"
            id="aboutTitle"
          >
            <span className="words block overflow-hidden">Be</span>
            <span className="w-2 md:w-3"> </span>
            <span className="words block overflow-hidden">a</span>
            <span className="w-2 md:w-3"> </span>
            <span className="words block overflow-hidden">better</span>
            <span className="w-2 md:w-3"> </span>
            <span className="words block overflow-hidden">Barista</span>
            <span className="w-2 md:w-3"> </span>
            <span className="words block overflow-hidden">by</span>
            <span className="w-2 md:w-3"> </span>
            <span className="words block overflow-hidden">analyzing</span>
            <span className="w-2 md:w-3"> </span>
            <span className="words block overflow-hidden">recipes</span>
            <span className="w-2 md:w-3"> </span>
            <span className="words block overflow-hidden">accurately.</span>
          </h2>
          <p 
            className="text-base md:text-lg leading-8"
            id="aboutText"
          >
            Understanding how we are actually brewing is the best way to improve the brewing skills - but when we brew so many cups of coffee, we begin to <strong>"guess"</strong> how we can improve brewing techniques rather than analyzing how we're actually brewing.
          </p>
        </div>
      </section>
      <section id="scroll-down-arrow" className="gradient-underline text-xl flex justify-center">
        <a href="#record-coffee"><span></span><strong>Coffeastock has everything to analyze your brewing.</strong></a>
      </section>
    </article>
  )
}

export default About