import React from 'react'
import Header from '../../shared/Header'
import CoffeeSection from './CoffeeSection'

const ViewMyCoffees = () => {
  const title = "My Coffees";
  return (
    <>
      <div className="px-2">
        <h2 className="font-bold text-2xl text-center p-4">Waltz Coffee Roastery</h2>
        <div className="flex mb-4 w-full flex-wrap justify-center">
          <CoffeeSection name={"Tropical Blend"} />
          <CoffeeSection name={"Tropical Blend - Christmas Edition"} />
          <CoffeeSection name={"Waltz Blend"} />
          <CoffeeSection name={"Mocha"} />
          <CoffeeSection name={"キリマンジャロ"} />
          <CoffeeSection name={"French Blend"} />
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
