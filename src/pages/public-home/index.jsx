import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import LogoSm from '../../assets/images/logo.png';
import Logo from '../../assets/images/logo-white-bg.png';
import GifImg from '../../assets/images/coffeastock-gif-placeholder.png';
import DashboardImg from '../../assets/images/coffeastock-dashboard.jpg';
import MetricsImg from '../../assets/images/coffeastock-metrics.png';
import BeansAndRecipeImg from '../../assets/images/coffeastock-bean-and-recipe.png';
import RoasterRangeImg from '../../assets/images/coffeastock-edit-ranges.png';
import TasteWheelsImg from '../../assets/images/coffeastock-wheels.png';
import './public-home.scss';
import FaqAccordion from './FaqAccordion';

const faqs = [
  {
    title: "Is there Coffeastock mobile app for Android or iOS?",
    textContent: `No, currently Coffeastock is only available on web/mobile browsers, such as Chrome, Microsoft Edge, 
      Safari, Firefox, and Opera. That means we don't use your devices storage, it's all in the cloud.`
  },
  {
    title: "Is there mobile app available for Android or iOS?",
    textContent: `Currently Coffeastock is only available on web/mobile browsers, such as Chrome, Microsoft Edge, 
      Safari, Firefox, and Opera. That means we don't use your devices storage, it's all in the cloud.`
  },
  {
    title: "Is there mobile app available for Android or iOS?",
    textContent: `Currently Coffeastock is only available on web/mobile browsers, such as Chrome, Microsoft Edge, 
      Safari, Firefox, and Opera. That means we don't use your devices storage, it's all in the cloud.`
  },
]

const PublicHome = () => {
  return (
    <div className="">    
      <header className="h-16 lg:h-24 w-full max-w-screen-xl mx-auto px-3 flex items-center justify-between text-white">
        <div className="w-44">
          <Link to="/">
            <img src={Logo} alt="Coffeastock" />
          </Link>
        </div>
        <div className="flex items-center">
            <Link to="/login" className="text-sm mr-4">
                Sign in
            </Link>
            <Link to="/register">
              <div className="border text-base border-white text-white shadow-xl px-3 py-2 rounded-md button-transition">
                Sign up
              </div>
            </Link>
          </div>
      </header>

      <main>
        <article id="hero" 
          className="w-full max-w-screen-xl mx-auto h-auto md:h-[60vh] min-h-[500px] max-h-[900px] flex flex-col md:flex-row justify-between items-center bg-circle"
        >          
          <section className="w-[110%] ml-4 md:mx-auto mb-10 block md:hidden">
            <img src={DashboardImg} alt="coffeastock dashboard" className="rounded-lg shadow-2xl" />
          </section>
          <section className="md:min-w-[530px] pl-8 flex flex-col justify-center">
            <h1 className="text-5xl font-bold leading-snug text-burnt-sienna-darker pb-2">No more <br/> guessing game <br/> to improve your brewing.</h1>
            <p className="text-lg">Collect, visualize, and analyze your brewing data accurately</p>
            <div className="mr-8 mt-8">
              <Link to="/register">
                <div className="w-56 home-btn start-trial-button">
                  TRY FOR FREE
                </div>
              </Link>
            </div>
          </section>
          <section className="w-full min-w-[56rem] hidden md:block">
            <img src={DashboardImg} alt="coffeastock dashboard" className="rounded-lg shadow-2xl" />
          </section>
        </article>

        <article id="about-coffeasatock" className="w-full mt-28 sm:mt-40 bg-ash-blue">
          <div className="flex flex-col lg:flex-row w-full max-w-[1200px] mx-auto pt-8 lg:pt-24 pb-28">
            <section className="p-3">
              <img src={LogoSm} alt="coffeastock logo" className="w-14"/>
              <h2 className="gradient-underline text-white text-4xl md:text-5xl font-bold leading-snug py-5">
                <span>Designed to make<br/>the most out of your brewing data</span>
              </h2>
              <p className="text-base md:text-lg leading-8 py-4">
                Get a central workspace to accumulate and analyze your brewing methods. 
                Understanding how you are actually brewing is the best way to improve the brewing skills.
              </p>
            </section>
            <section className="flex w-full lg:max-w-[690px] p-3">
              <img src={GifImg} alt="coffeastock gif" className="rounded-lg shadow-2xl" />
            </section>
          </div>
        </article>

        <article id="dashboard-metrics" className="flex flex-col lg:flex-row items-center w-full max-w-[1300px] mx-auto mt-32">
          <section>
            <div className="bg-circle-orange w-full p-3">
              <img src={MetricsImg} alt="coffeastock coffee data metrics" />
            </div>
          </section>
          <section className="w-full lg:max-w-[520px] px-8 mt-12">
            <span className="uppercase font-mono tracking-widest text-orange font-medium">Analyze</span>
            <h2 className="bottom-line-orange text-4xl md:text-5xl font-bold leading-snug py-5">
              Dashboard metrics <br/> for your coffee data analysis
            </h2>
            <p className="text-base md:text-lg leading-8 py-4">
              Coffeastock dashboard displays your activity summaries, recent recipes comparison, beans and recipes rankings.
              <br/>
              Discover the tendency of your brewing and the best recipe.
            </p>
          </section>
        </article>

        <article id="record-coffee-beans" className="flex flex-col lg:flex-row-reverse items-center w-full max-w-[1300px] mx-auto mt-32">
          <section>
            <div className="bg-circle-green w-full p-3">
              <img src={BeansAndRecipeImg} alt="coffeastock coffee beans and recipe data"/>
            </div>
          </section>
          <section className="w-full lg:max-w-[520px] px-8 mt-12">
            <span className="uppercase font-mono tracking-widest text-green font-medium">Organze</span>
            <h2 className="bottom-line-green text-4xl md:text-5xl font-bold leading-snug py-5">
              Record coffee beans and recipe data separately
            </h2>
            <p className="text-base md:text-lg leading-8 py-4">
              Not only you can record recipes, but also create individual coffee beans entry.
              <br/>
              So each recipe can be associated with one of the coffee beans details.
            </p>
          </section>
        </article>

        <article id="customize-range" className="flex flex-col lg:flex-row items-center w-full max-w-[1300px] mx-auto mt-32">
          <section>
            <div className="bg-circle-pink w-full p-3">
              <img src={RoasterRangeImg} alt="coffeastock custom ranges" />
            </div>
          </section>
          <section className="w-full lg:max-w-[520px] px-8 mt-12">
            <span className="uppercase font-mono tracking-widest text-pink font-medium">Customize</span>
            <h2 className="bottom-line-pink text-4xl md:text-5xl font-bold leading-snug py-5">
              Create your own <br/> beans and recipes attributes
            </h2>
            <p className="text-base md:text-lg leading-8 py-4">
              You can create the origin, variety, process, roaster, method, water, and many more attributes 
              in your own words and language.
            </p>
          </section>
        </article>

        <article id="tasting-wheel" className="flex flex-col lg:flex-row-reverse items-center w-full max-w-[1300px] mx-auto mt-32">
          <section>
            <div className="bg-circle-blue w-full p-3">
              <img src={TasteWheelsImg} alt="coffeastock coffee tasting wheel large"/>
            </div>
          </section>
          <section className="w-full lg:max-w-[520px] px-8 mt-12">
            <span className="uppercase font-mono tracking-widest text-ash-blue font-medium">Record</span>          
            <h2 className="bottom-line-blue text-4xl md:text-5xl font-bold leading-snug py-5">
              Up to 20 palate ranges on your tasting wheel
            </h2>
            <p className="text-base md:text-lg leading-8 py-4">
              Do you want to record complex tasting profile? Up to 20 custom palates can be attached to a recipe.
              <br/> 
              Of course, you can go for a smaller wheel if that's too much!
            </p>
          </section>
        </article>

        <article id="customers-voice" className="w-full p-4 md:p-10 mt-10 md:mt-24">
          <FaHeart className="mx-auto mb-16 text-lg text-orange" />
          <section className="quote md:max-w-[800px] mx-auto text-center">
            <p className="text-xl md:text-2xl leading-relaxed md:leading-loose italic">I’ve tried many coffee journal apps. But as a coffee amateur, I used to get overwhelmed when I see so many options to choose from... I felt myself too novice to use the app. Coffeastock is fully customizable, so I can record the recipes with only what I know. <span className="font-medium">- Jessica</span></p>
          </section>
        </article>

        <article id="faq" className="w-full mt-40 bg-ash-pink">
          <div className="flex flex-col w-full max-w-[1200px] mx-auto py-16 lg:pt-24 md:pb-28">
            <h2 className="text-4xl font-semibold text-center mb-8 text-burnt-sienna-darker">FAQs</h2>
            <div className="border border-burnt-sienna border-opacity-40 rounded-2xl child-border-bottom mx-2">
              {
                faqs.map(faq => (
                  <FaqAccordion
                    title={faq.title}
                    textContent={faq.textContent}
                  />
                ))
              }
            </div>
          </div>
        </article>

        <article id="get-started" className="w-full md:pb-20 bg-ash-pink">
          <section className="md:max-w-[1200px] mx-auto">
            <div className="flex flex-col sm:flex-row bg-white p-10 rounded-xl mx-2 shadow-2xl">
              <div className="flex items-center mb-4 sm:mb-0">
                <img src={LogoSm} alt="coffeastock logo" className="w-32 mx-auto sm:mr-4"/>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold text-burnt-sienna-darker mb-2">Get started today with the beta version</h3>
                <p className="text-md md:text-lg leading-relaxed md:leading-loose mb-4">If registered for the beta version of Coffeastock, you will be eligible to get a lifetime discount on Premium.</p>
                <Link to="/register">
                  <div className="w-56 home-btn start-trial-button mx-auto sm:mx-0">
                    Get Started
                  </div>
                </Link>
              </div>
            </div>
          </section>
        </article>

        <footer className="bg-ash-pink">
          <div className="flex justify-between flex-wrap w-full max-w-screen-xl mx-auto p-10">
            <div>
              <Link to="/">Terms of Use</Link>
              <span className="px-2">|</span>
              <Link to="/">Privacy Policy</Link>
              <span className="px-2">|</span>
              <Link to="/">Contact</Link>
              <span className="px-2">|</span>
              <Link to="/">Linkedin</Link>
            </div>
            <div>
              <Link to="/">© {new Date().getFullYear()} Coffeastock</Link>
            </div>
          </div>
        </footer>

      </main>

      <footer>

      </footer>
    </div>
  )
}

export default PublicHome