import React from 'react'
import { useParams } from 'react-router-dom';
import { useUserData } from '../../../context/AccountContext';
import useRecipes from '../../../hooks/useRecipes';
import Rows from './Rows';

const Table = ({searchValue, orderByState, orderByMethod}) => {
  const { id } = useParams();
  const userData = useUserData()
  const { data: recipes, isLoading } = useRecipes(userData.sub, id)

  const keys = ["brew_date", "grind_size"];

  const search = (data) => {
    return data.filter((item) => 
      keys.some(key => item[key].toLowerCase().includes(searchValue.toLowerCase()))
    );
  }

  if (isLoading) {
    return "Loading....";
  }

  return (
    <div className="flex mb-4 w-full flex-wrap justify-center">
      <table>
        <tbody>
          <Rows data={search(Object.values(recipes))}/>
        </tbody>
      </table>
    </div>
  )
}

export default Table