import React from 'react'
import CoffeeBag from '../../assets/svgs/CoffeeBagRight'
import { Link } from 'react-router-dom'
import StarHalfIcon from '../../assets/svgs/StarHalfIcon'
import StarFullIcon from '../../assets/svgs/StarFullIcon'
import { unescapeHtml } from '../../utils/HtmlConverter'

const CoffeeSection = (props) => {
  const bean = props.bean;

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
  } else {
    grade.push(<p>No Grade</p>)
  }

  let roastDate = "";
  if (bean['roast_date']) {
    roastDate = bean['roast_date'].split('T')[0]
  } else {
    roastDate = <p>No Roast Date</p>
  }

  return (
    <div className="relative px-2 py-6 w-1/3 max-w-300px min-w-250px">
      <Link to={`/coffee/${bean['coffee_bean_id']}`}>
        <div 
          className="absolute left-3 right-3 top-3 bottom-3 
            bg-burnt-sienna rounded-md z-10 
            transition-opacity duration-300 ease-out opacity-0 hover:opacity-80
        ">
          <span  className=" h-full w-full flex justify-center items-center text-white font-bold text-2xl">
            View Recipes
          </span>
        </div>
        <div className="h-full p-4 bg-white rounded-md">
          <div className="m-auto mb-4 w-full max-w-10">
            <CoffeeBag name={unescapeHtml(bean['label'])} />
          </div>
          <div className="text-center">
            <span className="flex justify-center py-2">
              {grade}
            </span>
            <div className="pt-2">
              <span>{roastDate}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CoffeeSection
