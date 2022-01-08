import React from 'react'
import Header from '../../shared/Header'
import CoffeeBag from '../../svgs/CoffeeBag';
import RecipeSection from './RecipeSection';
import './ViewRecipes.scss'

const ViewRecipes = () => {
  const title = "Recipes";
  const coffeeName = "Tropical Blend"

  return (
    <>
      <Header title={title} />
      <div className="px-2">
        <h2 className="font-bold text-2xl text-center p-4">{coffeeName}</h2>
        <div className="w-full flex flex-wrap-reverse justify-center my-4">
          <div className="flex items-center my-4 mx-10">
            <table>
              <tbody>
                <tr>
                  <th className="pb-2 pr-4">Roaster: </th>
                  <td>Waltz Coffee Roastery</td>
                </tr>
                <tr>
                  <th className="pb-2 pr-4">Roast Date: </th>
                  <td>2021/10/21</td>
                </tr>
                <tr>
                  <th className="pb-2 pr-4">Origin: </th>
                  <td>Brazil, Colombia, Kenya</td>
                </tr>
                <tr>
                  <th className="pb-2 pr-4">Process: </th>
                  <td>Washed</td>
                </tr>
                <tr>
                  <th className="pb-2 pr-4">Variety: </th>
                  <td>Caturra, Typica, Burbon</td>
                </tr>
                <tr>
                  <th className="pb-2 pr-4">Grade: </th>
                  <td>9.5</td>
                </tr>
                <tr>
                  <th className="pb-2 pr-4">Roast Level: </th>
                  <td>7</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="min-w-150px max-w-10 mx-10 my-auto">
            <CoffeeBag name={coffeeName} />
          </div>
        </div>
        <div className="flex mb-4 w-full flex-wrap justify-center">
          <RecipeSection recipeId="1" />
          <RecipeSection recipeId="2" />
          <RecipeSection recipeId="3" />
          <RecipeSection recipeId="4" />
          <RecipeSection recipeId="5" />
        </div>
      </div>
    </>
  )
}

export default ViewRecipes
