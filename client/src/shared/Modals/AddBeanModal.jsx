import React, { useEffect, useState, useContext, useRef } from 'react'
import { MultiSelect } from "react-multi-select-component";
import { XIcon } from '@heroicons/react/outline'
import { CustomRangesContext } from '../../context/CustomRanges';
import { BeansContext } from '../../context/Beans';
import './Modals.scss'

const AddBeanModal = ({setOpenThisModal}) => {
  const { customRanges } = useContext(CustomRangesContext);
  const { beans } = useContext(BeansContext);

  const roasterRange = Object.values(customRanges.roaster_range);
  const originRange = Object.values(customRanges.origin_range);
  const farmRange = Object.values(customRanges.farm_range);
  const aromaRange = Object.values(customRanges.aroma_range);
  const varietyRange = Object.values(customRanges.variety_range);
  const beansRange = Object.values(beans).map((
    { coffee_bean_id: value, ...rest }) => ({ value, ...rest } ));
  
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [roastLevel, setRoastLevel] = useState('');
  const [roastDate, setRoastDate] = useState('');
  const [harvestPeriod, setHarvestPeriod] = useState('');
  const [altitude, setAltitude] = useState('');
  const [isSingleOrigin, setIsSingleOrigin] = useState(false);
  const [memo, setMemo] = useState('');

  // multi select
  const [selectedOrigin, setSelectedOrigin] = useState([]);
  const [selectedRoasterRange, setSelectedRoasterRange] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState([]);
  const [selectedAroma, setSelectedAroma] = useState([]);
  const [selectedVariety, setSelectedVariety] = useState([]);
  const [selectedBlendBeans, innerSetSelectedBlendBeans] = useState([]);
  const [blendRatios, innerSetBlendRatio] = useState({});

  const setSelectedBlendBeans = (e) => {
    innerSetSelectedBlendBeans(e);
    // If parameter e contains the newly selected BlendBean,
    // it must be found and set it in the blendRatio with the value of zero
    e.forEach(bean => {
      let found = false;
      for (const beanId of Object.keys(blendRatios))
        if (bean.value === beanId) found = true;
      if (!found) {
        let newBean = {};
        newBean[bean.value] = '0';
        setBlendRatio(newBean);
      }
    })
  }
  
  const setBlendRatio = (newRatio) => {
    innerSetBlendRatio(blendRatios => (
      { ...blendRatios, ...newRatio }
    ));
  }

  let blendRatioElements = makeBlendRatioElements(selectedBlendBeans, blendRatios, setBlendRatio);

  // To toggle click from the Next button
  const detailsTab = useRef(null);
  const showDetailsSection = () => { detailsTab.current.click() }

  const confirmationTab = useRef(null);
  const showConfirmationSection = () => { confirmationTab.current.click() }

  const [canGoToConfirmation, setCanGoToConfirmation] = useState(false);
  const checkCanGoToConfirmation = () => {
    if (isSingleOrigin && selectedOrigin.length > 0)
      setCanGoToConfirmation(true);
    else if (!isSingleOrigin && selectedBlendBeans.length > 0)
      setCanGoToConfirmation(true);
    else setCanGoToConfirmation(false);
  }

  // To enable/disable Next button to go to confirmation section
  useEffect(() => {
    checkCanGoToConfirmation();
  }, [isSingleOrigin, selectedOrigin, selectedBlendBeans]);

  // To delete unselected BlendBean from the blendRatios object
  useEffect(() => {
    if (Object.keys(blendRatios).length > 0) {
      for (const beanId of Object.keys(blendRatios)) {
        let found = false;
        selectedBlendBeans.forEach(selectedBean => {
          if (selectedBean.value === beanId) found = true;
        });
        if (!found) delete blendRatios[beanId];
      };
    }
  }, [selectedBlendBeans]);

  return (
    <>
    <div
      className="justify-center items-center flex overflow-x-hidden 
      overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">

      <div 
        className="w-full max-w-6xl relative my-6 mx-auto">
        <div 
          className="w-full border-0 rounded-lg shadow-lg relative 
          flex flex-col bg-white outline-none focus:outline-none">

          {/*header*/}
          <div className="py-8">
            <h3 className="text-xl font-light text-center">
              Add New Coffee Beans
            </h3>
            <button
              className="absolute right-4 top-4 border-0 text-black float-right"
              onClick={() => setOpenThisModal(false)}>
              <XIcon className="h-6 w-6"/>
            </button>
          </div>

          {/*body*/}
          <ul 
            className="nav nav-tabs text-center" 
            id="myTab" 
            role="tablist">
            <li 
              className="nav-item w-1/3" 
              role="presentation">
              <button 
                className="active w-full h-full py-2 
                text-white bg-burnt-sienna opacity-50" 
                id="base-info-tab" 
                data-bs-toggle="tab" 
                data-bs-target="#base-info" 
                type="button" 
                role="tab" 
                aria-controls="base-info" 
                aria-selected="true">
                Base Info
              </button>
            </li>
            <li 
              className="nav-item w-1/3" 
              role="presentation">
              <button 
                className="w-full h-full py-2 
                text-white bg-burnt-sienna opacity-50" 
                id="details-tab" 
                data-bs-toggle="tab" 
                data-bs-target="#details" 
                type="button" 
                role="tab" 
                aria-controls="details" 
                aria-selected="false"
                ref={detailsTab}
                disabled={name === ''}>
                Details
              </button>
            </li>
            <li 
              className="nav-item w-1/3" 
              role="presentation">
              <button 
                className="w-full h-full py-2 
                text-white bg-burnt-sienna opacity-50" 
                id="confirmation-tab" 
                data-bs-toggle="tab" 
                data-bs-target="#confirmation" 
                type="button" 
                role="tab" 
                aria-controls="confirmation" 
                aria-selected="false"
                ref={confirmationTab}
                disabled={!canGoToConfirmation}>
                Confirmation
              </button>
            </li>
          </ul>
          
          <form 
            className="tab-content" 
            id="myTabContent">
            <div 
              className="tab-pane fade show active" 
              id="base-info"
              data-testid="base-info"
              role="tabpanel" 
              aria-labelledby="base-info-tab">

              <div className="flex px-8 my-8">
                <div className="flex flex-col w-1/2">
                  <div className="form-section">
                    <label className="font-semibold capitalize">Name</label>
                    <input 
                      type="text" 
                      name="label" 
                      placeholder="e.g. Seasonal House Blend" 
                      className="blue-outline-transition bg-creme 
                      block w-full text-base py-2 px-3 rounded-md border-1"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-section">
                    <label 
                      className="font-semibold capitalize">
                      Grade (0 - 100)
                    </label>
                    <input 
                      type="text" 
                      name="grade" 
                      placeholder="e.g. 85.5" 
                      className="blue-outline-transition bg-creme 
                      block w-full text-base py-2 px-3 rounded-md border-1"
                      value={grade}
                      onChange={e => setGrade(e.target.value)}
                    />
                  </div>
                  <div className="form-section">
                    <label 
                      className="font-semibold capitalize">
                      Roast Level (0 - 10)
                    </label>
                    <input 
                      type="text" 
                      name="roastlevel" 
                      placeholder="e.g. 6.5" 
                      className="blue-outline-transition bg-creme 
                      block w-full text-base py-2 px-3 rounded-md border-1"
                      value={roastLevel}
                      onChange={e => setRoastLevel(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="form-section h-1/3 flex items-end justify-start">
                    <div className="mb-2">
                      <input type="checkbox" 
                        name="single_origin" 
                        id="single_origin" 
                        className="mr-2"
                        onChange={e => { setIsSingleOrigin(e.target.checked) }}
                      />
                      <label className="capitalize">Single Origin</label>
                    </div>
                  </div>
                  <div className="form-section">
                    <label className="font-semibold capitalize">Roaster</label>
                    <MultiSelect
                      options={roasterRange}
                      value={selectedRoasterRange}
                      onChange={setSelectedRoasterRange}
                      labelledBy="Select"
                    />
                  </div>
                  <div className="form-section">
                    <label className="font-semibold capitalize">Roast Date</label>
                    <input 
                      type="date" 
                      name="roastdate" 
                      placeholder="e.g. 2021-12-10" 
                      className="blue-outline-transition bg-creme 
                      block w-full text-base py-2 px-3 rounded-md border-1"
                      value={roastDate}
                      onChange={e => setRoastDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pl-8 pr-8 pb-8">
                <button
                  className="text-red-500 background-transparent 
                  font-bold uppercase px-6 py-2 text-sm outline-none 
                  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setOpenThisModal(false)}
                > Cancel </button>
                <button
                  type="button"
                  disabled={name === ''}
                  className="bg-blue text-white opacity-80 hover:opacity-100 font-bold blue-button
                  uppercase text-sm px-6 py-2 rounded-3xl button-transition"
                  onClick={showDetailsSection}
                > Next </button>
              </div>
            </div>

            <div className="tab-pane fade" 
              id="details"
              data-testid="details"
              role="tabpanel" 
              aria-labelledby="details-tab">

              <div className={`flex px-8 my-8 ${isSingleOrigin ? "hidden" : ""}`}>
                <div className="flex flex-col w-1/2">
                  <div className="form-section">
                    <label className="font-semibold capitalize">Blend of</label>
                    <MultiSelect
                      labelledBy="Select"
                      options={beansRange}
                      value={selectedBlendBeans}
                      onChange={e => setSelectedBlendBeans(e)}
                    />
                  </div>
                  <div className="form-section my-4">
                    <label className="font-semibold capitalize divider">Blend Ratio</label>
                    <div>
                      { blendRatioElements }
                    </div>
                  </div>
                </div>

                <div className="w-1/2">
                  <div className="form-section">
                    <label className="font-semibold capitalize">Aroma</label>
                    <MultiSelect
                      labelledBy="Select"
                      options={aromaRange}
                      value={selectedAroma}
                      onChange={setSelectedAroma}
                    />
                  </div>
                  <div className="form-section">
                    <label className="font-semibold capitalize">Memo</label>
                    <textarea 
                      name="memo" 
                      placeholder="e.g. Where you bought this coffee, the price, how you like it, not liked it..." 
                      className=" h-40 blue-outline-transition bg-creme 
                      block w-full text-base py-2 px-3 rounded-md border-1"
                      value={memo}
                      onChange={e => setMemo(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className={`flex px-8 my-8 ${isSingleOrigin ? "" : "hidden"}`}>
                <div className="flex flex-col w-1/2">
                  <div className="form-section">
                    <label className="font-semibold capitalize">Origin</label>
                    <MultiSelect
                      options={originRange}
                      value={selectedOrigin}
                      onChange={setSelectedOrigin}
                      labelledBy="Select"
                    />
                  </div>

                  <div className="form-section">
                    <label className="font-semibold capitalize">Farm</label>
                    <MultiSelect
                      options={farmRange}
                      value={selectedFarm}
                      onChange={setSelectedFarm}
                      labelledBy="Select"
                    />
                  </div>

                  <div className="form-section">
                    <label className="font-semibold capitalize">Variety</label>
                    <MultiSelect
                      options={varietyRange}
                      value={selectedVariety}
                      onChange={setSelectedVariety}
                      labelledBy="Select"
                    />
                  </div>

                  <div className="form-section">
                    <label className="font-semibold capitalize">Harvest Period</label>
                    <input 
                      type="text" 
                      name="harvest-period" 
                      placeholder="e.g. Sep 2020" 
                      className="blue-outline-transition bg-creme 
                      block w-full text-base py-2 px-3 rounded-md border-1"
                      value={harvestPeriod}
                      onChange={e => setHarvestPeriod(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-1/2">
                  <div className="form-section">
                    <label className="font-semibold capitalize">Altitude</label>
                    <input 
                      type="text" 
                      name="altitude" 
                      placeholder="e.g. 4000 MASL" 
                      className="blue-outline-transition bg-creme 
                      block w-full text-base py-2 px-3 rounded-md border-1"
                      value={altitude}
                      onChange={e => setAltitude(e.target.value)}
                    />
                  </div>

                  <div className="form-section">
                    <label className="font-semibold capitalize">Aroma</label>
                    <MultiSelect
                      options={aromaRange}
                      value={selectedAroma}
                      onChange={setSelectedAroma}
                      labelledBy="Select"
                    />
                  </div>

                  <div className="form-section">
                    <label className="font-semibold capitalize">Memo</label>
                    <textarea 
                      name="memo" 
                      placeholder="e.g. Where you bought this coffee, the price and weight" 
                      className=" h-40 blue-outline-transition bg-creme 
                      block w-full text-base py-2 px-3 rounded-md border-1"
                      value={memo}
                      onChange={e => setMemo(e.target.value)}
                    />
                  </div>

                </div>
              </div>

              <div className="flex items-center justify-between pl-8 pr-8 pb-8">
                <button
                  className="text-red-500 background-transparent 
                  font-bold uppercase px-6 py-2 text-sm outline-none 
                  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setOpenThisModal(false)}
                > Cancel </button>
                <button
                  className="bg-blue text-white opacity-80 hover:opacity-100 font-bold blue-button
                  uppercase text-sm px-6 py-2 rounded-3xl button-transition"
                  type="button"
                  disabled={!canGoToConfirmation}
                  onClick={showConfirmationSection}
                > Next </button>
              </div>
            </div>

            <div 
              className="tab-pane fade" 
              id="confirmation" 
              role="tabpanel" 
              aria-labelledby="confirmation-tab">
                
              <div className="flex px-8 my-8">
                <div className="flex flex-col w-1/2">
                  <div className="mb-10">
                    <div className="mx-4 mb-4 confirm-divider">
                      <h3 className="text-xl pb-4">Base Info</h3>
                    </div>
                    <div className="confirm-section">
                      <label className="font-semibold capitalize">Name</label>
                      <p className="">Seasonal House Blend</p>
                    </div>
                    <div className="confirm-section">
                      <label className="font-semibold capitalize">Grade (0 - 100)</label>
                      <p>85.5</p>
                    </div>
                    <div className="confirm-section">
                      <label className="font-semibold capitalize">Roast Level (0 - 10)</label>
                      <p>6.5</p>
                    </div>
                    <div className="confirm-section">
                      <label className="font-semibold capitalize">Single Origin</label>
                      <p>Yes</p>
                    </div>
                    <div className="confirm-section">
                      <label className="font-semibold capitalize">Roast Date</label>
                      <p>2021-12-10</p>
                    </div>
                  </div>
                  <div>
                    <div className="mx-4 mb-4 confirm-divider">
                      <h3 className="text-xl pb-4">Memo</h3>
                    </div>
                    <div className="confirm-section">
                    <div className="w-full">
                      <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure r</p>
                    </div>
                  </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="mx-4 mb-4 confirm-divider">
                    <h3 className="text-xl pb-4">Details</h3>
                  </div>
                  <div className="confirm-section">
                    <div className="w-full">
                      <label className="block font-semibold capitalize pb-2">Blend Ratio</label>
                      <div>
                        <div className="flex justify-between items-center py-2">
                          <label className="pl-3">Kenya</label>
                          <p>80%</p>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <label className="pl-3">Kenya</label>
                          <p>20%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="flex items-center justify-between pl-8 pr-8 pb-8">
                <button
                  className="text-red-500 background-transparent 
                  font-bold uppercase px-6 py-2 text-sm outline-none 
                  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setOpenThisModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue text-white opacity-80 
                  hover:opacity-100 font-bold uppercase text-sm 
                  px-6 py-2 rounded-3xl ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setOpenThisModal(false)}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
  )
}

const makeBlendRatioElements = (selectedBeans, blendRatios, setBlendRatio) => {
  const elements = []

  if (selectedBeans.length <= 0) {
    elements.push(
    <div className="py-2">
      <p>Beans are not selected.</p>
    </div>
    );
  }
  selectedBeans.forEach(bean => {
    let newRatio = {};
    elements.push(
      <div className="flex justify-between items-center py-2">
      <label className="text-sm">{bean.label}</label>
      <div className="percent-char">
        <input 
          type="text" 
          name={bean.value}
          id={bean.value}
          placeholder="e.g. 85.5" 
          className="inline blue-outline-transition 
          bg-creme text-base py-2 px-3 rounded-md border-1"
          value={blendRatios[bean.value]}
          onChange={e => {
            newRatio[bean.value] = e.target.value;
            setBlendRatio(newRatio);
          }}
        />
      </div>
    </div>
    )
  });
  return elements;
}

export default AddBeanModal
