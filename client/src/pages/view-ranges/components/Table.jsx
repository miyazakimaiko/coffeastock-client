import React from 'react'
import { useUserData } from '../../../context/AccountContext';
import useRange from '../../../hooks/useRange';
import Rows from './Rows';

const Table = ({searchValue, rangeName}) => {
  const userData = useUserData()
  const { data: ranges, isLoading } = useRange(userData.sub, rangeName)

  const keys = ["label", "def"];

  const search = (data) => {
    return data.filter((item) => 
      keys.some(key => item[key].toLowerCase().includes(searchValue.toLowerCase()))
    );
  }

  if (isLoading) {
    return "Loading....";
  }

  return (
    <div className="mt-3 px-1 md:px-8 py-4 bg-white shadow-sm rounded-md max-w-5xl m-auto">
      <table className="mb-4 settings-table w-full">
        <thead>
          <tr>
            <th className="text-left font-medium">Name</th>
            <th className="text-left font-medium">Description</th>
            <th className="font-medium"></th>
          </tr>
        </thead>
        <tbody>
          <Rows data={search(Object.values(ranges))} rangeName={rangeName}/>
        </tbody>
      </table>
    </div>
  )
}

export default Table