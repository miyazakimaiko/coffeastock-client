import React, { useEffect, useState, createRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useGetSession, useSignout } from '../../context/AccountContext';
import { ModalStateContext } from '../../context/ModalStateContext';
import RecipeService from '../../services/RecipeService';
import { MAX_TEMP, USER_TYPE } from '../../utils/Constants';
import { checkItemsLabelLessThanMax } from '../../helpers/InputValidators';
import { convertItemListToIdList } from '../../helpers/ListConverter';
import { unescapeHtml } from "../../helpers/HtmlConverter"
import extractNewItems from '../../helpers/ExtractNewItems';
import CoffeeBagRight from '../../assets/svgs/CoffeeBagRight';
import useUserTotalUsedMb from '../../hooks/useUserTotalUsedMb';
import useRecipe from '../../hooks/useRecipe';
import useBeans from '../../hooks/useBeans';
import useRanges from '../../hooks/useRanges';
import useAddRange from '../../hooks/useAddRange';
import useUserInfo from '../../hooks/useUserInfo';
import useUnits from '../../hooks/useUnits';
import PalateRadarChartSingle from '../../elements/PalateRadarChartSignle';
import ModalWrapperContainer from '../../elements/ModalWrapperContainer';
import RedOutlineButton from '../../elements/RedOutlineButton';
import BlueButton from '../../elements/BlueButton';
import PencilAltIconButton from '../../elements/PencilAltIconButton';
import Spinner from '../../elements/Spinner';
import ErrorPage from '../../pages/error';
import StepsTab from './components/StepsTab';
import GrindSizeInput from './components/GrindSizeInput';
import GroundsWeightInput from './components/GroundsWeightInput';
import WaterWeightInput from './components/WaterWeightInput';
import WaterTempInput from './components/WaterTempInput';
import YieldWeightInput from './components/YieldWeightInput';
import ExtractTimeInput from './components/ExtractTimeInput';
import TdsInput from './components/TdsInput';
import TotalRateInput from './components/TotalRateInput'
import PalateRateInput from './components/PalateRateInput';
import MemoTextarea from './components/MemoTextarea';
import InputConfirmSection from './components/InputConfirmSection';
import MultiselectConfirmSection from './components/MultiselectConfirmSection';
import PalateSelectionInput from './components/PalateSelectionInput';
import BrewingDateInput from './components/BrewingDateInput';
import MethodInput from './components/MethodInput.jsx';
import GrinderInput from './components/GrinderInput';
import WaterInput from './components/WaterInput';
import BeanInput from './components/BeanInput';
import { formatExtractionTimeInputValue } from "./helpers/formatters"
import {
  checkExtractionTimeIsInVaildForm,
  checkGrindSizeIsInRange,
  checkGroundsWeightIsInRange,
  checkMemoIsInRange,
  checkPalateRatesAreInRange,
  checkPalatesCountInRange,
  checkTdsIsInRange,
  checkTotalRateIsInRange,
  checkWaterTempIsInRange,
  checkWaterWeightIsInRange,
  checkYieldWeightIsInRange,
} from "./helpers/InputValidators";
import '../modals.scss'




const AddEditRecipeModal = ({recipeId = null}) => {

  const getSession = useGetSession();
  const signout = useSignout();
  const navigate = useNavigate();

  // prevent from filling form while token is expired
  // (This prevents warning user to login again after filling the form)
  useEffect(() => {
    getSession((err, _) => {
      if (err) {
        signout();
        navigate('/login', { replace: true } );
      }
    });
  }, []);

  const queryClient = useQueryClient();

  const addRange = useAddRange();

  const { data: beanList, 
          isLoading: beanListIsLoading,
          isError: beanListHasError,
        } = useBeans();

  const { data: rangeList, 
          isLoading: rangeListIsLoading,
          isError: rangeListHasError,
        } = useRanges();

  const { data: targetRecipe, 
          isLoading: recipeIsLoading,
          isError: recipeHasError,
        } = useRecipe(recipeId);

  const { data: units, 
          isLoading: unitsAreLoading,
          isError: unitsHaveError,
        } = useUnits();

  const { data: totalUsedMb, 
          isLoading: totalUsedMbIsLoading,
          isError: totalUsedMbHasError,
        } = useUserTotalUsedMb();

  const { data: userInfo, 
          isLoading: userInfoAreLoading,
          isError: userInfoHaveError, 
        } = useUserInfo();

  const { modal, closeModal, modalModeSelection } = useContext(ModalStateContext);

  const [recipe, setRecipe, onSubmit, isSubmitting] = RecipeService();

  const [selectedBean, setSelectedBean] = useState(null)
  const [selectedMethod, setSelectedMethod] = useState([])
  const [selectedGrinder, setSelectedGrinder] = useState([])
  const [selectedWater, setSelectedWater] = useState([])
  const [selectedPalates, innerSetSelectedPalates] = useState([])
  const [palateRate, innerSetPalateRate] = useState({})

  const setSelectedPalates = (value) => {
    innerSetSelectedPalates(value);
  }

  const setPalateRate = (key, value) => {
    const newRate = {};
    newRate[key] = value;
    innerSetPalateRate(palateRate => ({ ...palateRate, ...newRate }));
  };

  useEffect(() => {
    async function dataAreReady() {
      let result = false;
      const beanListIsReady = Boolean(await beanList);
      const rangeListIsReady = Boolean(await rangeList);
      const recipeIsReady = Boolean(await targetRecipe);
      if (beanListIsReady && rangeListIsReady) {
        if (recipeId === null) result = true;
        else if (recipeIsReady) result = true;
      }
      return result;
    }

    dataAreReady().then(dataReady => {
      if (recipeId && dataReady) {
        let brewDate = new Date(targetRecipe.brew_date);
        const offset = brewDate.getTimezoneOffset();
        brewDate = new Date(brewDate.getTime() - (offset*60*1000));
  
        setRecipe({
          ...recipe,
          ...targetRecipe,
          brew_date: brewDate.toISOString().split('T')[0],
          extraction_time: formatExtractionTimeInputValue(
            targetRecipe.extraction_time
          ),
        });
  
        setSelectedBean({...beanList[targetRecipe.bean_id], label: unescapeHtml(beanList[targetRecipe.bean_id].label)});
        setSelectedMethod(targetRecipe.method.map(id => rangeList.method_range[id]));
        setSelectedGrinder(targetRecipe.grinder.map(id => rangeList.grinder_range[id]));
        setSelectedWater(targetRecipe.water.map(id => rangeList.water_range[id]));
        innerSetPalateRate(targetRecipe.palate_rates);
        setSelectedPalates(Object.keys(targetRecipe.palate_rates).map(id => rangeList.palate_range[id]))
      }
      else if (!recipeId && dataReady) {
        setSelectedPalates(
          Object.values(rangeList.palate_range).map(val => val)
        )
      }
    });
  }, [beanList, targetRecipe]);


  const finalizeRecipe = async () => {

    extractNewItems(selectedPalates).forEach(newPalate => {
      const label = newPalate.value;
      const id = Object.values(rangeList.palate_range).find(palate => palate.label === label).value;
      if (id) {
        palateRate[id] = palateRate[label];
        delete palateRate[label];
      }
    }) 

    // remove removed palate rates that are removed from palate selection
    async function makeFinalPalateRate() {
      const finalPalateRateObj = {};
      const palateIdList = await convertItemListToIdList(selectedPalates, rangeList.palate_range);
  
      for (const id of palateIdList) {
        finalPalateRateObj[id] = palateRate[id];
      }
      return finalPalateRateObj;
    }

    const finalPalateRate = await makeFinalPalateRate();
    
    setRecipe({...recipe, 
      bean_id: selectedBean.bean_id,
      method: await convertItemListToIdList(selectedMethod, rangeList.method_range),
      grinder: await convertItemListToIdList(selectedGrinder, rangeList.grinder_range),
      water: await convertItemListToIdList(selectedWater, rangeList.water_range),
      palate_rates: finalPalateRate
    });

    return;
  }

  const insertNewRangeList = async () => {
    let newRangeList = {
      method: extractNewItems(selectedMethod),
      grinder: extractNewItems(selectedGrinder),
      water: extractNewItems(selectedWater),
      palate: extractNewItems(selectedPalates),
    };
    for (const [rangeName, entries] of Object.entries(newRangeList)) {
      for await (const entry of entries) {
        const body = { label: entry.label, def: "" }
        await addRange.mutateAsync({ rangeName,body })
      }
    }
    queryClient.invalidateQueries("ranges");
  };

  const [tabState, setTabState] = useState({
    coffeeBeansTabIsOpen: true,
    waterYieldTabIsOpen: false,
    palatesTabIsOpen: false,
    confirmationTabIsOpen: false,
    canOpenWaterYieldTab: false,
    canOpenPalatesTab: false,
    canOpenConfirmationTab: false
  });

  const coffeeBeansPage = createRef(null);
  const waterYieldPage = createRef(null);
  const palatesPage = createRef(null);
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
  const setOpenCoffeeBeansTab = () => {
    showPage(coffeeBeansPage);
    hidePage(waterYieldPage);
    hidePage(palatesPage);
    hidePage(confirmationPage);
    setTabState({
      ...tabState,
      coffeeBeansTabIsOpen: true,
      waterYieldTabIsOpen: false,
      palatesTabIsOpen: false,
      confirmationTabIsOpen: false,
    });
  }; 

  const setOpenWaterYieldTab = () => {
    hidePage(coffeeBeansPage);
    showPage(waterYieldPage);
    hidePage(palatesPage);
    hidePage(confirmationPage);
    setTabState({
      ...tabState, 
      coffeeBeansTabIsOpen: false, 
      waterYieldTabIsOpen: true, 
      palatesTabIsOpen: false, 
      confirmationTabIsOpen: false
    });
  }

  const setOpenPalatesTab = () => {
    hidePage(coffeeBeansPage);
    hidePage(waterYieldPage);
    showPage(palatesPage);    
    hidePage(confirmationPage);
    setTabState({
      ...tabState, 
      coffeeBeansTabIsOpen: false, 
      waterYieldTabIsOpen: false, 
      palatesTabIsOpen: true, 
      confirmationTabIsOpen: false
    });
  }

  const setOpenConfirmationTab = () => {
    hidePage(coffeeBeansPage);
    hidePage(waterYieldPage);
    hidePage(palatesPage);
    showPage(confirmationPage);
    setTabState({
      ...tabState, 
      coffeeBeansTabIsOpen: false, 
      waterYieldTabIsOpen: false, 
      palatesTabIsOpen: false, 
      confirmationTabIsOpen: true
    });
  }


  useEffect(() => {
    const setWaterYieldTabState = () => {
      const grindSizeIsValid = checkGrindSizeIsInRange(recipe.grind_size);
      const groundsWeightIsValid = checkGroundsWeightIsInRange(recipe.grounds_weight);
      const methodIsValid = checkItemsLabelLessThanMax(selectedMethod);
      const grinderIsValid = checkItemsLabelLessThanMax(selectedGrinder);
      const waterIsValid = checkItemsLabelLessThanMax(selectedWater);
  
      if (selectedBean 
        && methodIsValid
        && grindSizeIsValid 
        && groundsWeightIsValid
        && methodIsValid
        && grinderIsValid
        && waterIsValid
        ) {
        setTabState(tabState => ({
          ...tabState,
          canOpenWaterYieldTab: true
        }));
      }
      else {
        setTabState(tabState => ({
          ...tabState,
          canOpenWaterYieldTab: false
        }));
      }
    }
    setWaterYieldTabState();
  }, [
    selectedBean, 
    selectedMethod, 
    recipe.grounds_weight, 
    recipe.grind_size,
    selectedGrinder,
    selectedWater
  ]);


  useEffect(() => {
    const setPalatesTabState = () => {
      const temperatureUnit = units['temp' + userInfo.unit_temperature_id].label.toUpperCase();
      const waterTempIsValid = checkWaterTempIsInRange(recipe.water_temp, MAX_TEMP[temperatureUnit]);
      const waterWeightIsValid = checkWaterWeightIsInRange(recipe.water_weight);
      const yieldWeightIsValid = checkYieldWeightIsInRange(recipe.yield_weight);
      const extractionTimeIsValid = checkExtractionTimeIsInVaildForm(recipe.extraction_time);
      const tdsIsValid = checkTdsIsInRange(recipe.tds);
      const totalRateIsValid = checkTotalRateIsInRange(recipe.total_rate);
      const palatesAreValid = checkItemsLabelLessThanMax(selectedPalates);
  
      if ( waterWeightIsValid 
        && waterTempIsValid 
        && yieldWeightIsValid 
        && extractionTimeIsValid 
        && tdsIsValid 
        && totalRateIsValid 
        && tabState.canOpenWaterYieldTab 
        && palatesAreValid 
      ) {
        setTabState((tabState) => ({
          ...tabState,
          canOpenPalatesTab: true,
        }));
      } 
      else {
        setTabState((tabState) => ({
          ...tabState,
          canOpenPalatesTab: false,
        }));
      }
    }
    if (units) {
      setPalatesTabState();
    }
  }, [
    units,
    tabState.canOpenWaterYieldTab,
    recipe.water_weight,
    recipe.water_temp,
    recipe.yield_weight,
    recipe.extraction_time,
    recipe.tds,
    recipe.total_rate,
    selectedPalates,
  ]);


  useEffect(() => {
    const setConfirmationTabState = () => {
      const palatesCountIsInRange = checkPalatesCountInRange(selectedPalates);
      const palatesAreInRange = checkPalateRatesAreInRange(palateRate);
      const memoIsInRange = checkMemoIsInRange(recipe.memo);
  
      if (palatesCountIsInRange 
          && palatesAreInRange 
          && memoIsInRange 
          && tabState.canOpenWaterYieldTab 
          && tabState.canOpenPalatesTab
      ) {
        setTabState((tabState) => ({
          ...tabState,
          canOpenConfirmationTab: true,
        }));
      }
      else {
        setTabState((tabState) => ({
          ...tabState,
          canOpenConfirmationTab: false,
        }));
      }
    }
    setConfirmationTabState();
  }, [
    selectedPalates,
    tabState.canOpenWaterYieldTab,
    tabState.canOpenPalatesTab,
    palateRate,
    recipe.memo,
  ]);


  if (recipeIsLoading 
    || beanListIsLoading
    || rangeListIsLoading
    || unitsAreLoading
    || userInfoAreLoading
    || totalUsedMbIsLoading)
  {
    return <Spinner />
  }

  if (beanListHasError 
    || rangeListHasError 
    || recipeHasError
    || unitsHaveError
    || userInfoHaveError
    || totalUsedMbHasError)
  {
    return <ErrorPage />
  }

  if (modal.mode === modalModeSelection.addRecipe 
    && totalUsedMb > USER_TYPE[userInfo.user_type].MAX_CAPACITY_IN_MB
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
      onCloseClick={closeModal}
      maxWidthClass="max-w-6xl"
      title={
        modal.mode === modalModeSelection.addRecipe
          ? "Add New Recipe"
          : modal.mode === modalModeSelection.editRecipe
          ? `Edit recipe`
          : null
      }
    >
      {Object.keys(beanList).length === 0 ? (
        <div className="flex flex-col items-center">
          <div className="w-40 my-20">
            <CoffeeBagRight name="No Coffee Beans Available" />
          </div>
          <p className="mb-16">
            There must be at least one coffee bean entry to create a new recipe.
            Please add coffee beans first.
          </p>
        </div>
      ) : (
        <>
          {/*body*/}
          <ul className="flex">
            <StepsTab
              key="coffee-beans"
              title="1. Coffee Beans"
              tabState={tabState.coffeeBeansTabIsOpen}
              onClick={setOpenCoffeeBeansTab}
            />
            <StepsTab
              key="water-yield"
              title="2. Water and Yield"
              disabled={!tabState.canOpenWaterYieldTab}
              tabState={tabState.waterYieldTabIsOpen}
              onClick={setOpenWaterYieldTab}
            />
            <StepsTab
              key="palates"
              title="3. Palates and Memo"
              disabled={!tabState.canOpenPalatesTab}
              tabState={tabState.palatesTabIsOpen}
              onClick={setOpenPalatesTab}
            />
            <StepsTab
              key="confirmation"
              title="4. Confirmation"
              disabled={!tabState.canOpenConfirmationTab}
              tabState={tabState.confirmationTabIsOpen}
              onClick={() => {
                setOpenConfirmationTab();
                insertNewRangeList();
              }}
            />
          </ul>

          <form className="tab-content">
            <div
              ref={coffeeBeansPage}
              className="ease-linear transition-all duration-300"
            >
              <div className="md:flex md:px-8 my-8">
                <div className="flex flex-col md:w-1/2">
                  <BeanInput
                    mode={modal.mode}
                    beanList={beanList}
                    selectedBean={selectedBean}
                    setSelectedBean={setSelectedBean}
                  />
                  <BrewingDateInput recipe={recipe} setRecipe={setRecipe} />
                  <MethodInput
                    rangeList={rangeList}
                    selectedMethod={selectedMethod}
                    setSelectedMethod={setSelectedMethod}
                    isCreatable={totalUsedMb < USER_TYPE[userInfo.user_type].MAX_CAPACITY_IN_MB}
                  />
                </div>

                <div className="md:w-1/2">
                  <GrinderInput
                    rangeList={rangeList}
                    selectedGrinder={selectedGrinder}
                    setSelectedGrinder={setSelectedGrinder}
                    isCreatable={totalUsedMb < USER_TYPE[userInfo.user_type].MAX_CAPACITY_IN_MB}
                  />
                  <GrindSizeInput recipe={recipe} setRecipe={setRecipe} />
                  <GroundsWeightInput recipe={recipe} setRecipe={setRecipe} />
                </div>
              </div>
              <div className="flex items-center justify-between px-2 md:px-8 pb-8">
                <RedOutlineButton text="Cancel" onClick={closeModal} />
                <BlueButton
                  text="Next"
                  disabled={!tabState.canOpenWaterYieldTab}
                  onClick={setOpenWaterYieldTab}
                />
              </div>
            </div>

            <div
              ref={waterYieldPage}
              className="overflow-hidden h-0 opacity-0 ease-linear transition-all duration-300"
            >
              <div className="md:px-8 my-8 block md:flex">
                <div className="flex flex-col md:w-1/2">
                  <WaterInput
                    rangeList={rangeList}
                    selectedWater={selectedWater}
                    setSelectedWater={setSelectedWater}
                    isCreatable={totalUsedMb < USER_TYPE[userInfo.user_type].MAX_CAPACITY_IN_MB}
                  />
                  <WaterWeightInput recipe={recipe} setRecipe={setRecipe} />
                  <WaterTempInput recipe={recipe} setRecipe={setRecipe} />
                </div>

                <div className="md:w-1/2">
                  <YieldWeightInput recipe={recipe} setRecipe={setRecipe} />
                  <ExtractTimeInput recipe={recipe} setRecipe={setRecipe} />
                  <TdsInput recipe={recipe} setRecipe={setRecipe} />
                  <TotalRateInput recipe={recipe} setRecipe={setRecipe} />
                </div>
              </div>

              <div className="flex items-center justify-between px-2 md:px-8 pb-8">
                <RedOutlineButton
                  text="Go Back"
                  onClick={setOpenCoffeeBeansTab}
                />
                <BlueButton
                  text="Next"
                  disabled={!tabState.canOpenPalatesTab}
                  onClick={() => {
                    setOpenPalatesTab();
                    insertNewRangeList();
                  }}
                />
              </div>
            </div>

            <div
              ref={palatesPage}
              className="overflow-hidden h-0 opacity-0 ease-linear transition-all duration-300"
            >
              <div className="md:flex m-8">
                <PalateRadarChartSingle
                  className="w-full md:w-1/2 max-w-lg mx-auto"
                  labels={Object.values(selectedPalates).map(
                    (palate) => palate.label
                  )}
                  rates={Object.values(selectedPalates).map((palate) =>
                    parseInt(palateRate[palate.value])
                  )}
                />
                <div className="w-full md:w-1/2 max-w-lg mx-auto">
                  <PalateSelectionInput
                    rangeList={rangeList}
                    selectedPalates={selectedPalates}
                    setSelectedPalates={setSelectedPalates}
                    isCreatable={totalUsedMb < USER_TYPE[userInfo.user_type].MAX_CAPACITY_IN_MB}
                  />
                  {Object.values(selectedPalates).map((palate) => (
                    <PalateRateInput
                      title={palate.label}
                      parateId={palate.value}
                      palateRate={palateRate[palate.value]}
                      setPalateRate={setPalateRate}
                    />
                  ))}
                </div>
              </div>

              <div className="md:px-8 mb-8">
                <MemoTextarea recipe={recipe} setRecipe={setRecipe} />
              </div>

              <div className="flex items-center justify-between px-2 md:px-8 pb-8">
                <RedOutlineButton
                  text="Go Back"
                  onClick={setOpenWaterYieldTab}
                />
                <BlueButton
                  text="Next"
                  disabled={!tabState.canOpenConfirmationTab}
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
                  <div className="flex flex-col w-full md:w-1/3">
                    <div>
                      <div className="flex mx-4 mb-4">
                        <h3 className="text-lg">Coffee Beans</h3>
                        <PencilAltIconButton
                          width="5"
                          onClick={setOpenCoffeeBeansTab}
                        />
                      </div>
                      <div className="mb-8 md:m-8">
                        <InputConfirmSection
                          title="Coffee Bean"
                          content={selectedBean ? selectedBean.label : null}
                        />
                        <InputConfirmSection
                          title="Brewing Date"
                          content={recipe.brew_date}
                        />
                        <MultiselectConfirmSection
                          title="Brewing Method"
                          content={selectedMethod}
                        />
                        <MultiselectConfirmSection
                          title="Grinder"
                          content={selectedGrinder}
                        />
                        <InputConfirmSection
                          title="Grind Size"
                          content={recipe.grind_size}
                        />
                        <InputConfirmSection
                          title="Grounds Weight"
                          content={recipe.grounds_weight}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/3">
                    <div className="flex mx-4 mb-4">
                      <h3 className="text-lg">Water and Yield</h3>
                      <PencilAltIconButton
                        width="5"
                        onClick={setOpenWaterYieldTab}
                      />
                    </div>
                    <div className="mb-8 md:m-8">
                      <MultiselectConfirmSection
                        title="Water"
                        content={selectedWater}
                      />
                      <InputConfirmSection
                        title="Water Weight"
                        content={recipe.water_weight}
                      />
                      <InputConfirmSection
                        title="Water Temperature"
                        content={recipe.water_temp}
                      />
                      <InputConfirmSection
                        title="Yield Weight"
                        content={recipe.yield_weight}
                      />
                      <InputConfirmSection
                        title="Extraction Time"
                        content={recipe.extraction_time}
                      />
                      <InputConfirmSection title="TDS" content={recipe.tds} />
                      <InputConfirmSection
                        title="Total Rate"
                        content={recipe.total_rate}
                      />
                    </div>
                  </div>

                  <div className="md:w-1/3">
                    <div className="flex mx-4 mb-4">
                      <h3 className="text-lg">Palates</h3>
                      <PencilAltIconButton
                        width="5"
                        onClick={setOpenPalatesTab}
                      />
                    </div>
                    <div className="mb-8 md:m-8">
                      {selectedPalates.map((palate) => (
                        <InputConfirmSection
                          title={palate.label}
                          content={palateRate[palate.value]}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mx-4 md:mx-6 my-2">
                    <div className="w-full flex items-center">
                      <h3 className="inline">Memo</h3>
                      <PencilAltIconButton
                        width="5"
                        onClick={setOpenPalatesTab}
                      />
                      :
                      <p className="inline ml-8">
                        {recipe.memo ? recipe.memo : "Not Entered"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-2 md:px-8 py-8">
                <RedOutlineButton
                  text="Go Back"
                  onClick={setOpenWaterYieldTab}
                />
                <BlueButton
                  text={isSubmitting ? "Submitting..." :
                        addRange.isLoading ? "Preparing..." : "Submit"}
                  disabled={ selectedBean === null 
                             || addRange.isLoading 
                             || isSubmitting
                            }
                  onClick={() => {
                    finalizeRecipe().then(() => {
                      onSubmit();
                    })
                  }}
                />
              </div>
            </div>
          </form>
        </>
      )}
    </ModalWrapperContainer>
  );
}

export default AddEditRecipeModal
