import React, { useEffect, useState } from 'react'
import { useUserData } from '../../context/AccountContext'
import FormMultiSelect from '../../elements/FormMultiSelect'
import useBeans from '../../hooks/useBeans'
import RecipeSelectInput from './components/RecipeSelectInput'

const CompareRecipes = () => {
  const userData = useUserData();
  const { data: beanList, isLoading } = useBeans(userData.sub);

  const [selectedBeanLeft, setSelectedBeanLeft] = useState(null);
  const [selectedBeanRight, setSelectedBeanRight] = useState(null);

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <div className="px-4 pt-8 w-full max-w-980px mx-auto">
    <h3 className="my-5 text-xl text-center">
      Compare Recipes
    </h3>
    <div>
      <div className="flex justify-between items-center md:w-full">
        <div className="md:w-2/5">
          <FormMultiSelect
            options={Object.values(beanList)}
            isDisabled={false}
            value={selectedBeanLeft}
            onChange={setSelectedBeanLeft}
            isCreatable={false}
            isMulti={false}
          />
        </div>
        <h4>Select Beans</h4>
        <div className="md:w-2/5">
          <FormMultiSelect
            options={Object.values(beanList)}
            isDisabled={false}
            value={selectedBeanRight}
            onChange={setSelectedBeanRight}
            isCreatable={false}
            isMulti={false}
          />
        </div>
      </div>

      <div className="flex justify-between items-center md:w-full">
        <div className="md:w-2/5">
          { selectedBeanLeft ? (
            <RecipeSelectInput beanId={selectedBeanLeft.bean_id} />
            ) : null
          }
        </div>

        { selectedBeanLeft || selectedBeanRight ? (
          <h4>Select Recipes</h4>
          ) : null
        }
        
        <div className="md:w-2/5">
        { selectedBeanRight ? (
          <RecipeSelectInput beanId={selectedBeanRight.bean_id} />
          ) : null
        }
        </div>
      </div>
    </div>

  </div>
  )
}

export default CompareRecipes