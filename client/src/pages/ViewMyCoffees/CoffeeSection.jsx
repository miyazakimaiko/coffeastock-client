import React, { useContext } from 'react'
import CoffeeBagLeft from '../../svgs/CoffeeBagLeft'
import { Link } from 'react-router-dom'
import { CustomRangesContext } from '../../context/CustomRanges'
import StarHalfIcon from '../../svgs/StarHalfIcon'
import StarFullIcon from '../../svgs/StarFullIcon'

const CoffeeSection = (props) => {
  const { customRanges } = useContext(CustomRangesContext);
  const bean = props.bean;

  // Get the label of origins from ID
  const origins = [];
  if (bean['origin']) {
    bean['origin'].forEach(origin_id => {
      const origin_range = customRanges['origin_range'];
      origins.push(origin_range['id-' + origin_id]['label'])
    })
  }

  const grade = [];
  if (bean['grade']) {
    const rounded = Math.ceil(bean['grade']/10)/2;
    for (let i = 1; i <= rounded; i ++) {
      grade.push(
        <StarFullIcon/>
      )
    }
    if (rounded % 1 !== 0) {
      grade.push(
        <StarHalfIcon />
      )
    }
  }

  let roastDate = "";
  if (bean['roast_date']) {
    roastDate = bean['roast_date'].split('T')[0]
  }

  return (
    <div className="relative p-3 w-1/3 max-w-350px min-w-250px">
      <Link to={`/coffee/${bean['coffee_bean_id']}`}>
        <div 
          className="
            absolute left-3 right-3 top-3 bottom-3 
            bg-burnt-sienna rounded-md z-10 
            transition-opacity duration-300 ease-out opacity-0 hover:opacity-80
        ">
          <span  className=" h-full w-full flex justify-center items-center text-white font-bold text-2xl">
            View Recipes
          </span>
        </div>
        <div className="h-full p-4 bg-white shadow-sm rounded-md">
          <div className="m-auto w-full max-w-10">
            <CoffeeBagLeft name={bean['label']} />
          </div>
          <div className="text-center">
            <h4 className="text-lg pt-2">
              {origins}
            </h4>
            <span className="flex justify-center pt-2 text-yellow">
              {grade}
            </span>
            <div className="pt-2">
              <span>Roasted at </span>
              <span>{roastDate}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CoffeeSection
