import React, { useEffect, useState, createRef } from 'react'
import { useUserData } from '../../context/AccountContext';
import { convertIdListToItemList, convertItemListToIdList } from '../../helpers/ListConverter';
import extractNewItems from '../../helpers/ExtractNewItems';
import ModalWrapperContainer from '../../elements/ModalWrapperContainer';
import FormInput from '../../elements/FormInput';
import FormRadio from '../../elements/FormRadio';
import FormMultiSelect from '../../elements/FormMultiSelect';
import RedOutlineButton from '../../elements/RedOutlineButton';
import BlueButton from '../../elements/BlueButton';
import StepsTab from './components/StepsTab';
import InputConfirmSection from './components/InputConfirmSection';
import MultiselectConfirmSection from './components/MultiselectConfirmSection';
import PencilAltIconButton from '../../elements/PencilAltIconButton';
import NameInput from './components/NameInput';
import GradeInput from './components/GradeInput';
import RoastLevelInput from './components/RoastLevelInput';
import HarvestPeriodInput from './components/HarvestPeriodInput';
import AltitudeInput from './components/AltitudeInput';
import MemoTextarea from './components/MemoTextarea';
import useAddBean from '../../hooks/useAddBean';
import useEditBean from '../../hooks/useEditBean';
import useBeans from '../../hooks/useBeans';
import useRanges from '../../hooks/useRanges';
import useAddRange from '../../hooks/useAddRange';
import '../modals.scss'
import { escapeHtml, unescapeHtml } from '../../helpers/HtmlConverter';
import OriginInput from './components/OriginInput';
import BlendBeanInput from './components/BlendBeanInput';
import {
  checkAltitudeIsInRange,
  checkBlendBeansCountInRange,
  checkGradeIsInRange,
  checkHarvestPeriodIsInRange,
  checkMemoIsInRange,
  checkRoastLevelIsInRange,
  checkValueIsNumber,
} from "./helper/InputValidators";
import useTabStateModel from './hooks/useTabStateModel';
import useSelectedBeansAndRatio from './hooks/useSelectedBeansAndRatio';
import useBeanModel from './hooks/useBeanModel';

const AddEditBeanModal = ({setModal, targetBean = null, mode = 'add'}) => {
  const userData = useUserData()
  const { data: rangeList, isLoading: rangeListIsLoading } = useRanges(userData.sub)
  const { data: beanList, isLoading: beanListIsLoading } = useBeans(userData.sub)
  const addBean = useAddBean(userData.sub)
  const editBean = useEditBean(userData.sub)
  const addRange = useAddRange(userData.sub)
  const [bean, setBean, onSubmit] = useBeanModel(setModal, mode);
  const [tabState, setTabState] = useTabStateModel();

  const [selectedOrigin, setSelectedOrigin] = useState([]);
  const [selectedRoaster, setSelectedRoaster] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState([]);
  const [selectedProcess, setSelectedProcess] = useState([]);
  const [selectedAroma, setSelectedAroma] = useState([]);
  const [selectedVariety, setSelectedVariety] = useState([]);
  
  const [
    selectedBlendBeans,
    setSelectedBlendBeans,
    blendRatios,
    setBlendRatio,
    blendRatioHtmlDict,
  ] = useSelectedBeansAndRatio();

  useEffect(() => {
    if (mode === "edit") {
      setBean({
        ...targetBean,
        label: unescapeHtml(targetBean.label),
        harvest_period: unescapeHtml(targetBean.harvest_period),
        altitude: unescapeHtml(targetBean.altitude),
        memo: unescapeHtml(targetBean.memo),
        roast_date: targetBean.roast_date
          ? targetBean.roast_date.split("T")[0]
          : undefined,
      });
      setSelectedRoaster(convertIdListToItemList(targetBean.roaster, rangeList.roaster_range));
      setSelectedOrigin(convertIdListToItemList(targetBean.origin, rangeList.origin_range));
      setSelectedFarm(convertIdListToItemList(targetBean.farm, rangeList.farm_range));
      setSelectedVariety(convertIdListToItemList(targetBean.variety, rangeList.variety_range));
      setSelectedProcess(convertIdListToItemList(targetBean.process, rangeList.process_range));
      setSelectedAroma(convertIdListToItemList(targetBean.aroma, rangeList.aroma_range));
    }
  }, []);


  useEffect(() => {
    if (mode === 'edit' && selectedBlendBeans.length === 0 && targetBean.blend_ratio) {

      const selectedBeans = [];
      Object.keys(targetBean.blend_ratio).forEach(id => {
        setBlendRatio(blendRatio => ({ ...blendRatio, [id]: targetBean.blend_ratio[id] }))
        selectedBeans.push(beanList[id])
      })
      setSelectedBlendBeans(selectedBeans);
    }
  }, [bean])




  useEffect(() => {
    setDetailsTabState();
  }, [bean.label, bean.grade, bean.roast_level]);


  useEffect(() => {
    setConfirmationTabState();
  }, [
    bean.single_origin,
    bean.harvest_period,
    bean.altitude,
    bean.memo,
    selectedOrigin,
    selectedBlendBeans,
  ]);


  const setDetailsTabState = () => {
    
    const esacapedLabel = escapeHtml(bean.label ? bean.label : '');
    const lebelIsValid = esacapedLabel.length > 0 && esacapedLabel.length <= 60;
    const gradeIsValid = checkValueIsNumber(bean.grade) && checkGradeIsInRange(bean.grade);
    const roastLevelIsValid = checkValueIsNumber(bean.roast_level) && checkRoastLevelIsInRange(bean.roast_level);

    if (lebelIsValid && gradeIsValid && roastLevelIsValid) {
      setTabState(tabState => ({ ...tabState, canOpenDetailsTab: true }));
    }
    else {
      setTabState(tabState => ({
        ...tabState,
        canOpenDetailsTab: false,
        canOpenConfirmation: false,
      }));    
    }
  }


  const setConfirmationTabState = () => {

    if (bean.single_origin) {
      const originIsSelected = selectedOrigin.length > 0;
      const altitudeIsInRange = checkAltitudeIsInRange(bean.altitude);
      const harvestPeriodIsInRange = checkHarvestPeriodIsInRange(bean.harvest_period);
      const memoIsInRange = checkMemoIsInRange(bean.memo);

      if (
        originIsSelected &&
        altitudeIsInRange &&
        harvestPeriodIsInRange &&
        memoIsInRange
      ) {
        setTabState((tabState) => ({ ...tabState, canOpenConfirmation: true }));
      }
      else {
        setTabState((tabState) => ({ ...tabState, canOpenConfirmation: false }));
      }
    }
    else if (!bean.single_origin) {

      const blendBeanCountIsInRange = checkBlendBeansCountInRange(selectedBlendBeans);
      const memoIsInRange = checkMemoIsInRange(bean.memo);

      if (blendBeanCountIsInRange && memoIsInRange) {
        setTabState(tabState => ({ ...tabState, canOpenConfirmation: true }));
      }
      else {
        setTabState(tabState => ({ ...tabState, canOpenConfirmation: false }));
      }
    }
    else {
      setTabState(tabState => ({ ...tabState, canOpenConfirmation: false }));
    }
  }


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


  const setOpenBaseInfoTab = () => {
    showPage(baseInfoPage);
    hidePage(detailsPage);
    hidePage(confirmationPage);
    setTabState(tabState => ({
      ...tabState,
      baseInfoTabIsOpen: true,
      detailsTabIsOpen: false,
      confirmationTabIsOpen: false,
    }));
  }; 


  const setOpenDetailsTab = () => {
    hidePage(baseInfoPage);
    showPage(detailsPage);
    hidePage(confirmationPage);
    setTabState(tabState => ({
      ...tabState,
      baseInfoTabIsOpen: false,
      detailsTabIsOpen: true,
      confirmationTabIsOpen: false,
    }));
  };


  const setOpenConfirmationTab = () => {
    hidePage(baseInfoPage);
    hidePage(detailsPage);
    showPage(confirmationPage);
    setTabState(tabState => ({
      ...tabState,
      baseInfoTabIsOpen: false,
      detailsTabIsOpen: false,
      confirmationTabIsOpen: true,
    }));
  };


  const finalizeBean = () => {
    const roaster = convertItemListToIdList(selectedRoaster, rangeList.roaster_range);
    const aroma = convertItemListToIdList(selectedAroma, rangeList.aroma_range);

    if (bean.single_origin) {
      const origin = convertItemListToIdList(selectedOrigin, rangeList.origin_range);
      const farm = convertItemListToIdList(selectedFarm, rangeList.farm_range);
      const variety = convertItemListToIdList(selectedVariety, rangeList.variety_range);
      const process = convertItemListToIdList(selectedProcess, rangeList.process_range);
      
      setBean(bean => ({ ...bean, roaster, aroma, origin, farm, variety, process }));
    }
    else {
      setBean(bean => ({ ...bean, roaster, aroma, blend_ratio: blendRatios }));
    }
  }

  const insertNewRangeList = async () => {
    let newRangeList = {
      origin: extractNewItems(selectedOrigin),
      roaster: extractNewItems(selectedRoaster),
      farm: extractNewItems(selectedFarm),
      process: extractNewItems(selectedProcess),
      aroma: extractNewItems(selectedAroma),
      variety: extractNewItems(selectedVariety)
    }

    for (const [rangeName, entries] of Object.entries(newRangeList)) {

      for await (const entry of entries) {
        const body = { label: entry.label, def: "" }
        await addRange.mutate({ rangeName,body })
      }
    }
  }


  if (rangeListIsLoading || beanListIsLoading) {
    return 'loading...'
  }


  return (
    <ModalWrapperContainer
      title={
        mode === "add"
          ? "Add New Coffee Bean Type"
          : mode === "edit"
          ? `Edit Coffee Bean ${unescapeHtml(targetBean.label)}`
          : null
      }
      onCloseClick={() => setModal({ mode: "", isOpen: false })}
    >
      {/*body*/}
      <ul className="flex">
        <StepsTab
          key="base-info"
          title="1. Base Info"
          tabState={tabState.baseInfoTabIsOpen}
          onClick={setOpenBaseInfoTab}
        />
        <StepsTab
          key="details"
          title="2. Details"
          disabled={!tabState.canOpenDetailsTab}
          tabState={tabState.detailsTabIsOpen}
          onClick={setOpenDetailsTab}
        />
        <StepsTab
          key="confirmation"
          title="3. Confirmation"
          disabled={!tabState.canOpenConfirmation}
          tabState={tabState.confirmationTabIsOpen}
          onClick={() => {
            setOpenConfirmationTab();
            insertNewRangeList();
          }}
        />
      </ul>

      <form className="tab-content">
        <div
          ref={baseInfoPage}
          className="ease-linear transition-all duration-300"
        >
          <div className="md:flex md:px-8 my-8">
            <div className="flex flex-col md:w-1/2">
              <NameInput bean={bean} setBean={setBean} />
              <GradeInput bean={bean} setBean={setBean} />
              <RoastLevelInput bean={bean} setBean={setBean} />
            </div>

            <div className="md:w-1/2">
              <div className="form-section h-1/3 flex flex-col justify-center">
                {Object.keys(beanList).length === 0 ? (
                  <span className="text-xs block mb-4">
                    * There must be at least one single origin beans entry to
                    add new blend beans.
                  </span>
                ) : null}
                <div className="flex">
                  <FormRadio
                    title="Single Origin"
                    name="single_origin"
                    checked={bean.single_origin ? true : false}
                    onChange={() => {
                      setBean(bean => ({ ...bean, single_origin: true }));
                    }}
                  />
                  <FormRadio
                    title="Blend"
                    name="single_origin"
                    checked={bean.single_origin ? false : true}
                    disabled={Object.keys(beanList).length === 0}
                    onChange={() => {
                      setBean(bean => ({ ...bean, single_origin: false }));
                    }}
                  />
                </div>
              </div>
              <FormMultiSelect
                title="Roaster"
                options={Object.values(rangeList.roaster_range)}
                value={selectedRoaster}
                onChange={setSelectedRoaster}
                isCreatable={Object.values(rangeList.roaster_range).length > 150 ? false : true}
              />
              <FormInput
                title="Roast Date"
                type="date"
                name="roastdate"
                placeholder="e.g. 2021-12-10"
                value={bean.roast_date}
                onChange={(e) =>
                  setBean(bean => ({ ...bean, roast_date: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="flex items-center justify-between px-2 md:px-8 pb-8">
            <RedOutlineButton
              text="Cancel"
              onClick={() => setModal({ mode: "", isOpen: false })}
            />
            <BlueButton
              text="Next"
              disabled={!tabState.canOpenDetailsTab}
              onClick={setOpenDetailsTab}
            />
          </div>
        </div>

        <div
          ref={detailsPage}
          className="overflow-hidden h-0 opacity-0 ease-linear transition-all duration-300"
        >
          <div
            className={`md:px-8 my-8 ${
              bean.single_origin ? "hidden" : "block md:flex"
            }`}
          >
            <div className="flex flex-col md:w-1/2">
              <BlendBeanInput
                targetBean={bean}
                beanList={beanList}
                selectedBlendBeans={selectedBlendBeans}
                setSelectedBlendBeans={setSelectedBlendBeans}
              />
              <div className="form-section my-4">
                <label className="font-medium divider">Blend Ratio</label>
                <div>{Object.values(blendRatioHtmlDict)}</div>
              </div>
            </div>

            <div className="md:w-1/2">
              <FormMultiSelect
                title="Aroma"
                options={Object.values(rangeList.aroma_range)}
                value={selectedAroma}
                isCreatable={Object.values(rangeList.aroma_range).length > 150 ? false : true}
                onChange={setSelectedAroma}
              />
              <MemoTextarea bean={bean} setBean={setBean} />
            </div>
          </div>

          <div
            className={`md:px-8 my-8 ${
              bean.single_origin ? "block md:flex" : "hidden"
            }`}
          >
            <div className="flex flex-col md:w-1/2">
              <OriginInput
                rangeList={rangeList}
                selectedOrigin={selectedOrigin}
                setSelectedOrigin={setSelectedOrigin}
              />
              <FormMultiSelect
                title="Farm"
                options={Object.values(rangeList.farm_range)}
                value={selectedFarm}
                onChange={setSelectedFarm}
                isCreatable={Object.values(rangeList.farm_range).length > 150 ? false : true}
              />
              <FormMultiSelect
                title="Variety"
                options={Object.values(rangeList.variety_range)}
                value={selectedVariety}
                onChange={setSelectedVariety}
                isCreatable={Object.values(rangeList.variety_range).length > 150 ? false : true}
              />
              <HarvestPeriodInput bean={bean} setBean={setBean} />
              <AltitudeInput bean={bean} setBean={setBean} />
            </div>

            <div className="md:w-1/2">
              <FormMultiSelect
                title="Process"
                options={Object.values(rangeList.process_range)}
                value={selectedProcess}
                onChange={setSelectedProcess}
                isCreatable={Object.values(rangeList.process_range).length > 150 ? false : true}
              />
              <FormMultiSelect
                title="Aroma"
                options={Object.values(rangeList.aroma_range)}
                value={selectedAroma}
                onChange={setSelectedAroma}
                isCreatable={Object.values(rangeList.aroma_range).length > 150 ? false : true}
              />
              <MemoTextarea bean={bean} setBean={setBean} />
            </div>
          </div>

          <div className="flex items-center justify-between px-2 md:px-8 pb-8">
            <RedOutlineButton text="Go Back" onClick={setOpenBaseInfoTab} />
            <BlueButton
              text="Next"
              disabled={!tabState.canOpenConfirmation}
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
                    <InputConfirmSection title="Name" content={bean.label} />
                    <InputConfirmSection
                      title="Single Origin"
                      content={bean.single_origin ? "Yes" : "No"}
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
                  <PencilAltIconButton width="5" onClick={setOpenDetailsTab} />
                </div>
                <div className="mb-8 md:m-8">
                  {bean.single_origin ? (
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
                  ) : (
                    // Blend Beans
                    <>
                      <MultiselectConfirmSection
                        title="Aroma"
                        content={selectedAroma}
                      />
                      <div className="confirm-section">
                        <label className=" mr-4">Blend Ratio</label>
                        <div className="font-medium">
                          {selectedBlendBeans !== null
                            ? selectedBlendBeans.map((entry) => (
                                <span className="basic-chip">
                                  {entry.label}: {blendRatios[entry.value]}%
                                </span>
                              ))
                            : null}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="mx-4 md:mx-6 my-2">
                <div className="w-full flex items-center">
                  <h3 className="inline">Memo</h3>
                  <PencilAltIconButton width="5" onClick={setOpenDetailsTab} />:
                  <p className="inline ml-8">
                    {bean.memo ? bean.memo : "Not Entered"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-2 md:px-8 py-8">
            <RedOutlineButton text="Go Back" onClick={setOpenDetailsTab} />
            <BlueButton
              text={
                editBean.isLoading || addBean.isLoading
                  ? "Submitting..."
                  : "Submit"
              }
              disabled={
                !tabState.canOpenConfirmation ||
                editBean.isLoading ||
                addBean.isLoading
              }
              onClick={() => {
                finalizeBean();
                onSubmit();
              }}
            />
          </div>
        </div>
      </form>
    </ModalWrapperContainer>
  );
}

export default AddEditBeanModal
