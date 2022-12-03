import React, { useEffect, useState, createRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useGetSession, useSignout } from '../../context/AccountContext';
import { ModalStateContext } from '../../context/ModalStateContext';
import { TO_LOGIN, TO_GENERAL_ERROR } from '../../utils/Paths';
import { MAX_LENGTH, USER_TYPE } from '../../utils/Constants';
import BeanService from '../../services/BeanService';
import { convertIdListToItemList, convertItemListToIdList } from '../../helpers/ListConverter';
import { escapeHtml, unescapeHtml } from '../../helpers/HtmlConverter';
import { checkItemsLabelLessThanMax } from '../../helpers/InputValidators';
import extractNewItems from '../../helpers/ExtractNewItems';
import ModalWrapperContainer from '../../elements/ModalWrapperContainer';
import FormInput from '../../elements/FormInput';
import FormRadio from '../../elements/FormRadio';
import PencilAltIconButton from '../../elements/PencilAltIconButton';
import RedOutlineButton from '../../elements/RedOutlineButton';
import BlueButton from '../../elements/BlueButton';
import Spinner from '../../elements/Spinner';
import useBeans from '../../hooks/useBeans';
import useRanges from '../../hooks/useRanges';
import useAddRange from '../../hooks/useAddRange';
import '../modals.scss'
import useSelectedBeansAndRatio from './hooks/useSelectedBeansAndRatio';
import InputConfirmSection from './components/InputConfirmSection';
import MultiselectConfirmSection from './components/MultiselectConfirmSection';
import HarvestPeriodInput from './components/HarvestPeriodInput';
import RoastLevelInput from './components/RoastLevelInput';
import BlendBeanInput from './components/BlendBeanInput';
import AltitudeInput from './components/AltitudeInput';
import MemoTextarea from './components/MemoTextarea';
import OriginInput from './components/OriginInput';
import GradeInput from './components/GradeInput';
import NameInput from './components/NameInput';
import StepsTab from './components/StepsTab';
import TabStateModel from './models/TabStateModel';
import {
  checkAltitudeIsInRange,
  checkAromasCountInRange,
  checkBlendBeansCountInRange,
  checkFarmsCountInRange,
  checkGradeIsInRange,
  checkHarvestPeriodIsInRange,
  checkMemoIsInRange,
  checkOriginsCountInRange,
  checkProcessesCountInRange,
  checkRoastersCountInRange,
  checkRoastLevelIsInRange,
  checkValueIsNumber,
  checkVarietalsCountInRange,
} from "./helpers/InputValidators";
import useUserTotalUsedMb from '../../hooks/useUserTotalUsedMb';
import useUserInfo from '../../hooks/useUserInfo';
import FarmInput from './components/FarmInput';
import RoasterInput from './components/RoasterInput';
import VarietyInput from './components/VarietyInput';
import ProcessInput from './components/ProcessInput';
import AromaInput from './components/AromaInput';

const AddEditBeanModal = ({targetBean = null}) => {

  const getSession = useGetSession();
  const signout = useSignout();
  const navigate = useNavigate();

  // prevent from filling form while token is expired
  // (This prevents warning user to login again after filling the form)
  useEffect(() => {
    getSession((err, _) => {
      if (err) {
        signout();
        navigate(TO_LOGIN, { replace: true } );
      }
    });
  }, []);

  const { data: rangeList, 
          isLoading: rangeListIsLoading,
          isError: rangeListHasError,
        } = useRanges();

  const { data: beanList, 
          isLoading: beanListIsLoading,
          isError: beanListHasError,
        } = useBeans()

  const { data: totalUsedMb, 
          isLoading: totalUsedMbIsLoading,
          isError: totalUsedMbHasError,
        } = useUserTotalUsedMb();

  const { data: userInfo, 
          isLoading: userInfoIsLoading,
          isError: userInfoHasError,
        } = useUserInfo();

  const [bean, setBean, onSubmit, isSubmitting] = BeanService();
  const addRange = useAddRange()
  const [tabState, setTabState] = TabStateModel();
  const { modal, closeModal, modalModeSelection } = useContext(ModalStateContext);
  const queryClient = useQueryClient();


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
    if (modal.mode === modalModeSelection.editBean) {
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
    if (modal.mode === modalModeSelection.editBean && selectedBlendBeans.length === 0 && targetBean.blend_ratio) {

      const selectedBeans = [];
      Object.keys(targetBean.blend_ratio).forEach(id => {
        setBlendRatio(blendRatio => ({ ...blendRatio, [id]: targetBean.blend_ratio[id] }))
        selectedBeans.push(beanList[id])
      })
      setSelectedBlendBeans(selectedBeans);
    }
  }, [bean])


  useEffect(() => {
    // Without this, aroma selsction may show warning message
    // even though it's not applicable.
    setBaseInfoTabState();
  }, [selectedAroma])

  const setBaseInfoTabState = () => {
    const aromasCountIsInRange = checkAromasCountInRange(selectedAroma);

    if (aromasCountIsInRange) {
    setTabState(tabState => ({ ...tabState, canOpenBaseInfoTab: true }));
  }
  else {
    setTabState(tabState => ({
      ...tabState,
      canOpenBaseInfoTab: false,
    }));    
  }
  }
  
  useEffect(() => {
    setDetailsTabState();
  }, [
      bean.label, 
      bean.grade, 
      bean.roast_level, 
      selectedRoaster
    ]
  );

  const setDetailsTabState = () => {
    
    const esacapedLabel = escapeHtml(bean.label ? bean.label : '');
    const lebelIsValid = esacapedLabel.length > 0 && esacapedLabel.length <= MAX_LENGTH.BEANS_LABEL;
    const gradeIsValid = checkValueIsNumber(bean.grade) && checkGradeIsInRange(bean.grade);
    const roastLevelIsValid = checkValueIsNumber(bean.roast_level) && checkRoastLevelIsInRange(bean.roast_level);
    const roastersCountIsInRange = checkRoastersCountInRange(selectedRoaster);
    const roastersAreValid = checkItemsLabelLessThanMax(selectedRoaster);

    if (lebelIsValid 
        && gradeIsValid 
        && roastLevelIsValid 
        && roastersCountIsInRange
        && roastersAreValid
      ) {
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

  useEffect(() => {
    setConfirmationTabState();
  }, [
    tabState.canOpenDetailsTab,
    bean.single_origin,
    bean.harvest_period,
    bean.altitude,
    bean.memo,
    selectedBlendBeans,
    selectedOrigin,
    selectedFarm,
    selectedVariety,
    selectedProcess,
    selectedAroma
  ]);

  const setConfirmationTabState = () => {

    if (bean.single_origin) {
      const originsCountIsInRange = checkOriginsCountInRange(selectedOrigin);
      const farmsCountIsInRange = checkFarmsCountInRange(selectedFarm);
      const varietalsCountIsInRange = checkVarietalsCountInRange(selectedVariety);
      const processesCountIsInRange = checkProcessesCountInRange(selectedProcess);
      const aromasCountIsInRange = checkAromasCountInRange(selectedAroma);
      const altitudeIsInRange = checkAltitudeIsInRange(bean.altitude);
      const harvestPeriodIsInRange = checkHarvestPeriodIsInRange(bean.harvest_period);
      const memoIsInRange = checkMemoIsInRange(bean.memo);
      const originsAreValid = checkItemsLabelLessThanMax(selectedOrigin);
      const farmsAreValid = checkItemsLabelLessThanMax(selectedFarm);
      const varietalsAreValid = checkItemsLabelLessThanMax(selectedVariety);
      const processesAreValid = checkItemsLabelLessThanMax(selectedProcess);
      const aromasAreValid = checkItemsLabelLessThanMax(selectedAroma);

      if (
        tabState.canOpenDetailsTab
        && originsCountIsInRange
        && farmsCountIsInRange
        && varietalsCountIsInRange
        && processesCountIsInRange
        && aromasCountIsInRange
        && altitudeIsInRange
        && harvestPeriodIsInRange
        && memoIsInRange
        && originsAreValid
        && farmsAreValid
        && varietalsAreValid
        && processesAreValid
        && aromasAreValid
      ) {
        setTabState((tabState) => ({ ...tabState, canOpenConfirmation: true }));
      }
      else {
        setTabState((tabState) => ({ ...tabState, canOpenConfirmation: false }));
      }
    }
    else if (!bean.single_origin) {

      const blendBeanCountIsInRange = checkBlendBeansCountInRange(selectedBlendBeans);
      const aromasCountIsInRange = checkAromasCountInRange(selectedAroma);
      const memoIsInRange = checkMemoIsInRange(bean.memo);

      if (blendBeanCountIsInRange 
          && memoIsInRange
          && aromasCountIsInRange) {
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


  const finalizeBean = async () => {
    const roaster = await convertItemListToIdList(selectedRoaster, rangeList.roaster_range);
    const aroma = await convertItemListToIdList(selectedAroma, rangeList.aroma_range);

    if (bean.single_origin) {
      const origin = await convertItemListToIdList(selectedOrigin, rangeList.origin_range);
      const farm = await convertItemListToIdList(selectedFarm, rangeList.farm_range);
      const variety = await convertItemListToIdList(selectedVariety, rangeList.variety_range);
      const process = await convertItemListToIdList(selectedProcess, rangeList.process_range);
      
      setBean(bean => ({ ...bean, roaster, aroma, origin, farm, variety, process }));
    }
    else {
      setBean(bean => ({ ...bean, roaster, aroma, blend_ratio: blendRatios }));
    }
    return;
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
        await addRange.mutateAsync({ rangeName,body })
      }
    }
    queryClient.invalidateQueries("ranges")
  }


  if (rangeListHasError 
      || beanListHasError
      || totalUsedMbHasError
      || userInfoHasError) {
    closeModal();
  }

  if (rangeListIsLoading 
      || beanListIsLoading
      || totalUsedMbIsLoading
      || userInfoIsLoading) {
    return <Spinner />
  }

  if (modal.mode === modalModeSelection.addBean 
    && totalUsedMb > USER_TYPE[userInfo.user_type]?.MAX_CAPACITY_IN_MB
  ) {
    return (
      <ModalWrapperContainer
        title="Your data usage has reached to the max limit"
        onCloseClick={closeModal}
        maxWidthClass="max-w-6xl"
      >
        <p>Upgrade Plan</p>
      </ModalWrapperContainer>
    )
  }

  return (
    <ModalWrapperContainer
      title={
        modal.mode === modalModeSelection.addBean
          ? "Add New Coffee Bean Type"
          : modal.mode === modalModeSelection.editBean
          ? `Edit Coffee Bean ${unescapeHtml(targetBean.label)}`
          : null
      }
      onCloseClick={closeModal}
      maxWidthClass="max-w-6xl"
    >
      {/*body*/}
      <ul className="flex">
        <StepsTab
          key="base-info"
          title="1. Base Info"
          disabled={!tabState.canOpenBaseInfoTab}
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
              <RoasterInput
                rangeList={rangeList}
                selectedRoaster={selectedRoaster}
                setSelectedRoaster={setSelectedRoaster}
                isCreatable={totalUsedMb < USER_TYPE[userInfo.user_type].MAX_CAPACITY_IN_MB}
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
              onClick={closeModal}
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
              <AromaInput
                rangeList={rangeList}
                selectedAroma={selectedAroma}
                setSelectedAroma={setSelectedAroma}
                isCreatable={totalUsedMb < USER_TYPE[userInfo.user_type].MAX_CAPACITY_IN_MB}
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
                isCreatable={totalUsedMb < USER_TYPE[userInfo.user_type].MAX_CAPACITY_IN_MB}
              />
              <FarmInput
                rangeList={rangeList}
                selectedFarm={selectedFarm}
                setSelectedFarm={setSelectedFarm}
                isCreatable={totalUsedMb < USER_TYPE[userInfo.user_type].MAX_CAPACITY_IN_MB}
              />
              <VarietyInput
                rangeList={rangeList}
                selectedVariety={selectedVariety}
                setSelectedVariety={setSelectedVariety}
                isCreatable={totalUsedMb < USER_TYPE[userInfo.user_type].MAX_CAPACITY_IN_MB}
              />
              <HarvestPeriodInput bean={bean} setBean={setBean} />
              <AltitudeInput bean={bean} setBean={setBean} />
            </div>

            <div className="md:w-1/2">
              <ProcessInput
                rangeList={rangeList}
                selectedProcess={selectedProcess}
                setSelectedProcess={setSelectedProcess}
                isCreatable={totalUsedMb < USER_TYPE[userInfo.user_type].MAX_CAPACITY_IN_MB}
              />
              <AromaInput
                rangeList={rangeList}
                selectedAroma={selectedAroma}
                setSelectedAroma={setSelectedAroma}
                isCreatable={totalUsedMb < USER_TYPE[userInfo.user_type].MAX_CAPACITY_IN_MB}
              />
              <MemoTextarea bean={bean} setBean={setBean} />
            </div>
          </div>

          <div className="flex items-center justify-between px-2 md:px-8 pb-8">
            <RedOutlineButton 
              text="Go Back" 
              onClick={setOpenBaseInfoTab}
              disabled={!tabState.canOpenBaseInfoTab}
            />
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
                        <label className="w-1/4">Blend Ratio</label>
                        <div className="font-medium w-3/4">
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
                addRange.isLoading ? "Preparing..." :
                isSubmitting ? "Submitting..." : "Submit"
              }
              disabled={
                !tabState.canOpenConfirmation || addRange.isLoading || isSubmitting
              }
              onClick={() => {
                finalizeBean().then(() => onSubmit())
              }}
            />
          </div>
        </div>
      </form>
    </ModalWrapperContainer>
  );
}

export default AddEditBeanModal
