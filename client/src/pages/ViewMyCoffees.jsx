import React from 'react'
import Header from '../shared/Header'
import CoffeeSection from './view-my-coffees-component/CoffeeSection';

const ViewMyCoffees = () => {
  const title = "My Coffees";
  return (
    <>
      <Header title={title} />
      <div>
        <h2 className="font-bold text-2xl text-center p-4">Waltz Coffee Roastery</h2>
        <div className="flex mb-4 w-full flex-wrap justify-center">
          <CoffeeSection />
          <CoffeeSection />
          <CoffeeSection />
          <CoffeeSection />
          <CoffeeSection />
          <CoffeeSection />
        </div>
      </div>
      <div>
        <h2 className="font-bold text-2xl text-center p-4">Waltz Coffee Roastery</h2>
        <div className="flex mb-4 w-full flex-wrap justify-center">
          <CoffeeSection />
          <CoffeeSection />
          <CoffeeSection />
          <CoffeeSection />
        </div>
      </div>
    </>
    )
}

export default ViewMyCoffees
