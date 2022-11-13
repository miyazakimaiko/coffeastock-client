import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo-white-bg.png';
import DashboardImg from '../../assets/images/coffeastock-dashboard.jpg';
import './public-home.scss';


const PublicHome = () => {
  return (
    <div className="home bg-circle">    
      <header className="h-16 lg:h-24 w-full max-w-screen-xl mx-auto px-3 flex items-center justify-between">
        <div className="w-44">
          <img src={Logo} alt="Coffeastock" />
        </div>
        <Link to="/register">
          <div 
            className="border-2 border-white text-white font-semibold md:text-lg shadow-xl
                       blue-button px-6 py-2 rounded-3xl button-transition"
          >
            Go To Web App
          </div>
        </Link>
      </header>

      <main className="w-full max-w-[1600px] mx-auto mt-10 flex flex-col md:flex-row justify-between">
        <div className="w-[95%] mx-auto mb-10 block md:hidden">
          <img src={DashboardImg} alt="coffeastock dashboard" className="rounded-lg shadow-2xl" />
        </div>
        <div className="min-w-[570px] pl-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold leading-snug text-burnt-sienna pb-2">No more <br/> guessing game <br/> to improve your brewing.</h1>
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
        </div>
        <div className="w-[56rem] min-w-[46rem] hidden md:block">
          <img src={DashboardImg} alt="coffeastock dashboard" className="rounded-lg shadow-2xl" />
        </div>
      </main>

      <footer>

      </footer>
    </div>
  )
}

export default PublicHome