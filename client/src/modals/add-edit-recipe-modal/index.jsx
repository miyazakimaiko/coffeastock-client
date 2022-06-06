import React, { useEffect, useState, createRef } from 'react'
import { useUserData } from '../../context/AccountContext';
import extractNewItems from '../../helpers/ExtractNewItems';
import CoffeeBagRight from '../../assets/svgs/CoffeeBagRight';
import useBeans from '../../hooks/useBeans';
import useRanges from '../../hooks/useRanges';
import useAddRange from '../../hooks/useAddRange';
import useAddRecipe from '../../hooks/useAddRecipe';
import useEditRecipe from '../../hooks/useEditRecipe';
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
import PalateRangeInput from './components/PalateRangeInput';
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

const MODE = {
  ADD: 'add',
  EDIT: 'edit'
}

const AddEditRecipeModal = ({setModal, targetRecipe = null, mode = MODE.ADD}) => {
  const userData = useUserData()
  const { data: beanList, isLoading: beanListIsLoading } = useBeans(userData.sub)
  const { data: rangeList, isLoading: rangeListIsLoading } = useRanges(userData.sub)
  const addRange = useAddRange(userData.sub)
  const addRecipe = useAddRecipe(userData.sub)
  const editRecipe = useEditRecipe(userData.sub)

  const [recipe, setRecipe] = useState({
    bean_id: null,
    brew_date: null,
    method: {},
    grinder: {},
    grind_size: null,
    grounds_weight: null,
    water_weight: null,
    water: {},
    water_temp: null,
    yield_weight: null,
    extraction_time: null,
    tds: null,
    total_rate: null,
    palate_rates: {},
    memo: null,
  });

  const [selectedBean, setSelectedBean] = useState([])
  const [selectedMethod, setSelectedMethod] = useState([])
  const [selectedGrinder, setSelectedGrinder] = useState([])
  const [selectedWater, setSelectedWater] = useState([])
  const [palateRate, innerSetPalateRate] = useState({})
  const [palateRateHtmlDict, setPalateRateHtmlDict] = useState({})
  const [palateRateConfirmationHtmlDict, setPalateRateConfirmationHtmlDict] = useState({})

  const setPalateRate = (key, value) => {
    const newRate = {};
    newRate[key] = value;
    innerSetPalateRate((palateRate) => ({ ...palateRate, ...newRate }));
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

  const finalizeRecipe = () => {
    const methodId = Object.values(rangeList.method_range).map(item => {
      if (item.label === selectedMethod.label) 
        return parseInt(item.value)
    });
    const grinderId = Object.values(rangeList.grinder_range).map(item => {
      if (item.label === selectedGrinder.label) 
        return parseInt(item.value)
    });
    const waterId = Object.values(rangeList.water_range).map(item => {
      if (item.label === selectedWater.label) 
        return parseInt(item.value)
    });
    setRecipe({...recipe, 
      bean_id: selectedBean.bean_id,
      method: methodId.filter(Number),
      grinder: grinderId.filter(Number),
      water: waterId.filter(Number),
      palate_rates: palateRate
    });
  }

  const insertNewRangeList = async () => {
    let newRangeList = {
      method: extractNewItems([selectedMethod]),
      grinder: extractNewItems([selectedGrinder]),
      water: extractNewItems([selectedWater]),
    };
    for (const [rangeName, entries] of Object.entries(newRangeList)) {
      for await (const entry of entries) {
        const body = { label: entry.label, def: "" }
        await addRange.mutate({ rangeName,body })
      }
    }
  };

  const [processAddSubmit, setProcessAddSubmit] = useState(false);
  const [processEditSubmit, setProcessEditSubmit] = useState(false);

  const onSubmit = () => {
    finalizeRecipe();
    if (mode === MODE.ADD) {
      setProcessAddSubmit(true);
    }
    else if (mode === MODE.EDIT) {
      setProcessEditSubmit(true);
    }
  }


  useEffect(() => {
    setWaterYieldTabState();
  }, [selectedBean, selectedMethod, recipe.grounds_weight, recipe.grind_size]);


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


  useEffect(() => {
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


  useEffect(() => {
    setConfirmationTabState();
  }, [
    tabState.canOpenWaterYieldTab,
    tabState.canOpenPalatesTab,
    palateRate,
    recipe.memo,
  ]);


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


  useEffect(() => {
    if (!rangeListIsLoading) {
      Object.keys(rangeList.palate_range).forEach(id => {
        let elem = {}
        elem[id] = <PalateRangeInput
          title={rangeList.palate_range[id].label}
          parateId={rangeList.palate_range[id].value}
          palateRate={palateRate}
          setPalateRate={setPalateRate}
        />
        setPalateRateHtmlDict((palateRateHtmlDict) => ({
          ...palateRateHtmlDict,
          ...elem,
        }));
        let confirmElem = {}
        confirmElem[id] = (
          <InputConfirmSection
            title={rangeList.palate_range[id].label}
            content={palateRate[rangeList.palate_range[id].value]}
          />
        )
        setPalateRateConfirmationHtmlDict((palateRateConfirmationHtmlDict) => ({
          ...palateRateConfirmationHtmlDict,
          ...confirmElem,
        }));
      })
    }
  },[rangeList, palateRate])

  const formatExtractionTimeInputValue = (extraction_time) => {
    const units = ['hours', 'minutes', 'seconds']
    let result = '';
    if (extraction_time) {
      units.forEach(unit => {
        let time = '00'
        if (extraction_time[unit] !== undefined) {
          time = extraction_time[unit].toString()
          if (time.length === 1) {
            time = `0${time}`
          }
        }
        if (unit !== 'hours') {
          result = result.concat(':', time)
        }
        else result = result.concat(time)
      })
    }
    return result.length === 0 ? null : result
  }

  useEffect(() => {
    if (processAddSubmit && recipe.bean_id !== null) {
      addRecipe.mutate(recipe, {
        onSuccess: () => {
          setModal({ mode: "", isOpen: false });
        },
      });
    }
  }, [processAddSubmit]);

  useEffect(() => {
    if (processEditSubmit && recipe.bean_id !== null) {
      editRecipe.mutate(recipe, {
        onSuccess: () => {
          setModal({ mode: "", isOpen: false });
        },
      });
    }
  }, [processEditSubmit]);

  useEffect(() => {
    if (mode === MODE.EDIT) {
      setRecipe({
        ...recipe,
        ...targetRecipe,
        brew_date: targetRecipe.brew_date
          ? targetRecipe.brew_date.split("T")[0]
          : undefined,
        extraction_time: formatExtractionTimeInputValue(
          targetRecipe.extraction_time
        ),
      });
      for (const bean of beanList) {
        if (bean.bean_id === targetRecipe.bean_id) {
          setSelectedBean({ ...bean, value: bean.bean_id });
        }
      }
      const method = rangeList.method_range[`id-${targetRecipe.method[0]}`]
      const grinder = rangeList.grinder_range[`id-${targetRecipe.grinder[0]}`]
      const water = rangeList.water_range[`id-${targetRecipe.water[0]}`]
      setSelectedMethod(method);
      setSelectedGrinder(grinder);
      setSelectedWater(water);
    }
  }, []);

  useEffect(() => {
    if (mode === MODE.EDIT && Object.keys(targetRecipe.palate_rates).length !== 0) {
      Object.keys(targetRecipe.palate_rates).forEach((id) => {
        setPalateRate(id, targetRecipe.palate_rates[id]);
      });
    }
  }, [recipe]);

  if (beanListIsLoading || rangeListIsLoading) {
    return 'Loading...'
  }

  return (
    <ModalWrapperContainer
      onCloseClick={() => setModal({ mode: "", isOpen: false })}
      title={
        mode === "add"
          ? "Add New Recipe"
          : mode === "edit"
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
                    mode={mode}
                    beanList={beanList}
                    selectedBean={selectedBean}
                    setSelectedBean={setSelectedBean}
                  />
                  <BrewingDateInput
                    recipe={recipe}
                    setRecipe={setRecipe}
                  />
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
                  <GrindSizeInput
                    recipe={recipe}
                    setRecipe={setRecipe}
                  />
                  <GroundsWeightInput
                    recipe={recipe}
                    setRecipe={setRecipe}
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
                  <WaterWeightInput
                    recipe={recipe}
                    setRecipe={setRecipe}
                  />
                  <WaterTempInput
                    recipe={recipe}
                    setRecipe={setRecipe}
                  />
                </div>

                <div className="md:w-1/2">
                  <YieldWeightInput
                    recipe={recipe}
                    setRecipe={setRecipe}
                  />
                  <ExtractTimeInput
                    recipe={recipe}
                    setRecipe={setRecipe}
                  />
                  <TdsInput recipe={recipe} setRecipe={setRecipe} />
                  <TotalRateInput
                    recipe={recipe}
                    setRecipe={setRecipe}
                  />
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
              <div className="md:px-8 my-8 flex flex-wrap">
                {Object.values(palateRateHtmlDict)}
              </div>

              <div className="md:px-8 mb-8">
                <MemoTextarea recipe={recipe} setRecipe={setRecipe} />
              </div>

              <div className="flex items-center justify-between px-2 md:px-8 pb-8">
                <RedOutlineButton
                  text="Go Back"
                  onClick={setOpenCoffeeBeansTab}
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
                      {Object.values(palateRateConfirmationHtmlDict)}
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
                  text="Submit"
                  disabled={selectedBean === null}
                  onClick={onSubmit}
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
