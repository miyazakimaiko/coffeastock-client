import React from 'react';
import FaqAccordion from './FaqAccordion';

const Faqs = () => {
  
  const faqs = [
    {
      title: "Do I need to download the app on my smartphone or computer?",
      textContent: `No, You don't need to download to use the app. Coffeastock is a web-based software available on browsers, such as Chrome, Microsoft Edge, 
        Safari, Firefox, and Opera. I adopt this form because web apps can constantly evolve on a day-to-day basis, unlike installed software.`
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

  return (
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
  )
}

export default Faqs