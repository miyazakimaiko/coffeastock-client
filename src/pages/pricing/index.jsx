import React from 'react';
import { Link } from 'react-router-dom';
import { BsPlusLg } from 'react-icons/bs';
import PublicHeader from '../../components/public-header';
import './pricing.scss';
import PublicFooter from '../../components/public-footer';


const Pricing = () => {


  return (
    <>    
      <div className="h-full w-full font-sans text-xs md:text-sm text-burnt-sienna-darker">
        <PublicHeader />
        <div id="trial-hero" className="flex flex-col justify-center items-center">
          <h1 className="text-5xl tracking-wider pt-6 pb-16">At the cost of a latte per month.</h1>

          <div className="flex justify-center items-center">
            <div className="w-72 mx-2 p-2 bg-white shadow-xl text-center rounded-md">
              <h3 className="text-lg font-semibold my-4 text-deep-green tracking-widest">FREE TRIAL</h3>
              <h2 className="flex flex-col">
                <span className="text-6xl font-bold">$0</span>
                <span className="font-semibold text-opacity-75 text-deep-green my-4"> For 14 days</span>
              </h2>
              <hr className="" />
              <ul className="my-4">
                <li className="pb-2">10 Recipes</li>
                <li className="pb-2">5 Coffee Types</li>
                <li className="pb-2">5 entries per attributes</li>
                <li className="pb-2">No credit card information required</li>
              </ul>
            </div>

            <BsPlusLg className="h-8 w-8"/>

            <div className="w-72 mx-2 p-2 bg-white shadow-xl text-center rounded-md">
              <h3 className="text-lg font-semibold my-4 text-blue tracking-widest">BASIC PLAN</h3>
              <h2 className="flex flex-col">
                <span className="text-6xl font-bold">$4.99</span>
                <span className="font-semibold text-opacity-75 text-blue my-4">Monthly</span>
              </h2>
              <hr className="" />
              <ul className="my-4">
                <li className="pb-2"><span className="font-semibold">Unlimited</span> Recipes</li>
                <li className="pb-2"><span className="font-semibold">Unlimited</span> Coffee Types</li>
                <li className="pb-2"><span className="font-semibold">200</span> entries per attributes</li>
                <li className="pb-2"><span className="font-semibold">No hidden fees</span></li>
              </ul>
            </div>
          </div>

          <Link to="/register">
            <div className="home-btn start-trial-button mt-16">
              Start your 14-day free trial
            </div>
          </Link>
        </div>
        <PublicFooter />
      </div>
    </>
  )
}

export default Pricing
