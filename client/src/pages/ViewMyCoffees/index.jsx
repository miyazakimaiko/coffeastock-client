import React, { useContext, useState, useEffect } from 'react'
import { CustomRangesContext } from '../../context/CustomRanges';
import { BeansContext } from '../../context/Beans';
import CoffeeSection from './CoffeeSection'
import { unescapeHtml } from '../../utils/HtmlConverter'
import Dropdown from '../../shared/Dropdown';

const ViewMyCoffees = () => {
  const { customRanges } = useContext(CustomRangesContext);
  const { beans } = useContext(BeansContext);
  const [showAll, setShowAll] = useState(true);
  const [showBlend, setShowBlend] = useState(false);
  const [showSingleOrigin, setShowSingleOrigin] = useState(false);
  const [groupByRoaster, setGroupByRoaster] = useState(true);
  const [groupByOrigin, setGroupByOrigin] = useState(false);
  const [groupByFarm, setGroupByFarm] = useState(false);
  const [groupByVariety, setGroupByVariety] = useState(false);
  const [groupByProcess, setGroupByProcess] = useState(false);
  const [groupByAroma, setGroupByAroma] = useState(false);
  const [innerHtml, setInnerHtml] = useState([]);

  const makeInnerHtml = (category) => {
    const innerHtml = [];
    if (Object.keys(customRanges[category + '_range']).length > 0) {
      Object.values(customRanges[category + '_range']).forEach(range => {
        const coffeeElements = [];

        if (Object.keys(beans).length > 0) {
          Object.values(beans).forEach(entry => {
            const rangeId = parseInt(range['value']);
            if (entry[category] !== null) {
              if (showBlend && entry['single_origin'] === false && entry[category].includes(rangeId)) {
                coffeeElements.push(<CoffeeSection bean={entry} />);
              } else if (showSingleOrigin && entry['single_origin'] === true && entry[category].includes(rangeId)) {
                coffeeElements.push(<CoffeeSection bean={entry} />);
              } else if (showAll && entry[category].includes(rangeId)) {
                coffeeElements.push(<CoffeeSection bean={entry} />);
              }
            }
          });
        }
        if (coffeeElements.length === 0) {
          coffeeElements.push(<p>No Entry</p>)
        }
  
        innerHtml.push(        
          <div className="bg-white rounded-lg shadow-sm pb-8 mb-8">
            <div className="h-36 flex items-center justify-center pt-4">
              <h2 className="text-xl text-center font-capitals uppercase font-bold">{unescapeHtml(range.label)}</h2>
            </div>
            <div className="flex mb-4 w-full flex-wrap justify-center">
              {coffeeElements}
            </div>
          </div>
        )
      })
    }
    return innerHtml;
  }

  const getViewStatus = () => {
    if (showAll) return "All"
    else if (showBlend) return "Blend"
    else if (showSingleOrigin) return "Single Origin"
    return ""
  }

  const getGroupStatus = () => {
    if (groupByRoaster) return "Group By Roaster"
    else if (groupByOrigin) return "Group By Origin"
    else if (groupByFarm) return "Group By Farm"
    else if (groupByVariety) return "Group By Variety"
    else if (groupByProcess) return "Group By Process"
    else if (groupByAroma) return "Group By Aroma"
    return ""
  }

  useEffect(() => {
    let innerHtml = [];
    if (groupByRoaster) innerHtml = makeInnerHtml('roaster');
    else if (groupByOrigin) innerHtml = makeInnerHtml('origin');
    else if (groupByFarm) innerHtml = makeInnerHtml('farm');
    else if (groupByVariety) innerHtml = makeInnerHtml('variety');
    else if (groupByProcess) innerHtml = makeInnerHtml('process');
    else if (groupByAroma) innerHtml = makeInnerHtml('aroma');
    setInnerHtml(innerHtml);
  }, 
  [
    beans,
    showAll, 
    showBlend, 
    showSingleOrigin, 
    groupByRoaster,
    groupByOrigin,
    groupByFarm,
    groupByVariety,
    groupByProcess,
    groupByAroma
  ]);

  return (
    <>
      <div className="px-4 pt-8">
        <div className="h-16 flex items-center justify-center mb-8">
          <h3 className="mr-3 text-xl text-center font-capitals uppercase">
            My Coffee Beans
          </h3>
          <div className="relative h-full flex items-center mx-6">
            <Dropdown dropdownText={getViewStatus()}>
              <div className="dropdown-content">
                <button 
                  type="button"
                  onClick={() => {
                    setShowAll(true);
                    setShowBlend(false);
                    setShowSingleOrigin(false);
                  }}
                  className={(showAll ? "active " : "") + "dropdown-item"}>
                    All
                </button>
                <div className="dropdown-divider"></div>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowAll(false);
                    setShowBlend(false);
                    setShowSingleOrigin(true);
                  }}
                  className={(showSingleOrigin ? "active " : "") + "dropdown-item"}>
                    Single Origin Only
                </button>
                <div className="dropdown-divider"></div>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowAll(false);
                    setShowBlend(true);
                    setShowSingleOrigin(false);
                  }}
                  className={(showBlend ? "active " : "") + "dropdown-item"}>
                    Blend Only
                </button>
              </div>
            </Dropdown>
          </div>
          <div className="relative h-full flex items-center">
            <Dropdown dropdownText={getGroupStatus()}>
              <div className="dropdown-content">
                <button 
                  type="button"
                  onClick={() => {
                    setGroupByRoaster(true); 
                    setGroupByOrigin(false);
                    setGroupByFarm(false);
                    setGroupByVariety(false);
                    setGroupByProcess(false);
                    setGroupByAroma(false); 
                  }}
                  className={(groupByRoaster ? "active " : "") + "dropdown-item"}>
                    Roaster
                </button>
                <div className="dropdown-divider"></div>
                <button 
                  type="button"
                  onClick={() => {
                    setGroupByRoaster(false); 
                    setGroupByOrigin(true);
                    setGroupByFarm(false);
                    setGroupByVariety(false);
                    setGroupByProcess(false);
                    setGroupByAroma(false); 
                  }}
                  className={(groupByOrigin ? "active " : "") + "dropdown-item"}>
                    Origin
                </button>
                <div className="dropdown-divider"></div>
                <button 
                  type="button"
                  onClick={() => {
                    setGroupByRoaster(false); 
                    setGroupByOrigin(false);
                    setGroupByFarm(true);
                    setGroupByVariety(false);
                    setGroupByProcess(false);
                    setGroupByAroma(false); 
                  }}
                  className={(groupByFarm ? "active " : "") + "dropdown-item"}>
                    Farm
                </button>
                <div className="dropdown-divider"></div>
                <button 
                  type="button"
                  onClick={() => {
                    setGroupByRoaster(false); 
                    setGroupByOrigin(false);
                    setGroupByFarm(false);
                    setGroupByVariety(true);
                    setGroupByProcess(false);
                    setGroupByAroma(false); 
                  }}
                  className={(groupByVariety ? "active " : "") + "dropdown-item"}>
                    Variety
                </button>
                <div className="dropdown-divider"></div>
                <button 
                  type="button"
                  onClick={() => {
                    setGroupByRoaster(false); 
                    setGroupByOrigin(false);
                    setGroupByFarm(false);
                    setGroupByVariety(false);
                    setGroupByProcess(true);
                    setGroupByAroma(false); 
                  }}
                  className={(groupByProcess ? "active " : "") + "dropdown-item"}>
                    Process
                </button>
                <div className="dropdown-divider"></div>
                <button 
                  type="button"
                  onClick={() => {
                    setGroupByRoaster(false); 
                    setGroupByOrigin(false);
                    setGroupByFarm(false);
                    setGroupByVariety(false);
                    setGroupByProcess(false);
                    setGroupByAroma(true); 
                  }}
                  className={(groupByAroma ? "active " : "") + "dropdown-item"}>
                    Aroma
                </button>
              </div>
            </Dropdown>
          </div>
        </div>
        {innerHtml}
      </div>
    </>
  )
}

export default ViewMyCoffees
