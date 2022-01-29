import { XIcon } from '@heroicons/react/outline'
import { MultiSelect } from "react-multi-select-component";
import React, { useState, useContext } from 'react'
import './FloatingMenu.scss'
import { CustomRangesContext } from '../../context/CustomRanges';



const AddBeanModal = ({setOpenThisModal}) => {
  const [selected, setSelected] = useState([]);
  const { customRanges } = useContext(CustomRangesContext);

  return (
    <>
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-center justify-between p-4 rounded-t">
            <h3 className="text-xl font-light">
              Add New Coffee Beans
            </h3>
            <button
              className="p-1 ml-auto border-0 text-black float-right"
              onClick={() => setOpenThisModal(false)}
            >
              <XIcon className="h-6 w-6"/>
            </button>
          </div>
          {/*body*/}
          <ul class="nav nav-tabs text-center" id="myTab" role="tablist">
            <li class="nav-item w-1/3" role="presentation">
              <button class="active w-full h-full py-2 text-white bg-burnt-sienna opacity-50" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
            </li>
            <li class="nav-item w-1/3" role="presentation">
              <button class="w-full h-full py-2 text-white bg-burnt-sienna opacity-50" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
            </li>
            <li class="nav-item w-1/3" role="presentation">
              <button class="w-full h-full py-2 text-white bg-burnt-sienna opacity-50" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Contact</button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div>
                <h1>Select Fruits</h1>
                <pre>{JSON.stringify(selected)}</pre>
                <MultiSelect
                  options={customRanges.origin_range}
                  value={selected}
                onChange={setSelected}
                  labelledBy="Select"
                />
              </div>
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-4 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setOpenThisModal(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue text-white opacity-80 hover:opacity-100 font-bold uppercase text-sm px-6 py-2 rounded-3xl ease-linear transition-all duration-150"
              type="button"
              onClick={() => setOpenThisModal(false)}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
  )
}

export default AddBeanModal
