import React, { useEffect, useCallback, useState, useContext, useRef } from 'react'
import { MultiSelect } from "react-multi-select-component";
import { PencilAltIcon, XIcon } from '@heroicons/react/outline'
import { AccountContext } from '../../context/Account';
import { CustomRangesContext } from '../../context/CustomRanges';
import { BeansContext } from '../../context/Beans';
import { escapeHtml } from '../../utils/HtmlConverter'
import './Modals.scss'

const AddBeanModal = ({setOpenThisModal}) => {
  const { userData } = useContext(AccountContext);
  const { customRanges, insertEntry } = useContext(CustomRangesContext);
  const { beans, insertBean } = useContext(BeansContext);
  const roasterRange = Object.values(customRanges.roaster_range);
  const originRange = Object.values(customRanges.origin_range);
  const farmRange = Object.values(customRanges.farm_range);
  const processRange = Object.values(customRanges.process_range);
  const aromaRange = Object.values(customRanges.aroma_range);
  const varietyRange = Object.values(customRanges.variety_range);
  const beansRange = Object.values(beans).map((
    { coffee_bean_id: value, ...rest }) => ({ value, ...rest } ));
  
  const [name, innerSetName] = useState('');
  const [grade, innerSetGrade] = useState('');
  const [roastLevel, innerSetRoastLevel] = useState('');
  const [roastDate, setRoastDate] = useState('');
  const [harvestPeriod, innerSetHarvestPeriod] = useState('');
  const [altitude, innerSetAltitude] = useState('');
  const [isSingleOrigin, setIsSingleOrigin] = useState(false);
  const [memo, innerSetMemo] = useState('');

  const [selectedOrigin, setSelectedOrigin] = useState([]);
  const [selectedRoaster, setSelectedRoaster] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState([]);
  const [selectedProcess, setSelectedProcess] = useState([]);
  const [selectedAroma, setSelectedAroma] = useState([]);
  const [selectedVariety, setSelectedVariety] = useState([]);
  const [selectedBlendBeans, innerSetSelectedBlendBeans] = useState([]);
  const [blendRatios, innerSetBlendRatio] = useState({});
  const [nameWarningText, setNameWarningText] = useState("");
  const [periodWarningText, setPeriodWarningText] = useState("");
  const [altitudeWarningText, setAltitudeWarningText] = useState("");
  const [gradeWarningText, setGradeWarningText] = useState("");
  const [roastLevelWarningText, setRoastLevelWarningText] = useState("");
  const [memoWarningText, setMemoWarningText] = useState("");

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

  const setName = (name) => {
    innerSetName(name);
    const encoded = escapeHtml(name);
    if (encoded.length > 60) {
      setNameWarningText(<span className="text-red">{60 - encoded.length}/60</span>)
    } else {
      setNameWarningText(`${60 - encoded.length}/60`)
    }
  }

  const setHarvestPeriod = (period) => {
    innerSetHarvestPeriod(period);
    const encoded = escapeHtml(period);
    if (encoded.length > 60) {
      setPeriodWarningText(<span className="text-red">{60 - encoded.length}/60</span>)
    } else {
      setPeriodWarningText(`${60 - encoded.length}/60`)
    }
  }

  const setAltitude = (altitude) => {
    innerSetAltitude(altitude);
    const encoded = escapeHtml(altitude);
    if (encoded.length > 60) {
      setAltitudeWarningText(<span className="text-red">{60 - encoded.length}/60</span>)
    } else {
      setAltitudeWarningText(`${60 - encoded.length}/60`)
    }
  }

  const setGrade = (grade) => {
    innerSetGrade(grade);
    if (grade < 0.0 || grade > 100.0) {
      setGradeWarningText(<span className="text-red">* Please enter a number between 0.0 and 100.0"</span>)
    } else {
      setGradeWarningText("")
    }
  }

  const setRoastLevel = (level) => {
    innerSetRoastLevel(level);
    if (level < 0.0 || level > 10.0) {
      setRoastLevelWarningText(<span className="text-red">* Please enter a number between 0.0 and 10.0</span>)
    } else {
      setRoastLevelWarningText("")
    }
  }

  const setMemo = (memo) => {
    innerSetMemo(memo);
    const encoded = escapeHtml(memo);
    if (encoded.length > 400) {
      setMemoWarningText(<span className="text-red">{400 - encoded.length}/400</span>)
    } else {
      setMemoWarningText(`${400 - encoded.length}/400`)
    }
  }

  // To toggle click from the Next button
  const baseInfoTab = useRef(null);
  
  const showBaseInfoSection = () => 
    baseInfoTab.current.click();

  const detailsTab = useRef(null);
  
  const showDetailsSection = () => 
    detailsTab.current.click();

  const confirmationTab = useRef(null);

  const showConfirmationSection = () =>
    confirmationTab.current.click();

  const [canGoToConfirmation, setCanGoToConfirmation] = useState(false);
  const checkCanGoToConfirmation = useCallback(() => {
    if (isSingleOrigin && selectedOrigin.length > 0)
      setCanGoToConfirmation(true);
    else if (!isSingleOrigin && selectedBlendBeans.length > 0)
      setCanGoToConfirmation(true);
    else setCanGoToConfirmation(false);
  }, [isSingleOrigin, selectedBlendBeans.length, selectedOrigin.length]);

  const makeBeanFinalVersion = () => {
    const makeIdList = (selectedRange, category) => {
      const idList = [];
      selectedRange.forEach(range => {
        for (const [id, entry] of Object.entries(customRanges[category + '_range'])) {
          if (entry['label'] === range['label']) {
            idList.push(parseInt(entry['value']));
          }
        }
      })
      return idList;
    }
    let bean = {
      "label": name,
      "single_origin": isSingleOrigin,
      "grade": grade === "" ? null : grade,
      "roast_level": roastLevel === "" ? null : roastLevel,
      "memo": memo,
      "roast_date": roastDate.length > 0 ? roastDate : null,
      "roaster": makeIdList(selectedRoaster, "roaster"),
      "aroma": makeIdList(selectedAroma, "aroma"),
    }
    if (isSingleOrigin) {
      bean["blend_ratio"] = null;
      bean["origin"] = makeIdList(selectedOrigin, "origin");
      bean["farm"] = makeIdList(selectedFarm, "farm");
      bean["variety"] = makeIdList(selectedVariety, "variety");
      bean["process"] = makeIdList(selectedProcess, "process");
      bean["altitude"] = altitude;
      bean["harvest_date"] = harvestPeriod;
    } else {
      bean["blend_ratio"] = blendRatios;
      bean["origin"] = null;
      bean["farm"] = null;
      bean["variety"] = null;
      bean["process"] = null;
      bean["altitude"] = null;
      bean["harvest_date"] = null;
    }
    return bean;
  }

  const getNewRangeList = (selectedRange) => {
    let newRanges = selectedRange.filter((x) => "__isNew__" in x);
    return newRanges;
  }

  const insertNewRanges = async () => {
    let newRanges = {
      'origin': getNewRangeList(selectedOrigin),
      'roaster': getNewRangeList(selectedRoaster),
      'farm': getNewRangeList(selectedFarm),
      'process': getNewRangeList(selectedProcess),
      'aroma': getNewRangeList(selectedAroma),
      'variety': getNewRangeList(selectedVariety)
    }

    for (const [category, entries] of Object.entries(newRanges)) {
      entries.forEach(entry => {
        try {
          let body = { "label": entry.label, "def": "" };
          insertEntry(userData.sub, category, body);
        } catch (error) {
          console.log('error: ', error)
        }
      });
    }
  }

  const insertNewBean = async () => {
    const bean = makeBeanFinalVersion();
    const insertSuccess = await insertBean(userData.sub, bean);
    if (insertSuccess)
      setOpenThisModal(false);
  }

  // To enable/disable Next button to go to confirmation section
  useEffect(() => {
    checkCanGoToConfirmation();
  }, [isSingleOrigin, selectedOrigin, selectedBlendBeans, checkCanGoToConfirmation]);


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
  }, [selectedBlendBeans, blendRatios]);

  return (
    <>
    <div
      className="justify-center flex overflow-x-hidden 
      overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">

      <div 
        className="relative h-fit w-full max-w-6xl px-2 my-16 mx-auto">
        <div 
          className="w-full border-0 rounded-lg shadow-lg relative 
          flex flex-col bg-white outline-none focus:outline-none">

          {/*header*/}
          <div className="py-8">
            <h3 className="text-lg font-light text-center font-capitals uppercase">
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
              role="presentation"
              key="base-info">
              <button 
                className="active w-full h-full py-2 
                text-white bg-burnt-sienna opacity-50" 
                id="base-info-tab" 
                data-bs-toggle="tab" 
                data-bs-target="#base-info" 
                type="button" 
                role="tab" 
                aria-controls="base-info" 
                aria-selected="true"
                ref={baseInfoTab}>
                Base Info
              </button>
            </li>
            <li 
              className="nav-item w-1/3" 
              role="presentation"
              key="details">
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
              role="presentation"
              key="confirmation">
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
                disabled={!canGoToConfirmation}
                onClick={insertNewRanges}>
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
                    <label className="font-semibold uppercase">Name</label>
                    <span className="ml-2 text-xs">* Required</span>
                    <input 
                      type="text" 
                      name="label" 
                      placeholder="e.g. Seasonal House Blend" 
                      className="blue-outline-transition bg-creme 
                      block w-full text-base py-2 px-3 rounded-md border-1"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                    <span className="text-xs float-right mt-1">{nameWarningText}</span>
                  </div>
                  <div className="form-section">
                    <label className="font-semibold uppercase">Grade (0.0 - 100.0)</label>
                    <span className="ml-2 text-xs">{gradeWarningText}</span>
                    <input 
                      type="number" 
                      step="0.1"
                      name="grade" 
                      placeholder="e.g. 85.5" 
                      className="blue-outline-transition bg-creme 
                      block w-full text-base py-2 px-3 rounded-md border-1"
                      value={grade}
                      onChange={e => {
                        setGrade(e.target.value)
                      }}
                    />
                  </div>
                  <div className="form-section">
                    <label className="font-semibold uppercase">Roast Level (0.0 - 10.0)</label>
                    <span className="ml-2 text-xs">{roastLevelWarningText}</span>
                    <input 
                      type="number" 
                      step="0.1" 
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
                    <label className="font-semibold uppercase">Roaster</label>
                    <MultiSelect
                      options={roasterRange}
                      value={selectedRoaster}
                      onChange={setSelectedRoaster}
                      isCreatable={true}
                      labelledBy="Select"
                    />
                  </div>
                  <div className="form-section">
                    <label className="font-semibold uppercase">Roast Date</label>
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
                  className="border-2 border-red text-red opacity-80 
                  hover:opacity-100 font-bold uppercase text-sm 
                  px-6 py-2 rounded-3xl ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setOpenThisModal(false)}
                > Cancel </button>
                <button
                  type="button"
                  disabled={name === ''}
                  className="border-2 border-blue bg-blue text-white opacity-80 hover:opacity-100 font-bold blue-button
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
                    <label className="font-semibold uppercase">Blend of</label>
                    <span className="ml-2 text-xs">*Required</span>
                    <MultiSelect
                      labelledBy="Select"
                      options={beansRange}
                      value={selectedBlendBeans}
                      onChange={e => setSelectedBlendBeans(e)}
                    />
                  </div>
                  <div className="form-section my-4">
                    <label className="font-semibold uppercase divider">Blend Ratio</label>
                    <div>
                      { blendRatioElements }
                    </div>
                  </div>
                </div>

                <div className="w-1/2">
                  <div className="form-section">
                    <label className="font-semibold uppercase">Aroma</label>
                    <MultiSelect
                      labelledBy="Select"
                      options={aromaRange}
                      value={selectedAroma}
                      isCreatable={true}
                      onChange={setSelectedAroma}
                    />
                  </div>
                  <div className="form-section">
                    <label className="font-semibold uppercase">Memo</label>
                    <textarea 
                      name="memo" 
                      placeholder="e.g. Where you bought this coffee, the price, how you like it, not liked it..." 
                      className=" h-40 blue-outline-transition bg-creme 
                      block w-full text-base py-2 px-3 rounded-md border-1"
                      value={memo}
                      onChange={e => setMemo(e.target.value)}
                    />
                    <span className="text-xs float-right mt-1">{memoWarningText}</span>
                  </div>
                </div>
              </div>

              <div className={`flex px-8 my-8 ${isSingleOrigin ? "" : "hidden"}`}>
                <div className="flex flex-col w-1/2">
                  <div className="form-section">
                    <label className="font-semibold uppercase">Origin</label>
                    <span className="ml-2 text-xs">*Required</span>
                    <MultiSelect
                      options={originRange}
                      value={selectedOrigin}
                      onChange={setSelectedOrigin}
                      isCreatable={true}
                      labelledBy="Select"
                    />
                  </div>

                  <div className="form-section">
                    <label className="font-semibold uppercase">Farm</label>
                    <MultiSelect
                      options={farmRange}
                      value={selectedFarm}
                      onChange={setSelectedFarm}
                      isCreatable={true}
                      labelledBy="Select"
                    />
                  </div>

                  <div className="form-section">
                    <label className="font-semibold uppercase">Variety</label>
                    <MultiSelect
                      options={varietyRange}
                      value={selectedVariety}
                      onChange={setSelectedVariety}
                      isCreatable={true}
                      labelledBy="Select"
                    />
                  </div>

                  <div className="form-section">
                    <label className="font-semibold uppercase">Harvest Period</label>
                    <input 
                      type="text" 
                      name="harvest-period" 
                      placeholder="e.g. Sep 2020" 
                      className="blue-outline-transition bg-creme 
                      block w-full text-base py-2 px-3 rounded-md border-1"
                      value={harvestPeriod}
                      onChange={e => setHarvestPeriod(e.target.value)}
                    />
                    <span className="text-xs float-right mt-1">{periodWarningText}</span>
                  </div>

                  <div className="form-section">
                    <label className="font-semibold uppercase">Altitude</label>
                    <input 
                      type="text" 
                      name="altitude" 
                      placeholder="e.g. 4000 MASL" 
                      className="blue-outline-transition bg-creme 
                      block w-full text-base py-2 px-3 rounded-md border-1"
                      value={altitude}
                      onChange={e => setAltitude(e.target.value)}
                    />
                    <span className="text-xs float-right mt-1">{altitudeWarningText}</span>
                  </div>
                </div>

                <div className="w-1/2">
                  <div className="form-section">
                    <label className="font-semibold uppercase">Process</label>
                    <MultiSelect
                      options={processRange}
                      value={selectedProcess}
                      onChange={setSelectedProcess}
                      isCreatable={true}
                      labelledBy="Select"
                    />
                  </div>

                  <div className="form-section">
                    <label className="font-semibold uppercase">Aroma</label>
                    <MultiSelect
                      options={aromaRange}
                      value={selectedAroma}
                      onChange={setSelectedAroma}
                      isCreatable={true}
                      labelledBy="Select"
                    />
                  </div>

                  <div className="form-section">
                    <label className="font-semibold uppercase">Memo</label>
                    <textarea 
                      name="memo" 
                      placeholder="e.g. Where you bought this coffee, the price and weight" 
                      className=" h-40 blue-outline-transition bg-creme 
                      block w-full text-base py-2 px-3 rounded-md border-1"
                      value={memo}
                      onChange={e => setMemo(e.target.value)}
                    />
                    <span className="text-xs float-right mt-1">{memoWarningText}</span>
                  </div>

                </div>
              </div>

              <div className="flex items-center justify-between pl-8 pr-8 pb-8">
                <button
                  className="border-2 border-red text-red opacity-80 
                  hover:opacity-100 font-bold uppercase text-sm 
                  px-6 py-2 rounded-3xl ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setOpenThisModal(false)}
                > Cancel </button>
                <button
                  className="border-2 border-blue bg-blue text-white opacity-80 hover:opacity-100 font-bold blue-button
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
                
              <div className="px-8 my-10">
                <div className="flex">
                  <div className="flex flex-col w-1/2">
                    <div>
                      <div className="flex mx-4 mb-4">
                        <h3 className="text-lg uppercase font-capitals">Base Info</h3>
                        <button
                          type="button"
                          className="opacity-80 hover:opacity-100 
                          ease-linear transition-all duration-150"
                          onClick={showBaseInfoSection} > 
                          <PencilAltIcon className="h-5 w-5 ml-4" />
                        </button>
                      </div>
                      <div className="m-8">
                        <div className="confirm-section">
                          <label className="text-xs font-semibold uppercase">Name</label>
                          <p className="">{name}</p>
                        </div>

                        <div className="confirm-section">
                          <label className="text-xs font-semibold uppercase">Single Origin</label>
                          <p>{isSingleOrigin ? 'Yes' : 'No'}</p>
                        </div>

                        <div className="confirm-section">
                          <label className="text-xs font-semibold uppercase">Grade (0 - 100)</label>
                          <p>{grade ? grade : 'Not Entered'}</p>
                        </div>

                        <div className="confirm-section">
                          <label className="text-xs font-semibold uppercase">Roaster</label>
                          <div className="tag-section">
                            {selectedRoaster.length <= 0 ? 
                              <p>Not Selected</p> :
                            selectedRoaster.map((roaster) => (
                                <span>{roaster.label}</span>
                            ))}
                          </div>
                        </div>

                        <div className="confirm-section">
                          <label className="text-xs font-semibold uppercase">Roast Level (0 - 10)</label>
                          <p>{roastLevel? roastLevel : 'Not Entered'}</p>
                        </div>

                        <div className="confirm-section">
                          <label className="text-xs font-semibold uppercase">Roast Date</label>
                          <p>{roastDate ? roastDate : 'Not Entered'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-1/2">
                    <div className="flex mx-4 mb-4">
                      <h3 className="text-lg uppercase font-capitals">Details</h3>
                      <button
                        type="button"
                        disabled={name === ''}
                        className="opacity-80 hover:opacity-100 
                        ease-linear transition-all duration-150"
                        onClick={showDetailsSection} > 
                        <PencilAltIcon className="h-5 w-5 ml-4" />
                      </button>
                    </div>
                    <div className="m-8">
                      { isSingleOrigin ? 
                        <>
                        <div className="confirm-section">
                          <label className="text-xs font-semibold uppercase">Origin</label>
                          <div className="tag-section">
                          {selectedOrigin.map((entry) => (
                              <span>{entry.label}</span>
                          ))}
                          </div>
                        </div>

                        <div className="confirm-section">
                          <label className="text-xs font-semibold uppercase">Farm</label>
                          <div className="tag-section">
                          {selectedFarm.length <= 0 ? 
                            <p>Not Selected</p> :
                          selectedFarm.map((entry) => (
                              <span>{entry.label}</span>
                          ))}
                          </div>
                        </div>

                        <div className="confirm-section">
                          <label className="text-xs font-semibold uppercase">Variety</label>
                          <div className="tag-section">
                          {selectedVariety.length <= 0 ? 
                            <p>Not Selected</p> :
                          selectedVariety.map((entry) => (
                              <span>{entry.label}</span>
                          ))}
                          </div>
                        </div>

                        <div className="confirm-section">
                          <label className="text-xs font-semibold uppercase">Harvest Period</label>
                          <p>{harvestPeriod? harvestPeriod : 'Not Entered'}</p>
                        </div>

                        <div className="confirm-section">
                          <label className="text-xs font-semibold uppercase">Altitude</label>
                          <p>{altitude? altitude : 'Not Entered'}</p>
                        </div>

                        <div className="confirm-section">
                          <label className="text-xs font-semibold uppercase">Process</label>
                          <div className="tag-section">
                          {selectedProcess.length <= 0 ? 
                            <p>Not Selected</p> :
                          selectedProcess.map((entry) => (
                              <span>{entry.label}</span>
                          ))}
                          </div>
                        </div>

                        <div className="confirm-section">
                          <label className="text-xs font-semibold uppercase">Aroma</label>
                          <div className="tag-section">
                          {selectedAroma.length <= 0 ? 
                            <p>Not Selected</p> :
                          selectedAroma.map((entry) => (
                              <span>{entry.label}</span>
                          ))}
                          </div>
                        </div>
                        </>
                        : 
                        // Blend Beans
                        <>
                        <div className="confirm-section">
                          <label className="text-xs font-semibold uppercase">Aroma</label>
                          <div className="tag-section">
                          {selectedAroma.length <= 0 ? 
                            <p>Not Selected</p> :
                          selectedAroma.map((entry) => (
                            <span>{entry.label}</span>
                          ))}
                          </div>
                        </div>

                        <div className="confirm-section">
                          <label className="text-xs font-semibold uppercase">Blend Ratio</label>
                          <div className="tag-section">
                          {selectedBlendBeans.map((entry) => (
                            <span>{entry.label}: {blendRatios[entry.value]}%</span>
                          ))}
                          </div>
                        </div>
                        </>
                      }
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mx-6 my-2">
                    <div className="w-full">
                      <h3 className="text-md uppercase font-capitals inline">Memo</h3>
                      <p className="inline relative">
                        <button
                          type="button"
                          disabled={name === ''}
                          className="absolute left-1 opacity-80 
                          hover:opacity-100 ease-linear transition-all duration-150"
                          onClick={showDetailsSection} > 
                          <PencilAltIcon className="h-5 w-5" />
                        </button>
                      </p>
                      <p className="inline ml-8">: {memo ? memo : 'Not Entered'}</p>
                    </div>
                  </div>
                </div>
              </div>


              <div className="flex items-center justify-between px-8 py-8">
                <button
                  className="border-2 border-red text-red opacity-80 
                  hover:opacity-100 font-bold uppercase text-sm 
                  px-6 py-2 rounded-3xl ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setOpenThisModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="border-2 border-blue bg-blue text-white opacity-80 
                  hover:opacity-100 font-bold uppercase text-sm 
                  px-6 py-2 rounded-3xl ease-linear transition-all duration-150"
                  type="button"
                  onClick={insertNewBean}
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
