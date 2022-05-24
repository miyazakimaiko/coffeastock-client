import React, { useEffect, useCallback, useState, createRef } from 'react'
import { useUserData } from '../../context/AccountContext';
import { convertIdListToItemList, convertItemListToIdList } from '../../helpers/ListConverter';
import extractNewItems from '../../helpers/ExtractNewItems';
import ModalWrapperContainer from '../../components/elements/ModalWrapperContainer';
import FormInput from '../../components/elements/FormInput';
import FormRadio from '../../components/elements/FormRadio';
import FormMultiSelect from '../../components/elements/FormMultiSelect';
import RedOutlineButton from '../../components/elements/RedOutlineButton';
import BlueButton from '../../components/elements/BlueButton';
import StepsTab from './components/StepsTab';
import InputConfirmSection from './components/InputConfirmSection';
import MultiselectConfirmSection from './components/MultiselectConfirmSection';
import PencilAltIconButton from '../../components/elements/PencilAltIconButton';
import FormBlendRatioInput from './components/FormBlendRatioInput';
import AddEditNameInput from './components/AddEditNameInput';
import AddEditGradeInput from './components/AddEditGradeInput';
import AddEditRoastLevelInput from './components/AddEditRoastLevelInput';
import AddEditHarvestPeriodInput from './components/AddEditHarvestPeriodInput';
import AddEditAltitudeInput from './components/AddEditAltitudeInput';
import AddEditMemoTextarea from './components/AddEditMemoTextarea';
import useAddBean from '../../hooks/useAddBean';
import useEditBean from '../../hooks/useEditBean';
import useBeans from '../../hooks/useBeans';
import useRanges from '../../hooks/useRanges';
import useAddRange from '../../hooks/useAddRange';
import './modals.scss'
import toastOnBottomCenter from '../../utils/customToast';

const AddEditBeanModal = ({setModal, targetBean = null, mode = 'add'}) => {
  const userData = useUserData()
  const { data: rangeList, isLoading: rangeListIsLoading } = useRanges(userData.sub)
  const { data: beanList, isLoading: beanListIsLoading } = useBeans(userData.sub)
  const addBean = useAddBean(userData.sub)
  const editBean = useEditBean(userData.sub)
  const addRange = useAddRange(userData.sub)

  const [bean, setBean] = useState({
    bean_id: null,
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
  const [blendRatioHtmlDict, setBlendRatioHtmlDict] = useState({})

  const setSelectedBlendBeans = (e) => {
    if (e.length > 5) {
      toastOnBottomCenter('error', 'Cannot select more than five coffee bean types.')
    }
    else {
      innerSetSelectedBlendBeans(e);
      // If parameter e contains the newly selected BlendBean,
      // it must be found and set it in the blendRatio with the value of zero
      e.forEach(bean => {
        let found = false;
        for (const beanId of Object.keys(blendRatios)) {
          if (bean.value === beanId) found = true;
        }
        if (!found) {
          setBlendRatio(bean.value, '0');
        }
      })
    }
  }
  
  const setBlendRatio = (key, value) => {
    const newRatio = {};
    newRatio[key] = value;
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
    if (bean.single_origin && selectedOrigin !== null) {
      setTabState({...tabState, canGoToConfirmation: true});
    }
    else if (!bean.single_origin && selectedBlendBeans !== null) {
      setTabState({...tabState, canGoToConfirmation: true});
    }
    else {
      setTabState({...tabState, canGoToConfirmation: false});
    }
  }, [bean.single_origin, selectedBlendBeans, selectedOrigin]);

  const finalizeBean = () => {
    const roasterIdList = convertItemListToIdList(selectedRoaster, rangeList.roaster_range);
    const aromaIdList = convertItemListToIdList(selectedAroma, rangeList.aroma_range);

    if (bean.single_origin) {
      const originIdList = convertItemListToIdList(selectedOrigin, rangeList.origin_range);
      const farmIdList = convertItemListToIdList(selectedFarm, rangeList.farm_range);
      const varietyIdList = convertItemListToIdList(selectedVariety, rangeList.variety_range);
      const processIdList = convertItemListToIdList(selectedProcess, rangeList.process_range);
      
      setBean({...bean, 
        roaster: [...roasterIdList],
        aroma: [...aromaIdList],
        origin: [...originIdList],
        farm: [...farmIdList],
        variety: [...varietyIdList],
        process: [...processIdList],
      });
    }
    else {
      setBean({...bean, 
        roaster: [...roasterIdList],
        aroma: [...aromaIdList],
        blend_ratio: blendRatios,
      });
    }
  }

  const insertNewRangeList = async () => {
    let newRangeList = {
      'origin': extractNewItems(selectedOrigin),
      'roaster': extractNewItems(selectedRoaster),
      'farm': extractNewItems(selectedFarm),
      'process': extractNewItems(selectedProcess),
      'aroma': extractNewItems(selectedAroma),
      'variety': extractNewItems(selectedVariety)
    }

    for (const [rangeName, entries] of Object.entries(newRangeList)) {

      for await (const entry of entries) {
        const body = { "label": entry.label, "def": "" }
        await addRange.mutate({ rangeName,body })
      }
    }
  }

  const [processAddSubmit, setProcessAddSubmit] = useState(false);
  const [processEditSubmit, setProcessEditSubmit] = useState(false);

  const onSubmit = () => {
    finalizeBean();
    if (mode === 'add') {
      setProcessAddSubmit(true);
    }
    else if (mode === 'edit') {
      setProcessEditSubmit(true);
    }
  }

  useEffect(() => {
    if (processAddSubmit) {
      if (Object.keys(bean.blend_ratio).length > 5) {
        toastOnBottomCenter('error', 'No more than five coffee types can be selected as blend beans.')
        return;
      } 
      if (bean.label === null) {
        toastOnBottomCenter('error', 'Coffee Bean Name is blank.')
        return;
      }
      addBean.mutate(bean, {
        onSuccess: setModal({mode: '', isOpen: false})
      })
    }
  }, [processAddSubmit])

  useEffect(() => {
    if (processEditSubmit) {

      if (!bean.single_origin && Object.keys(bean.blend_ratio).length > 5) {
        toastOnBottomCenter('error', 'No more than five coffee types can be selected as blend beans.');
        return;
      } 
      if (bean.label === null) {
        toastOnBottomCenter('error', 'Coffee Bean Name is blank.')
        return;
      }

      if (bean.single_origin) {
        bean.blend_ratio = {}
        bean.blend_bean_id_1 = null;
        bean.blend_bean_id_2 = null;
        bean.blend_bean_id_3 = null;
        bean.blend_bean_id_4 = null;
        bean.blend_bean_id_5 = null;
      }
      else {
        bean.origin = [];
        bean.farm = [];
        bean.variety = [];
        bean.process = [];
        bean.variety = [];
      }

      editBean.mutate(bean, {
        onSuccess: setModal({mode: '', isOpen: false})
      })
    }
  }, [processEditSubmit])

  // To enable/disable Next button to go to confirmation section
  useEffect(() => {
    checkCanGoToConfirmation();
  }, [bean.single_origin, selectedOrigin, selectedBlendBeans]);

  // To delete unselected BlendBean from the blendRatios object
  useEffect(() => {
    if (Object.keys(blendRatios).length > 0) {
      for (const beanId of Object.keys(blendRatios)) {
        let found = false;
        selectedBlendBeans.forEach(selectedBean => {
          if (selectedBean.value === beanId) found = true;
        });
        if (!found) {
          delete blendRatios[beanId]
          delete blendRatioHtmlDict[beanId]
        }
      }
    }
  }, [selectedBlendBeans, blendRatios]);

  useEffect(() => {
    if (mode === "edit") {
      setBean({
        ...bean,
        ...targetBean,
        roast_date: targetBean["roast_date"]
          ? targetBean["roast_date"].split("T")[0]
          : undefined,
      });
      setSelectedRoaster(convertIdListToItemList(targetBean["roaster"], rangeList["roaster_range"]));
      setSelectedOrigin(convertIdListToItemList(targetBean["origin"], rangeList["origin_range"]));
      setSelectedFarm(convertIdListToItemList(targetBean["farm"], rangeList["farm_range"]));
      setSelectedVariety(convertIdListToItemList(targetBean["variety"], rangeList["variety_range"]));
      setSelectedProcess(convertIdListToItemList(targetBean["process"], rangeList["process_range"]));
      setSelectedAroma(convertIdListToItemList(targetBean["aroma"], rangeList["aroma_range"]));
    }
  }, []);

  useEffect(() => {
    Object.keys(blendRatios).forEach((id) => {
      const html = {};
      html[id] = (
        <FormBlendRatioInput
          title={beanList.find((d) => d.bean_id == id)["label"]}
          name={id}
          value={blendRatios[id]}
          onChange={(e) => setBlendRatio(id, e.target.value)}
        />
      );
      setBlendRatioHtmlDict((blendRatioHtmlDict) => ({
        ...blendRatioHtmlDict,
        ...html,
      }));
    });
  }, [blendRatios]);

  useEffect(() => {
    if (mode === 'edit' && selectedBlendBeans.length === 0 && targetBean['blend_ratio']) {
      Object.keys(targetBean['blend_ratio']).forEach(id => {
        setBlendRatio(id, targetBean['blend_ratio'][id])
        innerSetSelectedBlendBeans(selectedBlendBeans => [
          ...selectedBlendBeans, 
          { 
            label:beanList.find(d => d.bean_id == id)['label'],
            value:beanList.find(d => d.bean_id == id)['bean_id']
          }
        ])
      })
    }
  }, [bean])

  if (rangeListIsLoading || beanListIsLoading) {
    return 'loading...'
  }

  return (

    <ModalWrapperContainer
      title={
        mode === 'add' ? 'Add New Coffee Bean Type' :
        mode === 'edit' ? `Edit Coffee Bean ${targetBean['label']}` : null
      }
      onCloseClick={() => setModal({mode: '', isOpen: false})}
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
          <div className="md:flex md:px-8 my-8">
            <div className="flex flex-col md:w-1/2">
              <AddEditNameInput
                bean={bean}
                setBean={setBean}
              />
              <AddEditGradeInput
                bean={bean}
                setBean={setBean}
              />
              <AddEditRoastLevelInput
                bean={bean}
                setBean={setBean}             
              />
            </div>

            <div className="md:w-1/2">
              <div className="form-section h-1/3 flex flex-col justify-center">
                {Object.keys(beanList).length === 0 
                    ? 
                  <span className="text-xs block mb-4">* There must be at least one single origin beans entry to add new blend beans.</span>
                    :
                  null
                }
                <div className="flex">
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
                    disabled={Object.keys(beanList).length === 0}
                    onChange={e => {setBean({...bean, single_origin: false})}}
                  />
                </div>
              </div>
              <FormMultiSelect 
                title="Roaster"
                options={Object.values(rangeList.roaster_range)}
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
          <div className="flex items-center justify-between px-2 md:px-8 pb-8">
            <RedOutlineButton
              text="Cancel"
              onClick={() => setModal({mode: '', isOpen: false})}
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
          <div className={`md:px-8 my-8 ${bean.single_origin ? "hidden" : "block md:flex"}`}>
            <div className="flex flex-col md:w-1/2">
              <FormMultiSelect 
                title="Blend of"
                required={true}
                options={Object.values(beanList).map(
                  ({ bean_id: value, ...rest }) => ({ value, isDisabled: bean.bean_id === value, ...rest })
                )}
                value={selectedBlendBeans}
                onChange={e => setSelectedBlendBeans(e)}
              />
              <div className="form-section my-4">
                <label className="font-medium divider">Blend Ratio</label>
                <div>
                  { Object.values(blendRatioHtmlDict) }
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <FormMultiSelect 
                title="Aroma"
                options={Object.values(rangeList.aroma_range)}
                value={selectedAroma}
                isCreatable={true}
                onChange={setSelectedAroma}
              />
              <AddEditMemoTextarea
                bean={bean}
                setBean={setBean}
              />
            </div>
          </div>

          <div className={`md:px-8 my-8 ${bean.single_origin ? "block md:flex" : "hidden"}`}>
            <div className="flex flex-col md:w-1/2">
              <FormMultiSelect 
                title="Origin"
                required={true}
                options={Object.values(rangeList.origin_range)}
                value={selectedOrigin}
                onChange={setSelectedOrigin}
                isCreatable={true}
              />
              <FormMultiSelect 
                title="Farm"
                options={Object.values(rangeList.farm_range)}
                value={selectedFarm}
                onChange={setSelectedFarm}
                isCreatable={true}
              />
              <FormMultiSelect 
                title="Variety"
                options={Object.values(rangeList.variety_range)}
                value={selectedVariety}
                onChange={setSelectedVariety}
                isCreatable={true}
              />
              <AddEditHarvestPeriodInput
                bean={bean}
                setBean={setBean}
              />
              <AddEditAltitudeInput
                bean={bean}
                setBean={setBean}
              />
            </div>

            <div className="md:w-1/2">
              <FormMultiSelect 
                title="Process"
                options={Object.values(rangeList.process_range)}
                value={selectedProcess}
                onChange={setSelectedProcess}
                isCreatable={true}
              />
              <FormMultiSelect 
                title="Aroma"
                options={Object.values(rangeList.aroma_range)}
                value={selectedAroma}
                onChange={setSelectedAroma}
                isCreatable={true}
              />
              <AddEditMemoTextarea
                bean={bean}
                setBean={setBean}
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-2 md:px-8 pb-8">
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
            
          <div className="md:px-8 my-10">
            <div className="md:flex">
              <div className="flex flex-col w-full md:w-1/2">
                <div>
                  <div className="flex mx-4 mb-4">
                    <h3 className="text-lg">Base Info</h3>
                    <PencilAltIconButton
                      width="5"
                      onClick={setOpenBaseInfoTab}
                    />
                  </div>
                  <div className="mb-8 md:m-8">
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

              <div className="md:w-1/2">
                <div className="flex mx-4 mb-4">
                  <h3 className="text-lg">Details</h3>
                  <PencilAltIconButton
                    width="5"
                    onClick={setOpenDetailsTab}
                  />
                </div>
                <div className="mb-8 md:m-8">
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
                      <label className=" mr-4">Blend Ratio</label>
                      <div className="font-medium">
                      {selectedBlendBeans !== null ? selectedBlendBeans.map((entry) => (
                        <span className="basic-chip">{entry.label}: {blendRatios[entry.value]}%</span>
                      )): null}
                      </div>
                    </div>
                    </>
                  }
                </div>
              </div>
            </div>

            <div>
              <div className="mx-4 md:mx-6 my-2">
                <div className="w-full flex items-center">
                  <h3 className="inline">Memo</h3>
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

          <div className="flex items-center justify-between px-2 md:px-8 py-8">
            <RedOutlineButton
              text="Go Back"
              onClick={setOpenDetailsTab}
            />
            <BlueButton
              text={editBean.isLoading || addBean.isLoading ? 'Submitting...' : 'Submit'}
              disabled={!tabState.canGoToConfirmation || editBean.isLoading || addBean.isLoading}
              onClick={onSubmit}
            />
          </div>
        </div>
      </form>
    </ModalWrapperContainer>
  )
}

export default AddEditBeanModal
