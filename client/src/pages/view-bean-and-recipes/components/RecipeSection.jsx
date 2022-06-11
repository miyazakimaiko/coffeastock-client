import React, { useState } from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import TooltipBottomLeft from '../../../elements/TooltipBottomLeft'
import ToolBar from '../../../components/toolbar'
import ToolbarDropdown from '../../../components/toolbar/ToolBarDropdown'
import ToolbarDropdownButton from '../../../components/toolbar/ToolbarDropdownButton'
import ToolBarSearchBar from '../../../components/toolbar/ToolBarSearchBar'
import Table from './Table'

const orderBy = {
  methodName: 'method (A-Z)',
  grinderName: 'grinder (A-Z)',
  waterName: 'water (A-Z)',
  brewDate: "brew date",
  waterWeight: "water weight",
  groundsWeight: "grounds weight",
  extractionTime: "extraction time",
  yieldWeight: "yield weight",
  tds: "TDS",
}

const orderMethod = {
  desc: 'descending',
  asc: 'ascending'
}

const RecipeSection = () => {
  const [searchValue, setSearchValue] = useState('')
  const [orderByState, setOrderByState] = useState("");
  const [orderByMethod, setOrderByMethod] = useState(orderMethod.desc);

  return (
    <>
      <div className="px-4 pt-8 w-full max-w-980px mx-auto mb-8 border-b border-burnt-sienna border-opacity-20">
        <h3 className="my-5 text-xl text-center">
          Recipes
        </h3>
        <ToolBar>
          <ToolbarDropdown title={`Order by ${orderByState}`}>
            { Object.values(orderBy).map((state) => (
              <ToolbarDropdownButton
                title={state}
                active={orderByState === state}
                onClick={() => {setOrderByState(state)}}
              />
            ))}
          </ToolbarDropdown>
          <ToolbarDropdown title={`${orderByMethod}`}>
            { Object.values(orderMethod).map((method) => (
              <ToolbarDropdownButton
                title={method}
                active={orderMethod === method}
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
              tooltipText="The search filter applies to the Name, Altitude, Harvest Period, and Roast Date."
            >
              <div className="flex items-center">
                <AiOutlineQuestionCircle className="h-5 w-5 flex-shrink-0" />
              </div>
            </TooltipBottomLeft>
          </div>
        </ToolBar>
      </div>
      <Table searchValue={searchValue} orderByState={orderByState} orderByMethod={orderByMethod} />
    </>
  )
}

export default RecipeSection