import { QuestionMarkCircleIcon } from '@heroicons/react/outline'
import React, { useState, useEffect } from 'react'
import TooltipBottomLeft from '../../../components/elements/TooltipBottomLeft'
import ToolBar from '../../../components/tool-bar'
import ToolbarDropdown from '../../../components/tool-bar/ToolBarDropdown'
import ToolbarDropdownButton from '../../../components/tool-bar/ToolbarDropdownButton'
import ToolBarSearchBar from '../../../components/tool-bar/ToolBarSearchBar'
import { useRecipeList } from '../../../context/RecipeContext'
import RecipeSection from './RecipeSection'

const RecipeGroupSection = () => {
  const recipeList = useRecipeList()
  const [recipeListHtml, setRecipeListHtml] = useState([])

  const [searchValue, setSearchValue] = useState('')
  let showState = 'test'
  let groupState = 'test'

  useEffect(() => {
    const html = Object.values(recipeList).map(recipe => {
      return <RecipeSection recipe={recipe}/>
    })
    setRecipeListHtml(html)
  }, [])

  return (
    <>
      <div className="px-4 pt-8 w-full max-w-980px mx-auto">
        <h3 className="my-5 text-xl text-center">
          Recipes
        </h3>
        <ToolBar>
          <ToolbarDropdown title={`Show ${showState}`}>
            {/* {Object.values(SHOW).map((state) => {
              return <ToolbarDropdownButton
                title={state}
                active={showState === state}
                onClick={() => {setShowState(state)}}
              />
            })} */}
          </ToolbarDropdown>

          <ToolbarDropdown title={`group by ${groupState}`}>
            {/* { Object.values(GROUPBY).map((state) => {
              return <ToolbarDropdownButton
                title={state}
                active={groupState === state}
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
                <QuestionMarkCircleIcon className="h-5 w-5 flex-shrink-0" />
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