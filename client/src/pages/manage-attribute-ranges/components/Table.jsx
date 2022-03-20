import React from 'react'

const Table = ({children}) => {
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
          {children}
        </tbody>
      </table>
    </div>
  )
}

export default Table