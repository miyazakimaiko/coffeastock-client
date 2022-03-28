import React, { useState, useEffect } from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { useAttributeRangeList, useFetchAttributeRangeList } from '../../context/AttributeRangeContext';
import { useBeanList, useFetchBeanList } from '../../context/BeansContext';
import { useUserData } from '../../context/AccountContext';
import ToolBar from '../../components/tool-bar';
import ToolbarDropdown from '../../components/tool-bar/ToolBarDropdown';
import ToolbarDropdownButton from '../../components/tool-bar/ToolbarDropdownButton';
import ToolBarSearchBar from '../../components/tool-bar/ToolBarSearchBar';
import TooltipBottomLeft from '../../components/elements/TooltipBottomLeft';
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

const ViewMyCoffees = () => {
  const userData = useUserData()
  const attributeRangeList = useAttributeRangeList();
  const fetchAttributeRangeList = useFetchAttributeRangeList();
  const beanList = useBeanList()
  const fetchBeanList = useFetchBeanList()

  const [showState, setShowState] = useState(SHOW.ALL)
  const [groupState, setGroupState] = useState(GROUPBY.ROASTER)
  const [searchValue, setSearchValue] = useState("");
  const [sortedCoffeesHtmlDictionary, setSortedCoffeesHtmlDictionary] = useState({});

  const makeSortedCoffeesHtmlDictionary = async () => {
    const attrRange = attributeRangeList[groupState + '_range']
    let coffeeHtmlDictionary = {}
    if (attrRange !== null && attrRange !== undefined) {
      coffeeHtmlDictionary = await Object.keys(attrRange).reduce(
        (o, key) => ({ ...o, [key.replace('id-', '')]: []}), {}
      ) // e.g. {1: [], 3: [], 4: [], 7:[]}
    }
    coffeeHtmlDictionary['No Group'] = []

    try {
      Object.values(beanList).forEach(bean => {
        const beanIsApplicableToShowState = showState === SHOW.ALL || 
          (((showState === SHOW.SINGLE_ORIGIN) && bean['single_origin']) || 
          ((showState === SHOW.BLEND) && !bean['single_origin']))
        if (beanIsApplicableToShowState) {
          let pushed = false
          Object.keys(coffeeHtmlDictionary).forEach(attrId => {
            if (bean[groupState].includes(parseInt(attrId))) {
              coffeeHtmlDictionary[attrId].push(<CoffeeSection bean={bean} />)
              pushed = true
            }
            else if (Object.keys(bean['blend_ratio']).length !== 0) {
              Object.keys(bean['blend_ratio']).forEach(blendBeanId => {
                if (beanList[blendBeanId][groupState].includes(parseInt(attrId))) {
                  coffeeHtmlDictionary[attrId].push(<CoffeeSection bean={bean} />)
                  pushed = true
                }
              })
            }
          })
          if (!pushed) {
            coffeeHtmlDictionary['No Group'].push(<CoffeeSection bean={bean} />)
          }
        }
      })
    } catch (error) {
      throw new Error(error);
    }
    setSortedCoffeesHtmlDictionary(coffeeHtmlDictionary)
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
    try {
      makeSortedCoffeesHtmlDictionary();
      setSearchValue("")
    } catch {}
  }, 
  [beanList, attributeRangeList, showState, groupState]);

  useEffect( async () => {
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

        const coffeeList = document.getElementsByClassName(coffeeSection.props.bean['coffee_bean_id'])
        
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
                title={state}
                active={showState === state}
                onClick={() => {setShowState(state)}}
              />
            })}
          </ToolbarDropdown>

          <ToolbarDropdown title={`group by ${groupState}`}>
            { Object.values(GROUPBY).map((state) => {
              return <ToolbarDropdownButton
                title={state}
                active={groupState === state}
                onClick={() => {setGroupState(state)}}
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
        
        { attributeRangeList[groupState + '_range'] 
            ? 
          Object.keys(sortedCoffeesHtmlDictionary).map(attrId => {
            if (Object.keys(sortedCoffeesHtmlDictionary[attrId]).length > 0) {
              const title = attributeRangeList[groupState + '_range']['id-' + attrId] ? 
                attributeRangeList[groupState + '_range']['id-' + attrId]['label'] : attrId
              return (
                <CoffeeGroupSection title={title}>
                  { sortedCoffeesHtmlDictionary[attrId]
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

export default ViewMyCoffees
