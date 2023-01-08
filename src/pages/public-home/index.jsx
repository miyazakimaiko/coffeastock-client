import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo-white-bg.png';
import './public-home.scss';

const HeroComponent = lazy(() => import('./Hero'));
const AboutComponent = lazy(() => import('./About'));
const RecordCoffeeComponent = lazy(() => import('./RecordCoffeeFeat'));
const TastingWheelComponent = lazy(() => import('./TastingWheelFeat'));
const DashboardMetricsComponent = lazy(() => import('./DashboardMetricsFeat'));
const CompareRecipesComponent = lazy(() => import('./CompareRecipesFeat'));
const CustomersVoiceComponent = lazy(() => import('./CustomersVoice'));
const FaqsComponent = lazy(() => import('./Faqs'));
const GetStartedComponent = lazy(() => import('./GetStarted'));
const FooterComponent = lazy(() => import('./Footer'));

const PublicHome = () => {
  const renderLoader = () => <></>;

  return (
    <>
      <header className="h-16 lg:h-24 w-full max-w-screen-xl mx-auto px-3 flex items-center justify-between text-white">
        <div className="w-44">
          <Link to="/">
            <img 
              src={Logo}
              width="200" height="40"
              alt="Coffeastock"
            />
          </Link>
        </div>
        <div className="flex items-center">
            <Link to="/login" className="text-sm mr-4">
                Sign in
            </Link>
            <Link to="/register">
              <div className="text-base font-bold text-pink-red bg-white shadow-xl px-3 py-2 rounded-md btn-transition signup-btn">
                Sign up
              </div>
            </Link>
          </div>
      </header>
      <main className="text-burnt-sienna-darker">
        <Suspense fallback={renderLoader()}>
          <HeroComponent />
          <AboutComponent />
          <RecordCoffeeComponent />
          <TastingWheelComponent />
          <DashboardMetricsComponent />
          <CompareRecipesComponent />
          <CustomersVoiceComponent />
          <FaqsComponent />
          <GetStartedComponent />
          <FooterComponent />
        </Suspense>
      </main>
    </>
  )
}

export default PublicHome