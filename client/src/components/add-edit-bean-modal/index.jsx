import React, { useEffect, useCallback, useState, useContext, createRef } from 'react'
import { MultiSelect } from "react-multi-select-component";
import { PencilAltIcon, XIcon } from '@heroicons/react/outline'
import { useUserData } from '../../context/AccountContext';
import { useAttributeRangeList, useFetchAttributeRangeList, useInsertAttribute } from '../../context/AttributeRangeContext';
import { useBeanList, useFetchBeanList, useInsertBean } from '../../context/BeansContext';
import {  unescapeHtml, escapeHtml } from '../../utils/HtmlConverter'
import './modals.scss'

const AddBeanModal = ({setOpenThisModal}) => {
  const userData = useUserData()
  const attributeRangeList = useAttributeRangeList() 
  const fetchAttributeRangeList = useFetchAttributeRangeList()
  const insertAttribute = useInsertAttribute()
  const beanList = useBeanList()
  const fetchBeanList = useFetchBeanList()
  const insertBean = useInsertBean()

  const [bean, setBean] = useState({
    single_origin: false,
    label: null,
    grade: null,
    roast_level: null,
    roast_date: null,
    harvest_period: null,
    altitude: null,
    memo: null,
    blend_ratio: {},
    origin: [],
    farm: [],
    variety: [],
    process: [],
    roaster: [],
    aroma: []
  })

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
        const newBean = {};
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

  const setName = (name) => {
    const banned = ['&', '<', '>', '"', "'"];
    let includesBannedChar = false;
    banned.forEach(char => {
      if (name.includes(char)) includesBannedChar = true;
    })
    if (includesBannedChar) {
      setNameWarningText(<span className="text-red">Special characters cannot be used.</span>)
    }
    else if (name.length > 60) {
      setNameWarningText(<span className="text-red">{60 - name.length}/60</span>);
    } 
    else {
      setNameWarningText(`${60 - name.length}/60`);
    }
    setBean({...bean, label: name});  
  }

  const setHarvestPeriod = (period) => {
    setBean({...bean, harvest_period: period})
    const encoded = escapeHtml(period);
    if (encoded.length > 60) {
      setPeriodWarningText(<span className="text-red">{60 - encoded.length}/60</span>)
    } else {
      setPeriodWarningText(`${60 - encoded.length}/60`)
    }
  }

  const setAltitude = (altitude) => {
    const encoded = escapeHtml(altitude);
    if (encoded.length > 60) {
      setAltitudeWarningText(<span className="text-red">{60 - encoded.length}/60</span>)
    } else {
      setAltitudeWarningText(`${60 - encoded.length}/60`)
      setBean({...bean, altitude})
    }
  }

  const setGrade = (grade) => {
    setBean({...bean, grade});
    if (grade < 0.0 || grade > 100.0) {
      setGradeWarningText(<span className="text-red">* Please enter a number between 0.0 and 100.0"</span>)
    } else {
      setGradeWarningText("")
    }
  }

  const setRoastLevel = (level) => {
    setBean({...bean, roast_level: level})
    if (level < 0.0 || level > 10.0) {
      setRoastLevelWarningText(<span className="text-red">* Please enter a number between 0.0 and 10.0</span>)
    } else {
      setRoastLevelWarningText("")
    }
  }

  const setMemo = (memo) => {
    setBean({...bean, memo})
    const encoded = escapeHtml(memo);
    if (encoded.length > 400) {
      setMemoWarningText(<span className="text-red">{400 - encoded.length}/400</span>)
    } else {
      setMemoWarningText(`${400 - encoded.length}/400`)
    }
  }

  const [tabState, setTabState] = useState({
    baseInfoTab: true,
    detailsTab: false,
    confirmationTab: false,
    canGoToConfirmation: false
  });

  const baseInfoPage = createRef(null);
  const detailsPage = createRef(null);
  const confirmationPage = createRef(null);

  const showPage = (pageRef) => {
    pageRef.current.style.opacity = 1;
    pageRef.current.style.height = "auto";
    pageRef.current.style.overflow = "visible";
  }

  const hidePage = (pageRef) => {
    pageRef.current.style.opacity = 0;
    pageRef.current.style.height = 0;
    pageRef.current.style.overflow = "hidden";
  }

  // To toggle click from the Next button
  const setOpenBaseInfoTab = () => {
    showPage(baseInfoPage);
    hidePage(detailsPage);
    hidePage(confirmationPage);
    setTabState({...tabState, baseInfoTab: true, detailsTab: false, confirmationTab: false});
 } 

  const setOpenDetailsTab = () => {
    hidePage(baseInfoPage);
    showPage(detailsPage);
    hidePage(confirmationPage);
    setTabState({...tabState, baseInfoTab: false, detailsTab: true, confirmationTab: false});
  }

  const setOpenConfirmationTab = () => {
    hidePage(baseInfoPage);
    hidePage(detailsPage);
    showPage(confirmationPage);
    setTabState({...tabState, baseInfoTab: false, detailsTab: false, confirmationTab: true});
  }

  const checkCanGoToConfirmation = useCallback(() => {
    if (bean.single_origin && selectedOrigin.length > 0) {
      setTabState({...tabState, canGoToConfirmation: true});
    }
    else if (!bean.single_origin && selectedBlendBeans.length > 0) {
      setTabState({...tabState, canGoToConfirmation: true});
    }
    else {
      setTabState({...tabState, canGoToConfirmation: false});
    }
  }, [bean.single_origin, selectedBlendBeans.length, selectedOrigin.length]);

  const makeIdList = (selectedRange, category) => {
    const idList = [];
    selectedRange.forEach(range => {
      for (const [id, entry] of Object.entries(attributeRangeList[category + '_range'])) {
        if (unescapeHtml(entry['label']) === range['label']) {
          idList.push(parseInt(entry['value']));
        }
      }
    })
    return idList;
  }

  const finalizeBean = () => {
    const roasterIdList = makeIdList(selectedRoaster, "roaster");
    const aromaIdList = makeIdList(selectedAroma, "aroma");
    setBean({...bean, 
      roaster: [...roasterIdList],
      aroma: [...aromaIdList]
    });
    if (bean.single_origin) {
      const originIdList = makeIdList(selectedOrigin, "origin");
      const farmIdList = makeIdList(selectedFarm, "farm");
      const varietyIdList = makeIdList(selectedVariety, "variety");
      const processIdList = makeIdList(selectedProcess, "process");
      
      setBean({...bean, 
        origin: [...originIdList],
        farm: [...farmIdList],
        variety: [...varietyIdList],
        process: [...processIdList],
      });
    } else {
      setBean({...bean, 
        blend_ratio: blendRatios,
      });
    }
  }

  const getNewRangeList = (selectedRange) => {
    let newRangeList = selectedRange.filter((x) => "__isNew__" in x);
    return newRangeList;
  }

  const insertNewRangeList = async () => {
    let newRangeList = {
      'origin': getNewRangeList(selectedOrigin),
      'roaster': getNewRangeList(selectedRoaster),
      'farm': getNewRangeList(selectedFarm),
      'process': getNewRangeList(selectedProcess),
      'aroma': getNewRangeList(selectedAroma),
      'variety': getNewRangeList(selectedVariety)
    }

    for (const [category, entries] of Object.entries(newRangeList)) {
      entries.forEach(entry => {
        try {
          let body = { "label": entry.label, "def": "" };
          insertAttribute(userData.sub, category, body);
        } catch (error) {
          console.log('error: ', error)
        }
      });
    }
  }

  const [processSubmit, setProcessSubmit] = useState(false);

  const onSubmit = () => {
    finalizeBean();
    setProcessSubmit(true);
  }

  useEffect(() => {
    if (Object.keys(attributeRangeList).length === 0) {
      fetchAttributeRangeList(userData.sub);
    }
    if (Object.keys(beanList).length === 0) {
      fetchBeanList(userData.sub);
    }
  }, []);

  useEffect(async () => {
    if (bean.label !== null) {
      const insertSuccess = await insertBean(userData.sub, bean);
      if (insertSuccess)
        setOpenThisModal(false);
    }
  }, [processSubmit])

  // To enable/disable Next button to go to confirmation section
  useEffect(() => {
    checkCanGoToConfirmation();
  }, [bean.single_origin, selectedOrigin, selectedBlendBeans, checkCanGoToConfirmation]);


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
            className="flex">
            <li
              className="nav-item w-1/3" 
              key="base-info">
              <button 
                role="tab"
                type="button" 
                onClick={setOpenBaseInfoTab}
                className={
                  (tabState.baseInfoTab ? "active " : "") + 
                  "w-full h-full py-2 text-white bg-burnt-sienna opacity-50"
                } >
                Base Info
              </button>
            </li>
            <li 
              className="nav-item w-1/3" 
              role="presentation"
              key="details">
              <button                
                role="tab"
                type="button"
                disabled={bean.label === ''}
                onClick={setOpenDetailsTab}
                className={
                  (tabState.detailsTab ? "active " : "") + 
                  "w-full h-full py-2 text-white bg-burnt-sienna opacity-50"
                } >
                Details
              </button>
            </li>
            <li 
              className="nav-item w-1/3" 
              role="presentation"
              key="confirmation">
              <button                
                role="tab"
                type="button"
                disabled={!tabState.canGoToConfirmation}
                onClick={() => {
                  setOpenConfirmationTab();
                  insertNewRangeList();
                }}
                className={
                  (tabState.confirmationTab ? "active " : "") + 
                  "w-full h-full py-2 text-white bg-burnt-sienna opacity-50"
                } >
                Confirmation
              </button>
            </li>
          </ul>
          
          <form className="tab-content" >
            <div 
              ref={baseInfoPage}
              className="ease-linear transition-all duration-300" >
              <div className="flex px-8 my-8">
                <div className="flex flex-col w-1/2">
                  <div className="form-section">
                    <label className="font-semibold uppercase">Name</label>
                    <span className="ml-2 text-sm">* Required</span>
                    <input 
                      type="text" 
                      name="label" 
                      autoComplete="off"
                      placeholder="e.g. Seasonal House Blend" 
                      className="blue-outline-transition bg-creme 
                      block w-full text-base py-2 px-3 rounded-md border-1"
                      value={bean.label}
                      onChange={e => setName(e.target.value)}
                    />
                    <span className="text-sm float-right mt-1">{nameWarningText}</span>
                  </div>
                  <div className="form-section">
                    <label className="font-semibold uppercase">Grade (0.0 - 100.0)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      name="grade"
                      autoComplete="off"
                      placeholder="e.g. 85.5"
                      className="blue-outline-transition bg-creme 
                      block w-full text-base py-2 px-3 rounded-md border-1"
                      value={bean.grade}
                      onChange={e => {
                        setGrade(e.target.value)
                      }}
                    />
                    <span className="mt-1 text-sm float-right">{gradeWarningText}</span>
                  </div>
                  <div className="form-section">
                    <label className="font-semibold uppercase">Roast Level (0.0 - 10.0)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      name="roastlevel"
                      autoComplete="off"
                      placeholder="e.g. 6.5" 
                      className="blue-outline-transition bg-creme 
                      block w-full text-base py-2 px-3 rounded-md border-1"
                      value={bean.roast_level}
                      onChange={e => setRoastLevel(e.target.value)}
                    />
                    <span className="mt-1 text-sm float-right">{roastLevelWarningText}</span>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="form-section h-1/3 flex items-end justify-start">
                    <div className="mb-2">
                      <input type="checkbox" 
                        name="single_origin" 
                        id="single_origin" 
                        className="mr-2"
                        onChange={e => {setBean({...bean, single_origin: e.target.checked})}}
                      />
                      <label className="capitalize">Single Origin</label>
                    </div>
                  </div>
                  <div className="form-section">
                    <label className="font-semibold uppercase">Roaster</label>
                    <MultiSelect
                      options={Object.values(attributeRangeList.roaster_range)}
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
                      value={bean.roast_date}
                      onChange={e => setBean({...bean, roast_date: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pl-8 pr-8 pb-8">
                <button
                  className="border-2 border-red text-red opacity-80 
                  hover:opacity-100 font-bold uppercase text-md 
                  px-6 py-2 rounded-3xl ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setOpenThisModal(false)}
                > Cancel </button>
                <button
                  type="button"
                  disabled={bean.label === null || bean.label.length === 0 ? true : false}
                  className="border-2 border-blue bg-blue text-white opacity-80 hover:opacity-100 font-bold blue-button
                  uppercase text-md px-6 py-2 rounded-3xl button-transition"
                  onClick={setOpenDetailsTab}
                > Next </button>
              </div>
            </div>

            <div 
              ref={detailsPage}
              className="overflow-hidden h-0 opacity-0 ease-linear transition-all duration-300" >

              <div className={`flex px-8 my-8 ${bean.single_origin ? "hidden" : ""}`}>
                <div className="flex flex-col w-1/2">
                  <div className="form-section">
                    <label className="font-semibold uppercase">Blend of</label>
                    <span className="ml-2 text-sm">*Required</span>
                    <MultiSelect
                      labelledBy="Select"
                      options={Object.values(beanList).map(({ coffee_bean_id: value, ...rest }) => ({ value, ...rest } ))}
                      value={selectedBlendBeans}
                      onChange={e => setSelectedBlendBeans(e)}
                    />
                  </div>
                  <div className="form-section my-4">
                    <label className="font-semibold uppercase divider">Blend Ratio</label>
                    <div>
                      { makeBlendRatioElements(selectedBlendBeans, blendRatios, setBlendRatio) }
                    </div>
                  </div>
                </div>

                <div className="w-1/2">
                  <div className="form-section">
                    <label className="font-semibold uppercase">Aroma</label>
                    <MultiSelect
                      labelledBy="Select"
                      options={Object.values(attributeRangeList.aroma_range)}
                      value={selectedAroma}
                      isCreatable={true}
                      onChange={setSelectedAroma}
                    />
                  </div>
                  <div className="form-section">
                    <label className="font-semibold uppercase">Memo</label>
                    <textarea 
                      name="memo"
                      autoComplete="off"
                      placeholder="e.g. Name of the shop you bought this coffee, the price and weight etc." 
                      className=" h-40 blue-outline-transition bg-creme 
                      block w-full text-base py-2 px-3 rounded-md border-1"
                      value={bean.memo}
                      onChange={e => setMemo(e.target.value)}
                    />
                    <span className="text-sm float-right mt-1">{memoWarningText}</span>
                  </div>
                </div>
              </div>

              <div className={`flex px-8 my-8 ${bean.single_origin ? "" : "hidden"}`}>
                <div className="flex flex-col w-1/2">
                  <div className="form-section">
                    <label className="font-semibold uppercase">Origin</label>
                    <span className="ml-2 text-sm">*Required</span>
                    <MultiSelect
                      options={Object.values(attributeRangeList.origin_range)}
                      value={selectedOrigin}
                      onChange={setSelectedOrigin}
                      isCreatable={true}
                      labelledBy="Select"
                    />
                  </div>

                  <div className="form-section">
                    <label className="font-semibold uppercase">Farm</label>
                    <MultiSelect
                      options={Object.values(attributeRangeList.farm_range)}
                      value={selectedFarm}
                      onChange={setSelectedFarm}
                      isCreatable={true}
                      labelledBy="Select"
                    />
                  </div>

                  <div className="form-section">
                    <label className="font-semibold uppercase">Variety</label>
                    <MultiSelect
                      options={Object.values(attributeRangeList.variety_range)}
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
                      autoComplete="off"
                      placeholder="e.g. Sep 2020" 
                      className="blue-outline-transition bg-creme 
                      block w-full text-base py-2 px-3 rounded-md border-1"
                      value={bean.harvest_period}
                      onChange={e => setHarvestPeriod(e.target.value)}
                    />
                    <span className="text-sm float-right mt-1">{periodWarningText}</span>
                  </div>

                  <div className="form-section">
                    <label className="font-semibold uppercase">Altitude</label>
                    <input 
                      type="text" 
                      name="altitude"
                      autoComplete="off"
                      placeholder="e.g. 4000 MASL" 
                      className="blue-outline-transition bg-creme 
                      block w-full text-base py-2 px-3 rounded-md border-1"
                      value={bean.altitude}
                      onChange={e => setAltitude(e.target.value)}
                    />
                    <span className="text-sm float-right mt-1">{altitudeWarningText}</span>
                  </div>
                </div>

                <div className="w-1/2">
                  <div className="form-section">
                    <label className="font-semibold uppercase">Process</label>
                    <MultiSelect
                      options={Object.values(attributeRangeList.process_range)}
                      value={selectedProcess}
                      onChange={setSelectedProcess}
                      isCreatable={true}
                      labelledBy="Select"
                    />
                  </div>

                  <div className="form-section">
                    <label className="font-semibold uppercase">Aroma</label>
                    <MultiSelect
                      options={Object.values(attributeRangeList.aroma_range)}
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
                      autoComplete="off"
                      placeholder="e.g. Name of the shop you bought this coffee, the price and weight etc." 
                      className=" h-40 blue-outline-transition bg-creme 
                      block w-full text-base py-2 px-3 rounded-md border-1"
                      value={bean.memo}
                      onChange={e => setMemo(e.target.value)}
                    />
                    <span className="text-sm float-right mt-1">{memoWarningText}</span>
                  </div>

                </div>
              </div>

              <div className="flex items-center justify-between pl-8 pr-8 pb-8">
                <button
                  className="border-2 border-red text-red opacity-80 
                  hover:opacity-100 font-bold uppercase text-md 
                  px-6 py-2 rounded-3xl ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setOpenThisModal(false)}
                > Cancel </button>
                <button
                  className="border-2 border-blue bg-blue text-white opacity-80 hover:opacity-100 font-bold blue-button
                  uppercase text-md px-6 py-2 rounded-3xl button-transition"
                  type="button"
                  disabled={!tabState.canGoToConfirmation}
                  onClick={() => {
                    setOpenConfirmationTab();
                    insertNewRangeList();
                  }}
                > Next </button>
              </div>
            </div>

            <div 
              ref={confirmationPage}
              className="overflow-hidden h-0 opacity-0 ease-linear transition-all duration-300" >
                
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
                          onClick={setOpenBaseInfoTab} > 
                          <PencilAltIcon className="h-5 w-5 ml-4" />
                        </button>
                      </div>
                      <div className="m-8">
                        <div className="confirm-section">
                          <label className="text-sm font-semibold uppercase mr-4">Name</label>
                          <p>{bean.label}</p>
                        </div>

                        <div className="confirm-section">
                          <label className="text-sm font-semibold uppercase mr-4">Single Origin</label>
                          <p>{bean.single_origin ? 'Yes' : 'No'}</p>
                        </div>

                        <div className="confirm-section">
                          <label className="text-sm font-semibold uppercase mr-4">Grade (0 - 100)</label>
                          <p>{bean.grade ? bean.grade : 'Not Entered'}</p>
                        </div>

                        <div className="confirm-section">
                          <label className="text-sm font-semibold uppercase mr-4">Roaster</label>
                          <div className="tag-section">
                            {selectedRoaster.length <= 0 ? 
                              <p>Not Selected</p> :
                            selectedRoaster.map((roaster) => (
                                <span>{roaster.label}</span>
                            ))}
                          </div>
                        </div>

                        <div className="confirm-section">
                          <label className="text-sm font-semibold uppercase mr-4">Roast Level (0 - 10)</label>
                          <p>{bean.roast_level? bean.roast_level : 'Not Entered'}</p>
                        </div>

                        <div className="confirm-section">
                          <label className="text-sm font-semibold uppercase mr-4">Roast Date</label>
                          <p>{bean.roast_date ? bean.roast_date : 'Not Entered'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-1/2">
                    <div className="flex mx-4 mb-4">
                      <h3 className="text-lg uppercase font-capitals">Details</h3>
                      <button
                        type="button"
                        disabled={bean.label === ''}
                        className="opacity-80 hover:opacity-100 
                        ease-linear transition-all duration-150"
                        onClick={setOpenDetailsTab} > 
                        <PencilAltIcon className="h-5 w-5 ml-4" />
                      </button>
                    </div>
                    <div className="m-8">
                      { bean.single_origin ? 
                        <>
                        <div className="confirm-section">
                          <label className="text-sm font-semibold uppercase mr-4">Origin</label>
                          <div className="tag-section">
                          {selectedOrigin.map((entry) => (
                              <span>{entry.label}</span>
                          ))}
                          </div>
                        </div>

                        <div className="confirm-section">
                          <label className="text-sm font-semibold uppercase mr-4">Farm</label>
                          <div className="tag-section">
                          {selectedFarm.length <= 0 ? 
                            <p>Not Selected</p> :
                          selectedFarm.map((entry) => (
                              <span>{entry.label}</span>
                          ))}
                          </div>
                        </div>

                        <div className="confirm-section">
                          <label className="text-sm font-semibold uppercase mr-4">Variety</label>
                          <div className="tag-section">
                          {selectedVariety.length <= 0 ? 
                            <p>Not Selected</p> :
                          selectedVariety.map((entry) => (
                              <span>{entry.label}</span>
                          ))}
                          </div>
                        </div>

                        <div className="confirm-section">
                          <label className="text-sm font-semibold uppercase mr-4">Harvest Period</label>
                          <p>{bean.harvest_period? bean.harvest_period : 'Not Entered'}</p>
                        </div>

                        <div className="confirm-section">
                          <label className="text-sm font-semibold uppercase mr-4">Altitude</label>
                          <p>{bean.altitude? bean.altitude : 'Not Entered'}</p>
                        </div>

                        <div className="confirm-section">
                          <label className="text-sm font-semibold uppercase mr-4">Process</label>
                          <div className="tag-section">
                          {selectedProcess.length <= 0 ? 
                            <p>Not Selected</p> :
                          selectedProcess.map((entry) => (
                              <span>{entry.label}</span>
                          ))}
                          </div>
                        </div>

                        <div className="confirm-section">
                          <label className="text-sm font-semibold uppercase mr-4">Aroma</label>
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
                          <label className="text-sm font-semibold uppercase mr-4">Aroma</label>
                          <div className="tag-section">
                          {selectedAroma.length <= 0 ? 
                            <p>Not Selected</p> :
                          selectedAroma.map((entry) => (
                            <span>{entry.label}</span>
                          ))}
                          </div>
                        </div>

                        <div className="confirm-section">
                          <label className="text-sm font-semibold uppercase mr-4">Blend Ratio</label>
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
                          disabled={bean.label === ''}
                          className="absolute left-1 opacity-80 
                          hover:opacity-100 ease-linear transition-all duration-150"
                          onClick={setOpenDetailsTab} > 
                          <PencilAltIcon className="h-5 w-5" />
                        </button>
                      </p>
                      <p className="inline ml-8">: {bean.memo ? bean.memo : 'Not Entered'}</p>
                    </div>
                  </div>
                </div>
              </div>


              <div className="flex items-center justify-between px-8 py-8">
                <button
                  className="border-2 border-red text-red opacity-80 
                  hover:opacity-100 font-bold uppercase text-md 
                  px-6 py-2 rounded-3xl ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setOpenThisModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="border-2 border-blue bg-blue text-white opacity-80 
                  hover:opacity-100 font-bold uppercase text-md 
                  px-6 py-2 rounded-3xl ease-linear transition-all duration-150"
                  type="button"
                  onClick={onSubmit}
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
      <label className="text-md">{bean.label}</label>
      <div className="percent-char">
        <input 
          type="text" 
          name={bean.value}
          id={bean.value}
          autoComplete="off"
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
