import React from 'react'
import { Link } from 'react-router-dom'
import { TO_COFFEE } from '../../utils/Paths'
import CoffeeBag from '../../assets/svgs/CoffeeBagRight'
import StarHalfIcon from '../../assets/svgs/StarHalfIcon'
import StarFullIcon from '../../assets/svgs/StarFullIcon'

const CoffeeSection = ({bean}) => {
  const grade = [];
  if (bean['grade']) {
    const rounded = Math.ceil(bean['grade']/10)/2;
    for (let i = 1; i <= rounded; i ++) {
      grade.push(
        <StarFullIcon key={bean.bean_id + i} />
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
    <div
      className={`relative px-1 py-6 w-1/2 ${bean['bean_id']}`}
      style={{minWidth: '110px', maxWidth: '220px'}}
    >
      <Link to={`${TO_COFFEE}/${bean['bean_id']}`}>
        <div 
          className="absolute left-3 right-3 top-3 bottom-3 
            bg-burnt-sienna rounded-md z-10 
            transition-opacity duration-300 ease-out opacity-0 hover:opacity-80
        ">
          <span  className=" h-full w-full flex justify-center items-center text-white">
            View Recipes
          </span>
        </div>
        <div className="h-full p-4 bg-white rounded-md">
          <div className="m-auto mb-4 w-full max-w-10">
            <CoffeeBag name={bean['label']} />
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
