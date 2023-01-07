import React from 'react';
import { FaHeart } from 'react-icons/fa';

const CustomersVoice = () => {

  return (
    <article id="customers-voice" className="w-full p-4 md:p-10 my-24 md:my-48">
      <FaHeart className="mx-auto mb-16 text-lg text-orange" />
      <section className="quote md:max-w-[800px] mx-auto text-center">
        <p className="text-xl md:text-2xl leading-relaxed md:leading-loose italic">
          I've used many journaling apps for coffee recipes, but Coffeastock is only one that allows me to express exactly how I taste in coffee in my own way. This helps me to analyze how I brewed coffees, so I know what to change for the next time to make it better!<span className="font-medium">- Jessica</span></p>
      </section>
    </article>
  )
}

export default CustomersVoice