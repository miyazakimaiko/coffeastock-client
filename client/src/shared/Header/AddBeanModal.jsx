import { XIcon } from '@heroicons/react/outline'
import { MultiSelect } from "react-multi-select-component";
import React, { useState, useContext } from 'react'
import './Modals.scss'
import { CustomRangesContext } from '../../context/CustomRanges';



const AddBeanModal = ({setOpenThisModal}) => {
  const [selected, setSelected] = useState([]);
  const { customRanges } = useContext(CustomRangesContext);
  const originRange = Object.values(customRanges.origin_range)

  return (
    <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="w-full max-w-3xl relative my-6 mx-auto">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="p-4 rounded-t">
            <h3 className="text-xl font-light text-center">
              Add New Coffee Beans
            </h3>
            <button
              className="absolute right-4 top-4 border-0 text-black float-right"
              onClick={() => setOpenThisModal(false)}
            >
              <XIcon className="h-6 w-6"/>
            </button>
          </div>
          {/*body*/}
          <ul class="nav nav-tabs text-center" id="myTab" role="tablist">
            <li class="nav-item w-1/3" role="presentation">
              <button class="active w-full h-full py-2 text-white bg-burnt-sienna opacity-50" id="base-info-tab" data-bs-toggle="tab" data-bs-target="#base-info" type="button" role="tab" aria-controls="base-info" aria-selected="true">
                Base Info
              </button>
            </li>
            <li class="nav-item w-1/3" role="presentation">
              <button class="w-full h-full py-2 text-white bg-burnt-sienna opacity-50" id="details-tab" data-bs-toggle="tab" data-bs-target="#details" type="button" role="tab" aria-controls="details" aria-selected="false">
                Details
              </button>
            </li>
            <li class="nav-item w-1/3" role="presentation">
              <button class="w-full h-full py-2 text-white bg-burnt-sienna opacity-50" id="confirmation-tab" data-bs-toggle="tab" data-bs-target="#confirmation" type="button" role="tab" aria-controls="confirmation" aria-selected="false">
                Confirmation
              </button>
            </li>
          </ul>
          <form class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="base-info" role="tabpanel" aria-labelledby="base-info-tab">
              <div className="flex">
                <div className="w-1/2">
                  <div>
                    <input type="checkbox" name="blended" id="blended" />
                    <label className="capitalize">Single Origin</label>
                  </div>
                  <div>
                    <label className="font-semibold capitalize">Name</label>
                    <input type="text" name="label" placeholder="e.g. Seasonal House Blend" className="blue-outline-transition bg-creme block w-full text-base py-2 px-3 rounded-md border-1"
                      // value={}
                      // onChange={}
                    />
                  </div>
                  <div>
                    <label className="font-semibold capitalize">Grade</label>
                    <input type="text" name="grade" placeholder="e.g. 85.5" className="blue-outline-transition bg-creme block w-full text-base py-2 px-3 rounded-md border-1"
                      // value={}
                      // onChange={}
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <div>
                    <label className="font-semibold capitalize">Name</label>
                    <MultiSelect
                      options={originRange}
                      value={selected}
                    onChange={setSelected}
                      labelledBy="Select"
                    />
                  </div>
                  <div>
                    <label className="font-semibold capitalize">Grade</label>
                    <MultiSelect
                      options={originRange}
                      value={selected}
                    onChange={setSelected}
                      labelledBy="Select"
                    />
                  </div>
                  <div>
                    <label className="font-semibold capitalize">Roast Level</label>
                    <MultiSelect
                      options={originRange}
                      value={selected}
                    onChange={setSelected}
                      labelledBy="Select"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4">
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
                  Next
                </button>
              </div>
            </div>
            <div class="tab-pane fade" id="details" role="tabpanel" aria-labelledby="details-tab">...</div>
            <div class="tab-pane fade" id="confirmation" role="tabpanel" aria-labelledby="confirmation-tab">...</div>
          </form>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
  )
}

export default AddBeanModal
