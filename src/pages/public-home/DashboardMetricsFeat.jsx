import React, { useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import MetricsImg from '../../assets/images/coffeastock-metrics.webp';
import tiltImageOnMouseMove from '../../animation/TiltImageOnMouseMove';

const DashboardMetricsFeat = () => {
  
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo("#dashboard-metrics .left-section", {x:-30, opacity: 0}, {x:0, opacity: 1, delay:0.5, scrollTrigger: {trigger: "#dashboard-metrics .left-section"}}, "<");

    document.addEventListener("mousemove", onMouseMove);
    return(() => {
      document.removeEventListener("mousemove", onMouseMove);
    })
  }, [])

  function onMouseMove(event) {
    tiltImageOnMouseMove("#dashboard-metric-img", event)
  }

  return (
    <article id="dashboard-metrics" className="flex flex-col lg:flex-row items-center w-full max-w-[1300px] mx-auto mt-32 lg:mt-64">
      <section className="left-section max-w-[680px]">
        <div className="bg-circle-blue w-full p-3">
          <img 
            src={MetricsImg}
            id="dashboard-metric-img"
            width="600" height="400"
            alt="coffeastock coffee data metrics"
          />
        </div>
      </section>
      <section className="right-section w-full lg:max-w-[620px] px-4 mt-8 text-center">
        <span className="uppercase font-mono tracking-widest text-deep-blue font-medium">3. Discover</span>
        <h2 className="bottom-line-blue text-4xl md:text-5xl font-bold md:leading-snug py-5">
          Dashboard metrics for your coffee data analysis
        </h2>
        <p className="text-base md:text-lg leading-8">
          Coffeastock dashboard displays your <strong>activity summaries</strong>, <strong>recent recipes comparison</strong>, <strong>beans and recipes rankings</strong>.
          <br/>
          Discover the tendency of your brewing and the best recipe.
        </p>
      </section>
    </article>
  )
}

export default DashboardMetricsFeat