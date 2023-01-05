import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import LogoSm from '../../assets/images/logo.png';
import Logo from '../../assets/images/logo-white-bg.png';
import RecipesImg from '../../assets/images/coffeastock-recipes.png';
import DashboardImg from '../../assets/images/coffeastock-dashboard.png';
import MetricsImg from '../../assets/images/coffeastock-metrics.png';
import BeansAndRecipeImg from '../../assets/images/coffeastock-bean-and-recipe.png';
import CompareRecipesImg from '../../assets/images/coffeastock-compare-recipes.png';
import TasteWheelsImg from '../../assets/images/coffeastock-wheels.png';
import './public-home.scss';
import FaqAccordion from './FaqAccordion';
import PublicFooter from '../../components/public-footer/index.jsx';

const faqs = [
  {
    title: "Do I need to download the app on my smartphone or computer?",
    textContent: `No, You don't need to download to use the app. Coffeastock is available on web/mobile browsers, such as Chrome, Microsoft Edge, 
      Safari, Firefox, and Opera. You can access it from anywhere on the web, it's all in the cloud!`
  },
  {
    title: "When will the beta version end, and what will happen after that?",
    textContent: `Coffeastock is planning to end the beta version on March 2023 or later. At the end of the beta version, users can continue using the app by subscribing to the basic plan.`
  },
  {
    title: "How much the basic subscription will cost?",
    textContent: `Basic subscription is planned to be $6.99/mo (Subject to change), because it costs to run the server and to store the journal data securely. 
    However, for the beta version users, it'll be 20% OFF as they will be eligible to the lifetime discount!`
  },
  {
    title: "What will happen to my account when beta version ends and if I don't subscribe?",
    textContent: `If you don't subscribe after the end of the beta version's life, your account will be deactivated and can't be accessed while deactivated. Your data is kept stored on the server for 6 months and can re-activate your account anytime within 6 months.`
  },
]

const PublicHome = () => {
  return (
    <>
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
              <div className="text-base border-white border-2 shadow-xl px-3 py-2 rounded-md button-transition">
                Sign up
              </div>
            </Link>
          </div>
      </header>
      <main className="text-burnt-sienna-darker">
        <article id="hero" 
          className="w-full max-w-screen-xl mx-auto h-auto md:h-[60vh] min-h-[500px] max-h-[900px] 
          flex flex-col lg:flex-row justify-between px-4"
        >          
          <section className="w-full my-4 block lg:hidden bg-circle">
            <img src={DashboardImg} alt="coffeastock dashboard" className="h-auto w-auto min-w-[600px]"/>
          </section>
          <section className="w-full md:min-w-[660px] flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold md:leading-snug text-burnt-sienna-darker pb-2">
              No more guessing game to improve your brewing.
            </h1>
            <p className="text-lg">Ultimate coffee journal app for Baristas. Collect, visualize, and analyze your brewing data accurately to find your signature recipes for every coffee.</p>
            <div className="mr-8 mt-8">
              <Link to="/register">
                <div className="w-56 home-btn start-trial-button">
                  TRY FOR FREE
                </div>
              </Link>
            </div>
          </section>
          <section className="hidden lg:block bg-circle">
            <img src={DashboardImg} alt="coffeastock dashboard" className="h-auto w-auto min-w-[82rem]" />
          </section>
        </article>

        <article id="about-coffeasatock" className="w-full mt-24 md:mt-80 lg:mt-64 bg-ash-blue p-3">
          <section className="flex flex-col lg:flex-row w-full max-w-[1300px] mx-auto pt-8 pb-24">
            <div>
              <img src={LogoSm} alt="coffeastock logo" className="w-14"/>
              <h2 className="gradient-underline text-white text-4xl md:text-5xl font-bold md:leading-snug py-5">
                <span>We want you to make <i>the most out of your brewing data</i> to make better coffee.
                </span>
              </h2>
              <p className="text-base md:text-lg leading-8">
                Understanding how we are actually brewing is the best way to improve the brewing skills - but when we brew so many cups of coffee, we begin to <strong>"guess"</strong> how we can improve brewing techniques rather than analyzing how we're actually brewing.
                <br/><br/>
                <i>So, <strong>how can we be better at brewing without falling into the guessing game? </strong></i>
              </p>
            </div>
            <div className="flex items-center w-full min-w-[36rem] p-3">
              <img src={RecipesImg} alt="coffeastock recipe list" className="h-auto" />
            </div>
          </section>
          <section id="scroll-down-arrow" className="text-xl flex justify-center">
            <a href="#record-coffee-beans"><span></span>Here are what Coffeastock can do to help you improve...</a>
          </section>
        </article>


        <article id="record-coffee-beans" className="flex flex-col lg:flex-row items-center w-full max-w-[1300px] mx-auto mt-32 lg:mt-48">
          <section className="max-w-[680px]">
            <div className="bg-circle-green w-full p-3">
              <img src={BeansAndRecipeImg} alt="coffeastock coffee beans and recipe data"/>
            </div>
          </section>
          <section className="w-full lg:max-w-[620px] px-4 mt-8 text-center">
            <span className="uppercase font-mono tracking-widest text-green font-medium">1. Organze</span>
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

        <article id="tasting-wheel" className="flex flex-col lg:flex-row-reverse items-center w-full max-w-[1300px] mx-auto mt-32 lg:mt-48">
          <section className="max-w-[680px]">
            <div className="bg-circle-pink w-full p-3">
              <img src={TasteWheelsImg} alt="coffeastock coffee tasting wheel large"/>
            </div>
          </section>
          <section className="w-full lg:max-w-[620px] px-4 mt-8 text-center">
            <span className="uppercase font-mono tracking-widest text-pink font-medium">2. Record</span>          
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

        <article id="dashboard-metrics" className="flex flex-col lg:flex-row items-center w-full max-w-[1300px] mx-auto mt-32 lg:mt-64">
          <section className="max-w-[680px]">
            <div className="bg-circle-blue w-full p-3">
              <img src={MetricsImg} alt="coffeastock coffee data metrics" />
            </div>
          </section>
          <section className="w-full lg:max-w-[620px] px-4 mt-8 text-center">
            <span className="uppercase font-mono tracking-widest text-blue font-medium">3. Discover</span>
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



        <article id="compare-recipes" className="flex flex-col lg:flex-row-reverse items-center w-full max-w-[1300px] mx-auto mt-32 lg:mt-48">
          <section className="max-w-[680px]">
            <div className="bg-circle-orange w-full p-3">
              <img src={CompareRecipesImg} alt="coffeastock compare recipes" />
            </div>
          </section>
          <section className="w-full lg:max-w-[620px] px-4 mt-8 text-center">
            <span className="uppercase font-mono tracking-widest text-orange font-medium">4. Analyze</span>
            <h2 className="bottom-line-orange text-4xl md:text-5xl font-bold md:leading-snug py-5">
              Compare recipes to analyze the difference
            </h2>
            <p className="text-base md:text-lg leading-8">
              You can <strong>compare any pair of recipes</strong> and let you analyze the difference between recipes.

            </p>
          </section>
        </article>

        <article id="customers-voice" className="w-full p-4 md:p-10 my-24 md:my-48">
          <FaHeart className="mx-auto mb-16 text-lg text-orange" />
          <section className="quote md:max-w-[800px] mx-auto text-center">
            <p className="text-xl md:text-2xl leading-relaxed md:leading-loose italic">
              I've used many journaling apps for coffee recipes, but Coffeastock is only one that allows me to express exactly how I taste in coffee in my own way. This helps me to analyze how I brewed coffees, so I know what to change for the next time to make it better!<span className="font-medium">- Jessica</span></p>
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
                <p className="text-md md:text-lg leading-relaxed md:leading-loose mb-4">If registered for the beta version of Coffeastock, you will be eligible to get a lifetime discount on Basic Plan.</p>
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
          <PublicFooter />
        </footer>

      </main>

      <footer>

      </footer>
    </>
  )
}

export default PublicHome