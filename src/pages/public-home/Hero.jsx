import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import DashboardImg from '../../assets/images/coffeastock-dashboard.webp';
import separateLetters from '../../helpers/SeparateLettersForAnimation';



const Hero = () => {
  const heroTimeline = gsap.timeline({
    defaults: {
      ease: "Power3.easeInOut",
    },
    paused: true,
    delay: 0.8,
  });

  document.addEventListener("readystatechange", (event) => {
    if (document.readyState === "complete") {
      heroTimeline.play();
    }
  });

  useLayoutEffect(() => {
    const words = document.querySelectorAll("#heroTitle .words");
    separateLetters(words);
    gsap.set("#heroTitle .letter", {display: "inline-block"});
    heroTimeline.fromTo("#heroTitle .letter", {y: '100%'}, {y: -4, stagger: 0.02}, "<");
    heroTimeline.fromTo("#heroImgLg", {x:30, opacity: 0}, {x:0, opacity: 1}, "<0.5");
    heroTimeline.fromTo("#heroImgSm", {x:30, opacity: 0}, {x:0, opacity: 1}, "<");
    heroTimeline.fromTo("#heroText", {y:20, opacity: 0}, {y:0, opacity: 1}, "<");
    if (document.readyState === "complete") {
      heroTimeline.play();
    }
  }, [])

  return (
    <article id="hero" 
      className="w-full max-w-screen-xl mx-auto h-auto md:h-[80vh] 
      flex flex-col lg:flex-row justify-between px-4"
    >          
      <section className="w-full my-4 block lg:hidden bg-circle">
        <img 
          src={DashboardImg} 
          alt="coffeastock dashboard" 
          width="600" height="400"
          className="h-auto w-auto min-w-[600px]"
          id="heroImgSm"
        />
      </section>
      <section className="w-full md:min-w-[660px] flex flex-col justify-center">
        <h1 
          id="heroTitle"
          className="text-4xl md:text-6xl font-bold md:leading-snug text-burnt-sienna-darker pb-6 flex flex-wrap"
        >
          <span className="words block overflow-hidden">No</span>
          <span className="w-2 md:w-3"> </span>
          <span className="words block overflow-hidden">more</span>
          <span className="w-2 md:w-3"> </span>
          <span className="words block overflow-hidden">guessing</span>
          <span className="w-2 md:w-3"> </span>
          <span className="words block overflow-hidden">game</span>
          <span className="w-2 md:w-3"> </span>
          <span className="words block overflow-hidden">to</span>
          <span className="w-2 md:w-3"> </span>
          <span className="words block overflow-hidden">improve</span>
          <span className="w-2 md:w-3"> </span>
          <span className="words block overflow-hidden">your</span>
          <span className="w-2 md:w-3"> </span>
          <span className="words block overflow-hidden">brewing.</span>
        </h1>
        <p 
          id="heroText"
          className="text-lg"
        >
          Ultimate coffee journal app for Baristas. Collect, visualize, and analyze your brewing data accurately to find your signature recipe for every coffee.
        </p>
        <div className="mr-8 mt-8">
          <Link to="/register">
            <div className="w-56 home-btn start-trial-button">
              TRY FOR FREE
            </div>
          </Link>
        </div>
      </section>
      <section className="hidden lg:block bg-circle">
        <img 
          src={DashboardImg} 
          alt="coffeastock dashboard"
          width="600" height="400"
          className="h-auto w-auto min-w-[82rem]"
          id="heroImgLg"
        />
      </section>
    </article>
  )
}

export default Hero