import React, { useState, useEffect } from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import TooltipBottomLeft from '../../../elements/TooltipBottomLeft'
import ToolBar from '../../../components/tool-bar'
import ToolbarDropdown from '../../../components/tool-bar/ToolBarDropdown'
import ToolbarDropdownButton from '../../../components/tool-bar/ToolbarDropdownButton'
import ToolBarSearchBar from '../../../components/tool-bar/ToolBarSearchBar'
import RecipeSection from './RecipeSection'

const GROUPBY = {
  METHOD: 'method',
  GRINDER: 'grinder',
  WATER: 'water',
}

const RecipeGroupSection = ({recipeList}) => {
  const [recipeListHtml, setRecipeListHtml] = useState([])

  const [searchValue, setSearchValue] = useState('')
  let orderByState = 'test'
  let sortByState = 'test'

  useEffect(() => {
    if(Object.keys(recipeList).length > 0) {
      const html = Object.values(recipeList).map(recipe => {
        return <RecipeSection recipe={recipe}/>
      })
      setRecipeListHtml(html)
    }
  }, [recipeList])

  return (
    <>
      <div className="px-4 pt-8 w-full max-w-980px mx-auto mb-8 border-b border-burnt-sienna border-opacity-20">
        <h3 className="my-5 text-xl text-center">
          Recipes
        </h3>
        <ToolBar>
          <ToolbarDropdown title={`Show ${orderByState}`}>
            {/* {Object.values(SHOW).map((state) => {
              return <ToolbarDropdownButton
                title={state}
                active={orderByState === state}
                onClick={() => {setShowState(state)}}
              />
            })} */}
          </ToolbarDropdown>
          <ToolbarDropdown title={`group by ${sortByState}`}>
            {/* { Object.values(GROUPBY).map((state) => {
              return <ToolbarDropdownButton
                title={state}
                active={sortByState === state}
                onClick={() => {setGroupState(state)}}
              />
            })} */}
          </ToolbarDropdown>
          <div className="flex">
            <ToolBarSearchBar
              value={searchValue}
              onChange={setSearchValue}
            />
            <TooltipBottomLeft 
              tooltipText="The search filter applies to the Name, Altitude, Harvest Period, and Roast Date."
            >
              <div className="flex items-center">
                <AiOutlineQuestionCircle className="h-5 w-5 flex-shrink-0" />
              </div>
            </TooltipBottomLeft>
          </div>
        </ToolBar>
      </div>
      <div className="flex mb-4 w-full flex-wrap justify-center">
        {recipeListHtml}
      </div>
    </>
  )
}

export default RecipeGroupSection