import React, { useEffect, useState } from 'react'
import Spinner from '../../../elements/Spinner';
import useRange from '../../../hooks/useRange';
import ErrorPage from '../../error';
import Rows from './Rows';

const Table = ({searchValue, rangeName}) => {
  const [pageNumber, setPageNumber] = useState(0);
  const { data: items, isLoading, isFetching } = useRange(rangeName);
  const [filteredItems, setFilteredItems] = useState([])
  const itemsCountToDisplay = 10;

  const keys = ["label", "def"];

  function search(items) {
    return items.filter((item) => 
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
    setPageNumber(0);
  }, [rangeName, searchValue])

  useEffect(() => {
    if (Boolean(items)) {
      setFilteredItems(search(Object.values(items)));
    }
  }, [searchValue, items])

  useEffect(() => {
    window.scroll({ top: 0 });
  }, [pageNumber])
  
  if (isLoading) {
    return <Spinner />
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
              data={filteredItems.slice(
                pageNumber * itemsCountToDisplay,
                pageNumber * itemsCountToDisplay + itemsCountToDisplay
              )}
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
            disabled={pageNumber === 0}
          >
            Prev
          </button>
          <div className="px-4 flex">
            {Array(Math.ceil(filteredItems.length / 10))
              .fill()
              .map((_, index) => (
                <button
                  className={
                    pageNumber === index ? "font-bold cursor-text" : ""
                  }
                  onClick={() => setPageNumber(index)}
                  disabled={pageNumber === index}
                >
                  {index + 1}
                </button>
              ))}
          </div>
          <button
            className="circle-button"
            onClick={showNextPage}
            disabled={filteredItems.length <= (pageNumber + 1) * 10}
          >
            Next
            <span className="loading">{isFetching && "Loading..."}</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Table