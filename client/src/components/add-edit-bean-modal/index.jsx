import React, { useEffect, useCallback, useState, createRef } from 'react'
import { useUserData } from '../../context/AccountContext';
import { useAttributeRangeList, useFetchAttributeRangeList, useInsertAttribute } from '../../context/AttributeRangeContext';
import { useBeanList, useFetchBeanList, useInsertBean } from '../../context/BeansContext';
import { unescapeHtml } from '../../utils/HtmlConverter'
import './modals.scss'
import AddEditBeanModalContainer from './components/AddEditBeanModalContainer';
import StepsTab from './components/StepsTab';
import FormInput from '../elements/FormInput';
import FormRadio from '../elements/FormRadio';
import FormMultiSelect from '../elements/FormMultiSelect';
import RedOutlineButton from '../elements/RedOutlineButton';
import BlueButton from '../elements/BlueButton';
import InputConfirmSection from './components/InputConfirmSection';
import MultiselectConfirmSection from './components/MultiselectConfirmSection';
import PencilAltIconButton from '../elements/PencilAltIconButton';
import FormBlendRatioInput from './components/FormBlendRatioInput';
import AddEditNameInput from './components/AddEditNameInput';
import AddEditGradeInput from './components/AddEditGradeInput';
import AddEditRoastLevelInput from './components/AddEditRoastLevelInput';
import AddEditHarvestPeriodInput from './components/AddEditHarvestPeriodInput';
import AddEditAltitudeInput from './components/AddEditAltitudeInput';
import AddEditMemoTextarea from './components/AddEditMemoTextarea';

const AddBeanModal = ({setOpenThisModal}) => {
  const userData = useUserData()
  const attributeRangeList = useAttributeRangeList() 
  const fetchAttributeRangeList = useFetchAttributeRangeList()
  const insertAttribute = useInsertAttribute()
  const beanList = useBeanList()
  const fetchBeanList = useFetchBeanList()
  const insertBean = useInsertBean()

  const [bean, setBean] = useState({
    single_origin: true,
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
  
  const [nameWarningText, setNameWarningText] = useState("* Required");
  const [periodWarningText, setPeriodWarningText] = useState("60/60");
  const [altitudeWarningText, setAltitudeWarningText] = useState("60/60");
  const [gradeWarningText, setGradeWarningText] = useState("");
  const [roastLevelWarningText, setRoastLevelWarningText] = useState("");
  const [memoWarningText, setMemoWarningText] = useState("400/400");

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

    <AddEditBeanModalContainer
      onCloseClick={() => setOpenThisModal(false)}
    >
      {/*body*/}
      <ul className="flex">
          <StepsTab
            key="base-info"
            title="1. Base Info"
            tabState={tabState.baseInfoTab}
            onClick={setOpenBaseInfoTab}
          />
          <StepsTab
            key="details"
            title="2. Details"
            disabled={bean.label === '' || bean.label === null}
            tabState={tabState.detailsTab}
            onClick={setOpenDetailsTab}
          />
          <StepsTab
            key="confirmation"
            title="3. Confirmation"
            disabled={!tabState.canGoToConfirmation}
            tabState={tabState.confirmationTab}
            onClick={() =>{
              setOpenConfirmationTab();
              insertNewRangeList();
            }}
          />
      </ul>


      <form 
        className="tab-content"
      >
        <div 
          ref={baseInfoPage} 
          className="ease-linear transition-all duration-300"
        >
          <div className="flex px-8 my-8">
            <div className="flex flex-col w-1/2">
              <AddEditNameInput
                bean={bean}
                setBean={setBean}
                nameWarningText={nameWarningText}
                setNameWarningText={setNameWarningText}
              />
              <AddEditGradeInput
                bean={bean}
                setBean={setBean}
                gradeWarningText={gradeWarningText}
                setGradeWarningText={setGradeWarningText}
              />
              <AddEditRoastLevelInput
                bean={bean}
                setBean={setBean}
                roastLevelWarningText={roastLevelWarningText}
                setRoastLevelWarningText={setRoastLevelWarningText}              
              />
            </div>

            <div className="w-1/2">
            <div className="form-section h-1/3 flex items-end justify-start">
              <FormRadio
                title="Single Origin"
                name="single_origin"
                checked={bean.single_origin ? true : false}
                onChange={e => {setBean({...bean, single_origin: true})}}
              />
              <FormRadio
                title="Blend"
                name="single_origin"
                checked={bean.single_origin ? false : true}
                onChange={e => {setBean({...bean, single_origin: false})}}
              />
            </div>
              <FormMultiSelect 
                title="Roaster"
                options={Object.values(attributeRangeList.roaster_range)}
                value={selectedRoaster}
                onChange={setSelectedRoaster}
                isCreatable={true}
              />
              <FormInput
                title="Roast Date"
                type="date" 
                name="roastdate" 
                placeholder="e.g. 2021-12-10" 
                value={bean.roast_date}
                onChange={e => setBean({...bean, roast_date: e.target.value})}
              />
            </div>
          </div>
          <div className="flex items-center justify-between pl-8 pr-8 pb-8">
            <RedOutlineButton
              text="Cancel"
              onClick={() => setOpenThisModal(false)}
            />
            <BlueButton
              text="Next"
              disabled={
                bean.label === null || 
                bean.label.length === 0 ? true : false
              }
              onClick={setOpenDetailsTab}
            />
          </div>
        </div>

        <div 
          ref={detailsPage}
          className="overflow-hidden h-0 opacity-0 ease-linear transition-all duration-300"
        >
          <div className={`flex px-8 my-8 ${bean.single_origin ? "hidden" : ""}`}>
            <div className="flex flex-col w-1/2">
              <FormMultiSelect 
                title="Blend of"
                required={true}
                options={Object.values(beanList).map(({ coffee_bean_id: value, ...rest }) => ({ value, ...rest } ))}
                value={selectedBlendBeans}
                onChange={e => setSelectedBlendBeans(e)}
              />
              <div className="form-section my-4">
                <label className="font-medium divider">Blend Ratio</label>
                <div>
                  { makeBlendRatioElements(selectedBlendBeans, blendRatios, setBlendRatio) }
                </div>
              </div>
            </div>

            <div className="w-1/2">
              <FormMultiSelect 
                title="Aroma"
                options={Object.values(attributeRangeList.aroma_range)}
                value={selectedAroma}
                isCreatable={true}
                onChange={setSelectedAroma}
              />
              <AddEditMemoTextarea
                bean={bean}
                setBean={setBean}
                memoWarningText={memoWarningText}
                setMemoWarningText={setMemoWarningText}
              />
            </div>
          </div>

          <div className={`flex px-8 my-8 ${bean.single_origin ? "" : "hidden"}`}>
            <div className="flex flex-col w-1/2">
              <FormMultiSelect 
                title="Origin"
                required={true}
                options={Object.values(attributeRangeList.origin_range)}
                value={selectedOrigin}
                onChange={setSelectedOrigin}
                isCreatable={true}
              />
              <FormMultiSelect 
                title="Farm"
                options={Object.values(attributeRangeList.farm_range)}
                value={selectedFarm}
                onChange={setSelectedFarm}
                isCreatable={true}
              />
              <FormMultiSelect 
                title="Variety"
                options={Object.values(attributeRangeList.variety_range)}
                value={selectedVariety}
                onChange={setSelectedVariety}
                isCreatable={true}
              />
              <AddEditHarvestPeriodInput
                bean={bean}
                setBean={setBean}
                periodWarningText={periodWarningText}
                setPeriodWarningText={setPeriodWarningText}
              />
              <AddEditAltitudeInput
                bean={bean}
                setBean={setBean}
                altitudeWarningText={altitudeWarningText}
                setAltitudeWarningText={setAltitudeWarningText}
              />
            </div>

            <div className="w-1/2">
              <FormMultiSelect 
                title="Process"
                options={Object.values(attributeRangeList.process_range)}
                value={selectedProcess}
                onChange={setSelectedProcess}
                isCreatable={true}
              />
              <FormMultiSelect 
                title="Aroma"
                options={Object.values(attributeRangeList.aroma_range)}
                value={selectedAroma}
                onChange={setSelectedAroma}
                isCreatable={true}
              />
              <AddEditMemoTextarea
                bean={bean}
                setBean={setBean}
                memoWarningText={memoWarningText}
                setMemoWarningText={setMemoWarningText}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pl-8 pr-8 pb-8">
            <RedOutlineButton
              text="Go Back"
              onClick={setOpenBaseInfoTab}
            />
            <BlueButton
              text="Next"
              disabled={!tabState.canGoToConfirmation}
              onClick={() => {
                setOpenConfirmationTab();
                insertNewRangeList();
              }}
            />
          </div>
        </div>

        <div 
          ref={confirmationPage}
          className="overflow-hidden h-0 opacity-0 ease-linear transition-all duration-300"
        >
            
          <div className="px-8 my-10">
            <div className="flex">
              <div className="flex flex-col w-1/2">
                <div>
                  <div className="flex mx-4 mb-4">
                    <h3 className="text-lg">Base Info</h3>
                    <PencilAltIconButton
                      width="5"
                      onClick={setOpenBaseInfoTab}
                    />
                  </div>
                  <div className="m-8">
                    <InputConfirmSection
                      title="Name"
                      content={bean.label}
                    />
                    <InputConfirmSection
                      title="Single Origin"
                      content={bean.single_origin ? 'Yes' : 'No'}
                    />
                    <InputConfirmSection
                      title="Grade (0 - 100)"
                      content={bean.grade}
                    />
                    <MultiselectConfirmSection
                      title="Roaster"
                      content={selectedRoaster}
                    />
                    <InputConfirmSection
                      title="Roast Level (0 - 10)"
                      content={bean.roast_level}
                    />
                    <InputConfirmSection
                      title="Roast Date"
                      content={bean.roast_date}
                    />
                  </div>
                </div>
              </div>

              <div className="w-1/2">
                <div className="flex mx-4 mb-4">
                  <h3 className="text-lg">Details</h3>
                  <PencilAltIconButton
                    width="5"
                    onClick={setOpenDetailsTab}
                  />
                </div>
                <div className="m-8">
                  { bean.single_origin ? 
                    <>
                      <MultiselectConfirmSection
                        title="Origin"
                        content={selectedOrigin}
                      />
                      <MultiselectConfirmSection
                        title="Farm"
                        content={selectedFarm}
                      />
                      <MultiselectConfirmSection
                        title="Variety"
                        content={selectedVariety}
                      />
                      <InputConfirmSection
                        title="Harvest Period"
                        content={bean.harvest_period}
                      />
                      <InputConfirmSection
                        title="Altitude"
                        content={bean.altitude}
                      />
                      <MultiselectConfirmSection
                        title="Process"
                        content={selectedProcess}
                      />
                      <MultiselectConfirmSection
                        title="Aroma"
                        content={selectedAroma}
                      />
                    </>
                    : 
                    // Blend Beans
                    <>
                      <MultiselectConfirmSection
                        title="Aroma"
                        content={selectedAroma}
                      />
                    <div className="confirm-section">
                      <label className="text-sm mr-4">Blend Ratio</label>
                      <div className="tag-section font-medium">
                      {selectedBlendBeans.map((entry) => (
                        <span className="text-xs">{entry.label}: {blendRatios[entry.value]}%</span>
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
                <div className="w-full flex items-center">
                  <h3 className="text-sm inline">Memo</h3>
                  <PencilAltIconButton
                    width="5"
                    onClick={setOpenDetailsTab}
                  />
                  :
                  <p className="inline ml-8">{bean.memo ? bean.memo : 'Not Entered'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-8 py-8">
            <RedOutlineButton
              text="Go Back"
              onClick={setOpenDetailsTab}
            />
            <BlueButton
              text="Submit"
              disabled={!tabState.canGoToConfirmation}
              onClick={onSubmit}
            />
          </div>
        </div>
      </form>
    </AddEditBeanModalContainer>
  )
}

const makeBlendRatioElements = (selectedBeans, blendRatios, setBlendRatio) => {
  const elements = []
  if (selectedBeans.length <= 0) {
    elements.push(<div className="py-2"><p>Beans are not selected.</p></div>);
  }
  else {
    selectedBeans.forEach(bean => {
      let newRatio = {};
      elements.push(
        <FormBlendRatioInput
          title={bean.label}
          name={bean.value}
          value={blendRatios[bean.value]}
          onChange={e => {
            newRatio[bean.value] = e.target.value;
            setBlendRatio(newRatio);
          }}
        />
      )
    });
  }
  return elements;
}

export default AddBeanModal
