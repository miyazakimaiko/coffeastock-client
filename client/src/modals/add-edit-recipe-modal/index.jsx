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
import FormInput from '../../elements/FormInput';
import FormMultiSelect from '../../elements/FormMultiSelect';
import RedOutlineButton from '../../elements/RedOutlineButton';
import BlueButton from '../../elements/BlueButton';
import PencilAltIconButton from '../../elements/PencilAltIconButton';
import StepsTab from './components/StepsTab';
import AddEditGrindSizeInput from './components/AddEditGrindSizeInput';
import AddEditGroundsWeightInput from './components/AddEditGroundsWeightInput';
import AddEditWaterWeightInput from './components/AddEditWaterWeightInput';
import AddEditWaterTempInput from './components/AddEditWaterTempInput';
import AddEditYieldWeightInput from './components/AddEditYieldWeightInput';
import AddEditExtractTimeInput from './components/AddEditExtractTimeInput';
import AddEditTdsInput from './components/AddEditTdsInput';
import AddEditTotalRateInput from './components/AddEditTotalRateInput'
import AddEditPalateRangeInput from './components/AddEditPalateRangeInput';
import AddEditMemoTextarea from './components/AddEditMemoTextarea';
import InputConfirmSection from './components/InputConfirmSection';
import MultiselectConfirmSection from './components/MultiselectConfirmSection';
import '../modals.scss'
import BeanInput from './components/BeanInput';
import BrewingDateInput from './components/BrewingDateInput';
import MethodInput from './components/MethodInput.jsx';
import GrinderInput from './components/GrinderInput';
import WaterInput from './components/WaterInput';

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
    grinder: [],
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

  const [selectedBean, setSelectedBean] = useState(null)
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
    coffeeBeansTab: true,
    waterYieldTab: false,
    palatesTab: false,
    confirmationTab: false,
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
      coffeeBeansTab: true,
      waterYieldTab: false,
      palatesTab: false,
      confirmationTab: false,
    });
  }; 

  const setOpenWaterYieldTab = () => {
    hidePage(coffeeBeansPage);
    showPage(waterYieldPage);
    hidePage(palatesPage);
    hidePage(confirmationPage);
    setTabState({
      ...tabState, 
      coffeeBeansTab: false, 
      waterYieldTab: true, 
      palatesTab: false, 
      confirmationTab: false
    });
  }

  const setOpenPalatesTab = () => {
    hidePage(coffeeBeansPage);
    hidePage(waterYieldPage);
    showPage(palatesPage);    
    hidePage(confirmationPage);
    setTabState({
      ...tabState, 
      coffeeBeansTab: false, 
      waterYieldTab: false, 
      palatesTab: true, 
      confirmationTab: false
    });
  }

  const setOpenConfirmationTab = () => {
    hidePage(coffeeBeansPage);
    hidePage(waterYieldPage);
    hidePage(palatesPage);
    showPage(confirmationPage);
    setTabState({
      ...tabState, 
      coffeeBeansTab: false, 
      waterYieldTab: false, 
      palatesTab: false, 
      confirmationTab: true
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
        const body = { "label": entry.label, "def": "" }
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

  const canGoToConfirmation = () => {
    if (selectedBean === null || selectedMethod === null) {
        return false
    } 
    return true
  }

  useEffect(() => {
    Object.keys(rangeList.palate_range).forEach(id => {
      let elem = {}
      elem[id] = <AddEditPalateRangeInput
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
  },[palateRate])

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
              tabState={tabState.coffeeBeansTab}
              onClick={setOpenCoffeeBeansTab}
            />
            <StepsTab
              key="water-yield"
              title="2. Water and Yield"
              disabled={!canGoToConfirmation()}
              tabState={tabState.waterYieldTab}
              onClick={setOpenWaterYieldTab}
            />
            <StepsTab
              key="palates"
              title="3. Palates and Memo"
              disabled={!canGoToConfirmation()}
              tabState={tabState.palatesTab}
              onClick={setOpenPalatesTab}
            />
            <StepsTab
              key="confirmation"
              title="4. Confirmation"
              disabled={!canGoToConfirmation()}
              tabState={tabState.confirmationTab}
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
                  <AddEditGrindSizeInput
                    recipe={recipe}
                    setRecipe={setRecipe}
                  />
                  <AddEditGroundsWeightInput
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
                  disabled={!canGoToConfirmation()}
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
                  <AddEditWaterWeightInput
                    recipe={recipe}
                    setRecipe={setRecipe}
                  />
                  <AddEditWaterTempInput
                    recipe={recipe}
                    setRecipe={setRecipe}
                  />
                </div>

                <div className="md:w-1/2">
                  <AddEditYieldWeightInput
                    recipe={recipe}
                    setRecipe={setRecipe}
                  />
                  <AddEditExtractTimeInput
                    recipe={recipe}
                    setRecipe={setRecipe}
                  />
                  <AddEditTdsInput recipe={recipe} setRecipe={setRecipe} />
                  <AddEditTotalRateInput
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
                  disabled={selectedBean === null}
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
                <AddEditMemoTextarea recipe={recipe} setRecipe={setRecipe} />
              </div>

              <div className="flex items-center justify-between px-2 md:px-8 pb-8">
                <RedOutlineButton
                  text="Go Back"
                  onClick={setOpenCoffeeBeansTab}
                />
                <BlueButton
                  text="Next"
                  disabled={selectedBean === null}
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
