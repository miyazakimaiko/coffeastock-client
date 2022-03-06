import React, { useState, useEffect } from 'react'
import { useAttributeRangeList, useFetchAttributeRangeList } from '../../context/AttributeRangeContext';
import { useBeanList, useFetchBeanList } from '../../context/BeansContext';
import CoffeeSection from './CoffeeSection'
import { unescapeHtml } from '../../utils/HtmlConverter'
import { useUserData } from '../../context/AccountContext';
import ToolBar from '../../components/tool-bar';
import ToolbarDropdown from '../../components/tool-bar/ToolBarDropdown';
import ToolbarDropdownButton from '../../components/tool-bar/ToolbarDropdownButton';

const SHOW = {
  ALL: 'All',
  BLEND: 'Blend',
  SINGLE_ORIGIN: 'Single Origin'
}

const GROUPBY = {
  ROASTER: 'roaster',
  ORIGIN: 'origin',
  FARM: 'farm',
  VARIETY: 'variety',
  PROCESS: 'process',
  AROMA: 'aroma',
}

const ViewMyCoffees = () => {
  const userData = useUserData()
  const attributeRangeList = useAttributeRangeList();
  const fetchAttributeRangeList = useFetchAttributeRangeList();
  const beanList = useBeanList()
  const fetchBeanList = useFetchBeanList()

  const [showState, setShowState] = useState(SHOW.ALL)
  const [groupState, setGroupState] = useState(GROUPBY.ROASTER)
  const [innerHtml, setInnerHtml] = useState([]);

  const makeHtmlCoffeeElement = (attribute) => {
    const coffeeElements = []
    if (Object.keys(beanList).length > 0) {
      Object.values(beanList).forEach(entry => {
        const showAll = showState === SHOW.ALL
        const showBlend = showState === SHOW.BLEND
        const showSingleOrigin = showState === SHOW.SINGLE_ORIGIN
        const attrId = parseInt(attribute['value'])
        const entryIsSingleOrigin = entry['single_origin']
        const entryHasSelectedCategoryValue = entry[groupState] !== null && entry[groupState] !== []

        if ((showBlend || showAll) && !entryIsSingleOrigin && !entryHasSelectedCategoryValue) {
          for (const beanId of Object.keys(entry['blend_ratio'])) {
            if (beanList[beanId][groupState].includes(attrId)) {
              coffeeElements.push(<CoffeeSection bean={entry} />);
              break;
            }
          }
        }
        else if ((showBlend || showAll) && !entryIsSingleOrigin && entry[groupState].includes(attrId)) {
          coffeeElements.push(<CoffeeSection bean={entry} />);
        } 
        else if (showSingleOrigin && entryIsSingleOrigin && entryHasSelectedCategoryValue && entry[groupState].includes(attrId)) {
          coffeeElements.push(<CoffeeSection bean={entry} />);
        } 
        else if (showAll && entryIsSingleOrigin && entryHasSelectedCategoryValue && entry[groupState].includes(attrId)) {
          coffeeElements.push(<CoffeeSection bean={entry} />);
        }
      });
    }
    if (coffeeElements.length === 0) {
      coffeeElements.push(<p>No Entry</p>)
    }
    return coffeeElements
  }

  const makeInnerHtml = () => {
    const innerHtml = [];

    if (Object.keys(attributeRangeList[groupState + '_range']).length > 0) {
      Object.values(attributeRangeList[groupState + '_range']).forEach(attribute => {
        const coffeeElements = makeHtmlCoffeeElement(attribute)
        innerHtml.push(        
          <div className="bg-white rounded-lg shadow-sm pb-8 mb-8">
            <div className="h-36 flex items-center justify-center pt-4">
              <h2 className="text-xl text-center font-bold">{unescapeHtml(attribute.label)}</h2>
            </div>
            <div className="flex mb-4 w-full flex-wrap justify-center">{coffeeElements}</div>
          </div>
        )
      })
    }
    return innerHtml;
  }

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
    if (Object.keys(attributeRangeList).length === 0) {
      fetchAttributeRangeList(userData.sub);
    }
    if (Object.keys(beanList).length === 0) {
      fetchBeanList(userData.sub);
    }
  },[])

  useEffect(() => {
    if (Object.keys(beanList).length !== 0 && Object.keys(attributeRangeList).length !== 0) {
      setInnerHtml(makeInnerHtml());
    }
  }, 
  [
    beanList,
    attributeRangeList,
    showState,
    groupState
  ]);

  return (
    <>
      <div className="px-4 pt-8 w-full max-w-980px mx-auto">
        <ToolBar pageTitle="My Coffee Beans">
          <ToolbarDropdown title={`Show ${showState}`}>
            {Object.values(SHOW).map((state) => {
              return <ToolbarDropdownButton
                title={state}
                active={showState === state}
                onClick={() => {setShowState(state)}}
              />
            })}
          </ToolbarDropdown>

          <ToolbarDropdown title={`group by ${groupState}`}>
            {Object.values(GROUPBY).map((state) => {
              return <ToolbarDropdownButton
                title={state}
                active={groupState === state}
                onClick={() => {setGroupState(state)}}
              />
            })}
          </ToolbarDropdown>
        </ToolBar>
        
        {innerHtml}
      </div>
    </>
  )
}

export default ViewMyCoffees
