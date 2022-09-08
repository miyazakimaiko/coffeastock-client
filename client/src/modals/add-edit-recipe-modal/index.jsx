import React, { useEffect, useState, createRef, useContext } from 'react'
import { useQueryClient } from 'react-query';
import extractNewItems from '../../helpers/ExtractNewItems';
import CoffeeBagRight from '../../assets/svgs/CoffeeBagRight';
import useRecipe from '../../hooks/useRecipe';
import useBeans from '../../hooks/useBeans';
import useRanges from '../../hooks/useRanges';
import useAddRange from '../../hooks/useAddRange';
import ModalWrapperContainer from '../../elements/ModalWrapperContainer';
import RedOutlineButton from '../../elements/RedOutlineButton';
import BlueButton from '../../elements/BlueButton';
import PencilAltIconButton from '../../elements/PencilAltIconButton';
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
import BeanInput from './components/BeanInput';
import BrewingDateInput from './components/BrewingDateInput';
import MethodInput from './components/MethodInput.jsx';
import GrinderInput from './components/GrinderInput';
import WaterInput from './components/WaterInput';
import '../modals.scss'
import {
  checkExtractionTimeIsInVaildForm,
  checkGrindSizeIsInRange,
  checkGroundsWeightIsInRange,
  checkMemoIsInRange,
  checkPalateRatesAreInRange,
  checkTdsIsInRange,
  checkTotalRateIsInRange,
  checkWaterTempIsInRange,
  checkWaterWeightIsInRange,
  checkYieldWeightIsInRange,
} from "./helpers/InputValidators";
import { formatExtractionTimeInputValue } from "./helpers/formatters"
import { unescapeHtml } from "../../helpers/HtmlConverter"
import PalateRadarChartSingle from '../../elements/PalateRadarChartSignle';
import RecipeService from '../../services/RecipeService';
import { ModalStateContext } from '../../context/ModalStateContext';
import { convertItemListToIdList } from '../../helpers/ListConverter';
import PalateSelectionInput from './components/PalateSelectionInput';



const AddEditRecipeModal = ({recipeId = null}) => {

  const queryClient = useQueryClient();
  const addRange = useAddRange();
  const { data: beanList, isLoading: beanListIsLoading } = useBeans();
  const { data: rangeList, isLoading: rangeListIsLoading } = useRanges();
  const { data: targetRecipe, isLoading: recipeIsLoading } = useRecipe(recipeId);
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


  const finalizeRecipe = () => {

    extractNewItems(selectedPalates).forEach(newPalate => {
      const label = newPalate.value;
      const id = Object.values(rangeList.palate_range).find(palate => palate.label === label)?.value;
      if (id) {
        palateRate[id] = palateRate[label];
        delete palateRate[label];
      }
    }) 

    // remove removed palate rates that are removed from palate selection
    function makeFinalPalateRate() {
      const finalPalateRateObj = {};
      const palateIdList = convertItemListToIdList(selectedPalates, rangeList.palate_range);
  
      for (const id of palateIdList) {
        finalPalateRateObj[id] = palateRate[id];
      }
      return finalPalateRateObj;
    }

    const finalPalateRate = makeFinalPalateRate();
    
    setRecipe({...recipe, 
      bean_id: selectedBean.bean_id,
      method: convertItemListToIdList(selectedMethod, rangeList.method_range),
      grinder: convertItemListToIdList(selectedGrinder, rangeList.grinder_range),
      water: convertItemListToIdList(selectedWater, rangeList.water_range),
      palate_rates: finalPalateRate
    });
  }

  const insertNewRangeList = async () => {
    console.log({selectedGrinder})
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
  
      if (selectedBean && selectedMethod && 
      grindSizeIsValid && groundsWeightIsValid) {
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
  }, [selectedBean, selectedMethod, recipe.grounds_weight, recipe.grind_size]);


  useEffect(() => {
    const setPalatesTabState = () => {
      const waterWeightIsValid = checkWaterWeightIsInRange(recipe.water_weight);
      const waterTempIsValid = checkWaterTempIsInRange(recipe.water_temp);
      const yieldWeightIsValid = checkYieldWeightIsInRange(recipe.yield_weight);
      const extractionTimeIsValid = checkExtractionTimeIsInVaildForm(recipe.extraction_time);
      const tdsIsValid = checkTdsIsInRange(recipe.tds);
      const totalRateIsValid = checkTotalRateIsInRange(recipe.total_rate);
  
      if ( waterWeightIsValid && waterTempIsValid && yieldWeightIsValid &&
      extractionTimeIsValid && tdsIsValid && totalRateIsValid && tabState.canOpenWaterYieldTab ) {
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
    setPalatesTabState();
  }, [
    tabState.canOpenWaterYieldTab,
    recipe.water_weight,
    recipe.water_temp,
    recipe.yield_weight,
    recipe.extraction_time,
    recipe.tds,
    recipe.total_rate,
  ]);


  useEffect(() => {
    const setConfirmationTabState = () => {
      const palatesAreInRange = checkPalateRatesAreInRange(palateRate);
      const memoIsInRange = checkMemoIsInRange(recipe.memo);
  
      if (palatesAreInRange && memoIsInRange && 
      tabState.canOpenWaterYieldTab && tabState.canOpenPalatesTab) {
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
    tabState.canOpenWaterYieldTab,
    tabState.canOpenPalatesTab,
    palateRate,
    recipe.memo,
  ]);


  if (recipeIsLoading || beanListIsLoading || rangeListIsLoading) {
    return 'Loading...'
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
                  />
                </div>

                <div className="md:w-1/2">
                  <GrinderInput
                    rangeList={rangeList}
                    selectedGrinder={selectedGrinder}
                    setSelectedGrinder={setSelectedGrinder}
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
                  text={isSubmitting ? "Submitting..." : "Submit"}
                  disabled={selectedBean === null || isSubmitting}
                  onClick={() => {
                    finalizeRecipe();
                    onSubmit();
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
