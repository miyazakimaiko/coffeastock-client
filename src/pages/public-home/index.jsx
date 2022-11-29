import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo-white-bg.png';
import DashboardImg from '../../assets/images/coffeastock-dashboard.jpg';
import MetricsImg from '../../assets/images/coffeastock-metrics.png';
import BeansEntryImg from '../../assets/images/coffeastock-beans-data.jpg';
import RecipeEntryImg from '../../assets/images/coffeastock-recipe-data.jpg';
import RoasterRangeImg from '../../assets/images/coffeastock-edit-ranges.png';
import TasteWheel20Img from '../../assets/images/coffeastock-wheel-20.jpg';
import TasteWheel5Img from '../../assets/images/coffeastock-wheel-5.jpg';
import './public-home.scss';
import FaqAccordion from './FaqAccordion';

const faqs = [
  {
    title: "Is there mobile app available for Android or iOS?",
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
    <div className="max-w-[1500px] mx-auto">    
      <header className="h-16 lg:h-24 w-full max-w-screen-xl mx-auto px-3 flex items-center justify-between">
        <div className="w-44">
          <img src={Logo} alt="Coffeastock" />
        </div>
        <Link to="/register">
          <div 
            className="border-2 border-white text-white md:text-lg shadow-xl
                       blue-button px-6 py-2 rounded-3xl button-transition"
          >
            Go To Web App
          </div>
        </Link>
      </header>

      <main>
        <article id="hero" className="w-full py-10 md:py-16 flex flex-col md:flex-row justify-between bg-circle">          
          <section className="w-[110%] ml-4 md:mx-auto mb-10 block md:hidden">
            <img src={DashboardImg} alt="coffeastock dashboard" className="rounded-lg shadow-2xl" />
          </section>
          <section className="md:min-w-[570px] pl-8 flex flex-col justify-center">
            <h1 className="text-4xl font-bold leading-snug text-burnt-sienna-header pb-2">No more <br/> guessing game <br/> to improve your brewing.</h1>
            <p className="text-lg">Collect, visualize, and analyze your brewing data accurately</p>
            <div className="mr-8 mt-8">
              <Link to="/register">
                <div 
                  className="w-56 border-2 border-orange bg-orange text-white text-center text-lg opacity-80 
                            hover:opacity-100 orange-button px-6 py-2 rounded-3xl button-transition shadow-lg"
                >
                  TRY FOR FREE
                </div>
              </Link>
            </div>
          </section>
          <section className="w-[56rem] min-w-[46rem] hidden md:block">
            <img src={DashboardImg} alt="coffeastock dashboard" className="rounded-lg shadow-2xl" />
          </section>
        </article>

        <article id="dashboard-metrics" className="w-[95%] md:w-[90%] p-4 md:p-10 mt-14 md:mt-32 lg:mt-36 mx-auto flex flex-col-reverse lg:flex-row justify-between bg-green bg-opacity-10 rounded-2xl">
          <section className="min-w-[100%] lg:min-w-[380px] pt-6 pl-0 md:pl-8 flex flex-col justify-center text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold leading-snug text-burnt-sienna-header pb-2">Dashboard metrics <br/> for your coffee data analysis</h2>
            <p className="text-base md:text-lg leading-8 py-4">Displays your activity summaries, recent recipes comparison, beans and recipes rankings. <br/> Discover the tendency of your brewing and the best recipe.</p>
          </section>
          <section>
            <div className="image-section mx-1 md:mx-5 mt-10 lg:m-10">
              <img src={MetricsImg} alt="coffeastock coffee data metrics" />
            </div>
          </section>
        </article>

        <article id="record-coffee-beans" className="w-[95%] md:w-[90%] p-4 md:p-10 mt-10 md:mt-22 lg:mt-24 mx-auto flex flex-col-reverse justify-between bg-orange bg-opacity-10 rounded-2xl">
          <section className="md:min-w-[500px] mt-8 md:mt-12 flex flex-col justify-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold leading-snug text-burnt-sienna-header pb-2">Record coffee beans and recipe data separately</h2>
            <p className="text-base md:text-lg leading-8 py-4">Not only you can record recipes, but also create individual coffee beans entry. <br/> So each recipe can be associated with one of the coffee beans details.</p>
          </section>
          <section className="image-section flex mx-2 md:mx-10">
            <div className="mr-2 lg:mr-8 mt-6">
              <img src={BeansEntryImg} alt="coffeastock coffee beans data" className="rounded-lg shadow-lg" />
            </div>
            <div className="mt-14 lg:mt-20">
              <img src={RecipeEntryImg} alt="coffeastock recipe data" className="rounded-lg shadow-lg" />
            </div>
          </section>
        </article>

        <article id="customize-range" className="w-[95%] md:w-[90%] p-4 md:p-10 mt-10 md:mt-22 lg:mt-24 mx-auto flex flex-col-reverse lg:flex-row-reverse justify-between bg-blue bg-opacity-10 rounded-2xl">
          <section className="min-w-[100%] lg:min-w-[380px] pt-6 flex flex-col justify-center text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold leading-snug text-burnt-sienna-header pb-2">Create your own <br/> beans and recipes attributes</h2>
            <p className="text-base md:text-lg leading-8 py-4">You can create the origin, variety, process, roaster, method, water, and many more attributes in your own words and language.</p>
          </section>
          <section className="mx-2 md:mx-10">
            <div className="image-section mt-5 lg:m-10">
              <img src={RoasterRangeImg} alt="coffeastock custom ranges" />
            </div>
          </section>
        </article>

        <article id="tasting-wheel" className="w-[95%] md:w-[90%] p-4 md:p-10 mt-10 md:mt-22 lg:mt-24 mx-auto flex flex-col-reverse justify-between bg-green bg-opacity-10 rounded-2xl">
          <section className="md:min-w-[500px] mt-8 md:mt-12 flex flex-col justify-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold leading-snug text-burnt-sienna-header pb-2">Up to 20 palate ranges on your tasting wheel</h2>
            <p className="text-base md:text-lg leading-8 py-4">Do you want to record complex tasting profile? Up to 20 custom palates can be attached to a recipe. <br/> Of course, you can go for a smaller wheel if that's too much!</p>
          </section>
          <section className="image-section flex lg:mx-32">
            <div className="mr-2 lg:mr-8 mt-6 lg:mt-10">
              <img src={TasteWheel20Img} alt="coffeastock coffee tasting wheel large" className="rounded-lg shadow-lg" />
            </div>
            <div className="mt-20">
              <img src={TasteWheel5Img} alt="coffeastock coffee tasting wheel small" className="rounded-lg shadow-lg" />
            </div>
          </section>
        </article>

        <article id="customers-voice" className="w-full p-4 md:p-10 mt-16 md:mt-24">
          <section className="quote md:max-w-[800px] mx-auto text-center">
            <p className="text-xl md:text-2xl leading-relaxed md:leading-loose italic">I’ve tried many coffee journal apps. But as a coffee amateur, I used to get overwhelmed when I see so many options to choose from... I felt myself too novice to use the app. Coffeastock is fully customizable, so I can record the recipes with only what I know. <span className="font-medium">- Jessica</span></p>
          </section>
        </article>

        <article id="faq" className="w-[95%] md:max-w-[1000px] p-4 mx-auto mt-16 md:mt-24">
          <h2 className="text-4xl font-semibold text-center mb-8 text-burnt-sienna-header">FAQs</h2>
          <div className="border border-burnt-sienna border-opacity-40 rounded-2xl child-border-bottom">
            {
              faqs.map(faq => (
                <FaqAccordion
                  title={faq.title}
                  textContent={faq.textContent}
                />
              ))
            }
          </div>
        </article>

        <article id="get-started" className="w-full pt-20">
          <section className="md:max-w-[1000px] mx-auto shadow-xl rounded-xl p-10 bg-creme bg-opacity-30">
            <h3 className="text-2xl md:text-3xl font-semibold text-burnt-sienna-header">Get started today</h3>
            <p className="text-md md:text-lg leading-relaxed md:leading-loose">Available on 5 platforms for just $4.16 per month (annual billing). No credit card information required for 30-day free trial.</p>
          </section>
        </article>

      </main>

      <footer>

      </footer>
    </div>
  )
}

export default PublicHome