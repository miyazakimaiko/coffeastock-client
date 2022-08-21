import React, { useEffect, useState } from 'react'
import { useUserData } from '../../../context/AccountContext';
import useRange from '../../../hooks/useRange';
import Rows from './Rows';

const Table = ({searchValue, rangeName}) => {
  const userData = useUserData()
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useRange(userData.sub, rangeName, pageNumber)

  const keys = ["label", "def"];

  function search(data) {
    return data.filter((item) => 
      keys.some(key => item[key].toLowerCase().includes(searchValue.toLowerCase()))
    );
  }

  function showPreviousPage() {
    setPageNumber(page => page - 1);
  }

  function showNextPage() {
    setPageNumber(page => page + 1);
  }

  useEffect(() => {
    setPageNumber(1);
  }, [rangeName])

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [pageNumber])
  
  if (isLoading) {
    return "Loading....";
  }

  return (
    <>
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
            <Rows
              data={search(Object.values(data.items))}
              rangeName={rangeName}
            />
          </tbody>
        </table>
      </div>
      <div className="pagination-section">
        <div className="flex">
          <button
            className="circle-button"
            onClick={showPreviousPage}
            disabled={pageNumber === 1}
          >
            Prev
          </button>
          <div className="px-4 flex">
            {Array(Math.ceil(data.totalcount / 10))
              .fill()
              .map((_, index) => (
                <button 
                  className={pageNumber === index + 1 ? "font-bold cursor-text" : ""}
                  onClick={() => setPageNumber(index + 1)}
                  disabled={pageNumber === index + 1}
                >
                  {index + 1}
                </button>
              ))}
          </div>
          <button
            className="circle-button"
            onClick={showNextPage}
            disabled={data.totalcount <= pageNumber * 10}
          >
            Next
          </button>
        </div>
        <span className="loading">{isFetching && "Loading..."}</span>
      </div>
    </>
  );
}

export default Table