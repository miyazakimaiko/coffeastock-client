import React, { useState } from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import TooltipBottomLeft from '../../../elements/TooltipBottomLeft'
import ToolBar from '../../../components/toolbar'
import ToolbarDropdown from '../../../components/toolbar/ToolBarDropdown'
import ToolbarDropdownButton from '../../../components/toolbar/ToolbarDropdownButton'
import ToolBarSearchBar from '../../../components/toolbar/ToolBarSearchBar'
import { ORDER_BY, ORDER_METHOD } from '../utils/RecipeOrderConstants'
import Table from './Table'

const RecipeSection = () => {
  const [searchValue, setSearchValue] = useState("")
  const [orderByState, setOrderByState] = useState(ORDER_BY.BREW_DATE);
  const [orderByMethod, setOrderByMethod] = useState(ORDER_METHOD.ASC);

  return (
    <>
      <div className="p-4 mt-10 w-full max-w-980px mx-auto border-t border-burnt-sienna border-opacity-20">
        <h3 className="my-5 text-xl text-center">
          Recipes
        </h3>
        <ToolBar>
          <ToolbarDropdown title={`Order by ${orderByState.replace('_', ' ').replace('temp', 'temperature')}`}>
            { Object.values(ORDER_BY).map((state) => (
              <ToolbarDropdownButton
                key={state}
                title={state.replace('_', ' ').replace('temp', 'temperature')}
                active={orderByState === state}
                onClick={() => {setOrderByState(state)}}
              />
            ))}
          </ToolbarDropdown>
          <ToolbarDropdown title={`${orderByMethod}`}>
            { Object.values(ORDER_METHOD).map((method) => (
              <ToolbarDropdownButton
                key={method}
                title={method}
                active={orderByMethod === method}
                onClick={() => {setOrderByMethod(method)}}
              />
            ))}
          </ToolbarDropdown>
          <div className="flex">
            <ToolBarSearchBar
              value={searchValue}
              onChange={setSearchValue}
            />
            <TooltipBottomLeft 
              tooltipText="Please use 'YYYY-MM-DD' format to search by the Brew Date. (e.g. 2022-01-31) "
            >
              <div className="flex items-center">
                <AiOutlineQuestionCircle className="h-5 w-5 flex-shrink-0" />
              </div>
            </TooltipBottomLeft>
          </div>
        </ToolBar>
      </div>
      <Table searchValue={searchValue} orderBy={orderByState} orderMethod={orderByMethod} />
    </>
  )
}

export default RecipeSection