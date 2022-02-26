import { ChevronDownIcon } from '@heroicons/react/outline';
import React, { useContext } from 'react'
import { BeansContext } from '../../context/Beans';
import CoffeeSection from './CoffeeSection'

const ViewMyCoffees = () => {
  const { beans } = useContext(BeansContext);
  let innerHtml = [];

  const setInnerHtml = () => {
    if (Object.keys(beans).length > 0) {
      Object.entries(beans).forEach(element => {
        innerHtml.push(
          <CoffeeSection bean={element[1]} />
        );
      });
    }
  }
  setInnerHtml();

  return (
    <>
      <div className="px-4 pt-8">
        <div className="h-16 flex items-center justify-center mb-4">
          <h3 className="mr-3 text-xl text-center font-capitals uppercase">
            My Coffee Beans
          </h3>
          <div className="relative h-full flex items-center">
            <a
              className="flex items-center text-burnt-sienna 
              font-capitals uppercase text-sm px-3 ml-4 mr-0 opacity-80 
              hover:opacity-100 ease-linear transition-all duration-150" 
              href="#" 
              id="orderByDropdown" 
              role="button" 
              data-bs-toggle="dropdown" 
              aria-haspopup="true" 
              aria-expanded="false">
              Order by
              <ChevronDownIcon className="h-4 w-4 ml-2"/>
            </a>
            <div className="dropdown-menu dropdown-menu-end border-none shadow-md animate slideIn" aria-labelledby="orderByDropdown">
              <button type="button" className="dropdown-item">Name</button>
              <div className="dropdown-divider"></div>
              <button type="button" className="dropdown-item">Roast Date</button>
            </div>
          </div>
        </div>
        <div className="flex mb-4 w-full flex-wrap justify-center">
          {innerHtml}
        </div>
      </div>
    </>
  )
}

export default ViewMyCoffees
