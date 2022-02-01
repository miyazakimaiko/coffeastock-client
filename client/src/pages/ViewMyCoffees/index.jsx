import React, { useContext } from 'react'
import { AccountContext } from '../../context/Account';
import { BeansContext } from '../../context/Beans';
import CoffeeSection from './CoffeeSection'

const ViewMyCoffees = () => {
  const { userData } = useContext(AccountContext);
  const { beans, fetchAllBeans } = useContext(BeansContext);
  let innerHtml = [];

  const setElements = () => {

    if (Object.keys(beans).length > 0) {
      Object.entries(beans).forEach(element => {
        innerHtml.push(
          <CoffeeSection bean={element[1]} />
        );
      });
    }
  }
  setElements();

  return (
    <>
      <div className="px-2">
        <h2 className="font-bold text-2xl text-center p-4">Waltz Coffee Roastery</h2>
        <div className="flex mb-4 w-full flex-wrap justify-center">
          {innerHtml}
        </div>
      </div>
      <div>
        <h2 className="font-bold text-2xl text-center p-4">Waltz Coffee Roastery</h2>
        <div className="flex mb-4 w-full flex-wrap justify-center">
        </div>
      </div>
    </>
  )
}

export default ViewMyCoffees
