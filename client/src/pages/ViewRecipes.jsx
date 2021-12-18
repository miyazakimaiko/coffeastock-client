import React from 'react'
import Header from '../shared/Header'
import CoffeeSection from './view-my-coffees-component/CoffeeSection';
import RecipeSection from './view-recipes-component/RecipeSection';

const ViewRecipes = () => {
  const title = "Recipes";
  return (
    <>
      <Header title={title} />
      <div>
        <h2 className="font-bold text-2xl text-center p-4">Tropical Blend</h2>
        <div className="flex mb-4 w-full flex-wrap justify-center">
          <RecipeSection />
          <RecipeSection />
          <RecipeSection />
          <RecipeSection />
          <RecipeSection />
        </div>
      </div>
    </>
  )
}

export default ViewRecipes
