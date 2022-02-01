import React, { useContext } from 'react'
import CoffeeBagLeft from '../../svgs/CoffeeBagLeft'
import { Link } from 'react-router-dom'
import { CustomRangesContext } from '../../context/CustomRanges'
import StarHalfIcon from '../../svgs/StarHalfIcon'
import StarFullIcon from '../../svgs/StarFullIcon'

const CoffeeSection = (props) => {
  const { customRanges } = useContext(CustomRangesContext);
  const bean = props.bean;
  console.log('bean: ', bean)

  // Get the label of origins from ID
  const origins = [];
  if (bean['origin']) {
    bean['origin'].forEach(origin_id => {
      const origin_range = customRanges['origin_range'];
      origins.push(origin_range['id-' + origin_id]['label'])
    })
  }

  const grading = [];
  if (bean['grading']) {
    const rounded = Math.ceil(bean['grading']/10)/2;
    console.log('rounded: ', rounded)
    for (let i = 1; i <= rounded; i ++) {
      grading.push(
        <StarFullIcon/>
      )
    }
    if (rounded % 1 !== 0) {
      grading.push(
        <StarHalfIcon />
      )
    }
  }

  return (
    <div className="relative p-3 w-1/3 max-w-350px min-w-250px">
      <Link to={`/coffee/${bean['coffee_bean_id']}`}>
        <div 
          className="
            absolute left-4 right-4 top-4 bottom-4 
            bg-burnt-sienna rounded-md z-10 
            transition-opacity duration-300 ease-out opacity-0 hover:opacity-80
        ">
          <span  className=" h-full w-full flex justify-center items-center text-white font-bold text-2xl">
            View Recipes
          </span>
        </div>
        <div className="p-4 bg-white shadow-sm rounded-md">
          <div className="m-auto w-full max-w-10">
            <CoffeeBagLeft name={bean['label']} />
          </div>
          <div className="text-center">
            <h4 className="text-lg pt-2">
              {origins}
            </h4>
            <span className="flex justify-center pt-2 text-yellow">
              {grading}
            </span>
            <div className="pt-2">
              <span>Roasted at </span>
              <span>{bean['roast_date'].split('T')[0]}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CoffeeSection
