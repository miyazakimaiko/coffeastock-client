import React, { useState } from 'react'
import { PencilAltIcon, PlusSmIcon, XIcon } from '@heroicons/react/outline'
import Header from '../../shared/Header'

const SettingsCustomRange = ({parentCat, cat, customRanges}) => {
  const [openAddModal, setOpenAddModal] = useState(false)

  const title = `Customize ${parentCat} Setting`;
  const rangeName = `${cat}_range`
  let items = [];
  
  if (customRanges !== null) {
    Object.keys(customRanges).forEach((key) => {
      items.push(
        <tr id={`${cat}-${key}`}>
          <td>{customRanges[key]['name']}</td>
          <td>{customRanges[key]['def']}</td>
          <td className="td-options">
            <button
              className="option-button"
            >
              <PencilAltIcon className="icon text-green" />
            </button>
            <button className="option-button">
              <XIcon className="icon text-red" />
            </button>
          </td>
        </tr>
      )
    })
  }

  return (
    <>
      <Header title={title}/>
      <div className="px-2">
        <div className="flex mb-4 w-full flex-wrap justify-center">
          <div className="px-3 w-full">
            <div className="p-4 flex justify-center">
              <h3 className="mr-3 font-bold text-2xl text-center capitalize">{cat} range</h3>
              <button
                onClick={() => setOpenAddModal(true)}
                type="button"
                className="bg-blue text-white rounded-3xl px-2 py-1 flex items-center font-capitals uppercase font-bold text-xs tracking-widest"
                >
                <PlusSmIcon className="w-4 h-4 mr-1 inline" />
                Add New
              </button>
            </div>
            
            <form 
              method="post"
              className="mt-3 p-4 bg-white shadow-sm rounded-md"
            >
              <table className="settings-table w-full">
                <thead>
                  <th>Name</th>
                  <th>Details</th>
                  <th>Options</th>
                </thead>
                <tbody>
                  {items}
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>

      {openAddModal ? 
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-center justify-between p-4 rounded-t">
                <h3 className="text-xl font-light capitalize">
                  add new {cat}
                </h3>
                <button
                  className="p-1 ml-auto border-0 text-black float-right"
                  onClick={() => setOpenAddModal(false)}
                >
                  <XIcon className="h-6 w-6"/>
                </button>
              </div>
              {/*body*/}
              <div class="content">
                content
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-4 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setOpenAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue text-white opacity-80 hover:opacity-100 font-bold uppercase text-sm px-6 py-2 rounded-3xl ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setOpenAddModal(false)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      : null}
    </>
  )
}

export default SettingsCustomRange
