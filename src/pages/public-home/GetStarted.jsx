import React from 'react';
import { Link } from 'react-router-dom';
import LogoSm from '../../assets/images/logo.png';

const CustomersVoice = () => {

  return (
    <article id="get-started" className="w-full md:pb-20 bg-ash-pink">
      <section className="md:max-w-[1200px] mx-auto">
        <div className="flex flex-col sm:flex-row bg-white p-10 rounded-xl mx-2 shadow-2xl">
          <div className="flex items-center mb-4 sm:mb-0">
            <img 
              src={LogoSm}
              alt="coffeastock logo"
              width="60" height="60"
              className="w-32 mx-auto sm:mr-4"
            />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-burnt-sienna-darker mb-2">Get started today with the beta version</h3>
            <p className="text-md md:text-lg leading-relaxed md:leading-loose mb-4">If registered for the beta version of Coffeastock, you will be eligible to get a lifetime discount on Basic Plan.</p>
            <Link to="/register">
              <div className="w-56 home-btn btn-transition start-trial-button mx-auto sm:mx-0">
                Get Started
              </div>
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}

export default CustomersVoice