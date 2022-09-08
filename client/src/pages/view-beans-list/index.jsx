import React, { useState, useEffect } from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import useBeans from '../../hooks/useBeans';
import useRanges from '../../hooks/useRanges';
import ToolBar from '../../components/toolbar';
import ToolbarDropdown from '../../components/toolbar/ToolBarDropdown';
import ToolbarDropdownButton from '../../components/toolbar/ToolbarDropdownButton';
import ToolBarSearchBar from '../../components/toolbar/ToolBarSearchBar';
import TooltipBottomLeft from '../../elements/TooltipBottomLeft';
import Spinner from '../../elements/Spinner';
import ErrorPage from '../error';
import CoffeeGroupSection from './CoffeeGroupSection';
import CoffeeSection from './CoffeeSection'

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

const ViewBeansList = () => {
  const { data: beanList, 
          isLoading: beanListIsLoading,
          isError: beanListHasError, 
        } = useBeans();

  const { data: rangeList, 
          isLoading: rangeListIsLoading,
          isError: rangeListHasError,
        } = useRanges();

  const [showState, setShowState] = useState(SHOW.ALL)
  const [groupState, setGroupState] = useState(GROUPBY.ROASTER)
  const [searchValue, setSearchValue] = useState("");
  const [sortedCoffeesHtmlDictionary, setSortedCoffeesHtmlDictionary] = useState({});

  const makeSortedCoffeesHtmlDictionary = async () => {
    const attrRange = rangeList[groupState + '_range']
    let coffeeHtmlDictionary = {}
    if (attrRange !== null && attrRange !== undefined) {
      coffeeHtmlDictionary = await Object.keys(attrRange).reduce(
        (o, key) => ({ ...o, [key.replace('id-', '')]: [] }), {}
      ) // e.g. {1: [], 3: [], 4: [], 7:[]}
    }
    coffeeHtmlDictionary['No Group'] = []

    Object.values(beanList).forEach(bean => {
      const beanIsApplicableToShowState = showState === SHOW.ALL ||
        (((showState === SHOW.SINGLE_ORIGIN) && bean.single_origin) ||
          ((showState === SHOW.BLEND) && !bean.single_origin))
  
      if (beanIsApplicableToShowState) {
        let pushed = false
        Object.keys(coffeeHtmlDictionary).forEach(attrId => {
          if (bean[groupState].includes(parseInt(attrId))) {
            coffeeHtmlDictionary[attrId].push(<CoffeeSection bean={bean} key={bean.bean_id} />)
            pushed = true
          }
          else if (bean.blend_ratio) {
            let found = false;
            Object.keys(bean.blend_ratio).forEach(blendBeanId => {
              if(beanList[blendBeanId][groupState].includes(parseInt(attrId))) {
                found = true
              }
            })
            if (found) {
              coffeeHtmlDictionary[attrId].push(<CoffeeSection bean={bean} key={bean.bean_id} />)
              pushed = true
            }
          }
        })
        if (!pushed) {
          coffeeHtmlDictionary['No Group'].push(<CoffeeSection bean={bean} key={bean.bean_id} />)
        }
      }
    })
    setSortedCoffeesHtmlDictionary(coffeeHtmlDictionary)
  }


  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [])

  useEffect(() => {
    if (!beanListIsLoading && !rangeListIsLoading) {
      makeSortedCoffeesHtmlDictionary();
      setSearchValue("")
    }
  },[beanListIsLoading, rangeListIsLoading, beanList, rangeList, showState, groupState]);

  useEffect(async () => {
    Object.values(sortedCoffeesHtmlDictionary).forEach(group => {
      group.forEach(coffeeSection => {
        const categoriesToSearch = ['altitude', 'harvest_period', 'label', 'roast_date']
        let show = false
        categoriesToSearch.forEach(category => {
          if (coffeeSection.props.bean[category]) {
            if (coffeeSection.props.bean[category].toLowerCase().includes(searchValue.toLowerCase())) {
              show = true
            }
          }
        })

        const coffeeList = document.getElementsByClassName(coffeeSection.props.bean['bean_id'])

        if (coffeeList && !show) {
          for (let coffee of coffeeList) {
            coffee.classList.add('hidden')
          }
        }
        else if (coffeeList && show) {
          for (let coffee of coffeeList) {
            coffee.classList.remove('hidden')
          }
        }
      })
    })
  }, [searchValue])

  if (beanListIsLoading || rangeListIsLoading) {
    return <Spinner />
  } 

  if (beanListHasError || rangeListHasError) {
    return <ErrorPage />
  }
  
  return (
    <>
      <div className="px-4 pt-8 w-full max-w-980px mx-auto">
        <h3 className="my-5 text-xl text-center">
          My Coffee Beans
        </h3>
        <ToolBar>
          <ToolbarDropdown title={`Show ${showState}`}>
            {Object.values(SHOW).map((state) => {
              return <ToolbarDropdownButton
                key={state}
                title={state}
                active={showState === state}
                onClick={() => { setShowState(state) }}
              />
            })}
          </ToolbarDropdown>

          <ToolbarDropdown title={`group by ${groupState}`}>
            {Object.values(GROUPBY).map((state) => {
              return <ToolbarDropdownButton
                key={state}
                title={state}
                active={groupState === state}
                onClick={() => { setGroupState(state) }}
              />
            })}
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

        {rangeList[groupState + '_range']
          ?
          Object.keys(sortedCoffeesHtmlDictionary).map(attrId => {
            if (Object.keys(sortedCoffeesHtmlDictionary[attrId]).length > 0) {
              const title = rangeList[groupState + '_range'][attrId] ?
                rangeList[groupState + '_range'][attrId].label : attrId
              return (
                <CoffeeGroupSection title={title} key={title} >
                  {sortedCoffeesHtmlDictionary[attrId]
                    ?
                    Object.values(sortedCoffeesHtmlDictionary[attrId]).map(html => html)
                    :
                    null
                  }
                </CoffeeGroupSection>
              )
            }
          })
          :
          null
        }
      </div>
    </>
  )
}

export default ViewBeansList
