import React, { useEffect, useState, createRef } from 'react'
import { useUserData } from '../../context/AccountContext';
import { useAttributeRangeList, useInsertAttribute } from '../../context/AttributeRangeContext';
import { useRecipeList, useInsertRecipe, useUpdateRecipe } from '../../context/RecipeContext';
import { unescapeHtml } from '../../utils/HtmlConverter'
import './modals.scss'
import ModalWrapperContainer from '../elements/ModalWrapperContainer';
import StepsTab from './components/StepsTab';
import FormInput from '../elements/FormInput';
import FormMultiSelect from '../elements/FormMultiSelect';
import RedOutlineButton from '../elements/RedOutlineButton';
import BlueButton from '../elements/BlueButton';
import PencilAltIconButton from '../elements/PencilAltIconButton';
import AddEditGrindSizeInput from './components/AddEditGrindSizeInput';
import AddEditGroundsWeightInput from './components/AddEditGroundsWeightInput';
import { useBeanList } from '../../context/BeansContext';
import AddEditWaterWeightInput from './components/AddEditWaterWeightInput';
import AddEditWaterTempInput from './components/AddEditWaterTempInput';
import AddEditYieldWeightInput from './components/AddEditYieldWeightInput';
import AddEditExtractTimeInput from './components/AddEditExtractTimeInput';
import AddEditTdsInput from './components/AddEditTdsInput';
import AddEditPalateRangeInput from './components/AddEditPalateRangeInput';
import AddEditMemoTextarea from './components/AddEditMemoTextarea';
import InputConfirmSection from './components/InputConfirmSection';
import MultiselectConfirmSection from './components/MultiselectConfirmSection';
import CoffeeBagRight from '../../assets/svgs/CoffeeBagRight';

const MODE = {
  ADD: 'add',
  EDIT: 'edit'
}

const AddEditRecipeModal = ({setModal, targetRecipe, mode = MODE.ADD}) => {
  const userData = useUserData()
  const beanList = useBeanList()
  const attributeRangeList = useAttributeRangeList() 
  const insertAttribute = useInsertAttribute()
  const recipeList = useRecipeList()
  const insertRecipe = useInsertRecipe()
  const updateRecipe = useUpdateRecipe()

  const [recipe, setRecipe] = useState({
    bean_id: null,
    brew_date: null,
    method: null,
    grinder: null,
    grind_size: null,
    grounds_weight: null,
    water_weight: null,
    water: null,
    water_temp: null,
    yield_weight: null,
    extraction_time: null,
    tds: null,
    palate: {},
    memo: null,
  })

  const [selectedBean, setSelectedBean] = useState(null)
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [selectedGrinder, setSelectedGrinder] = useState(null)
  const [selectedWater, setSelectedWater] = useState(null)
  const [palateRate, innerSetPalateRate] = useState({})
  const [palateRateHtmlDict, setPalateRateHtmlDict] = useState({})
  const [palateRateConfirmationHtmlDict, setPalateRateConfirmationHtmlDict] = useState({})
  
  const setPalateRate = (key, value) => {
    const newRate = {};
    newRate[key] = value;
    innerSetPalateRate(palateRate => (
      { ...palateRate, ...newRate }
    ));
  }

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
    setTabState({...tabState, coffeeBeansTab: true, waterYieldTab: false, palatesTab: false, confirmationTab: false});
 } 

  const setOpenWaterYieldTab = () => {
    hidePage(coffeeBeansPage);
    showPage(waterYieldPage);
    hidePage(palatesPage);
    hidePage(confirmationPage);
    setTabState({...tabState, coffeeBeansTab: false, waterYieldTab: true, palatesTab: false, confirmationTab: false});
  }

  const setOpenPalatesTab = () => {
    hidePage(coffeeBeansPage);
    hidePage(waterYieldPage);
    showPage(palatesPage);    
    hidePage(confirmationPage);
    setTabState({...tabState, coffeeBeansTab: false, waterYieldTab: false, palatesTab: true, confirmationTab: false});
  }

  const setOpenConfirmationTab = () => {
    hidePage(coffeeBeansPage);
    hidePage(waterYieldPage);
    hidePage(palatesPage);
    showPage(confirmationPage);
    setTabState({...tabState, coffeeBeansTab: false, waterYieldTab: false, palatesTab: false, confirmationTab: true});
  }

  const convertAttrToId = (selectedRange, category) => {
    let id = null
    try {      
      Object.values(attributeRangeList[category + '_range']).forEach(entry => {
        if (unescapeHtml(entry['label']) === selectedRange['label']) {
          id = entry['value']
        }
      })
    } catch { }
    return id
  }

  const convertBeanToId = (selectedBean) => {
    let id = null
    try {
      Object.keys(beanList).forEach(beanId => {
        if (selectedBean['value'] === beanId) {
          id = beanId
        }
      })
    } catch {}
    return id
  }

  const finalizeRecipe = () => {
    const beanId = convertBeanToId(selectedBean)
    const methodId = convertAttrToId(selectedMethod, 'method')
    const grinderId = convertAttrToId(selectedGrinder, 'grinder')
    const waterId = convertAttrToId(selectedWater, 'water')
    setRecipe({...recipe, 
      bean_id: beanId,
      method: methodId,
      grinder: grinderId,
      water: waterId,
      palate: palateRate
    });
  }

  const getNewRange = (selectedRange) => {
    try {    
      if ("__isNew__" in selectedRange) {
        return selectedRange
      }
    } catch {}
    return
  }

  const insertNewRangeList = async () => {
    let newRangeObj = {
      'method': getNewRange(selectedMethod),
      'grinder': getNewRange(selectedGrinder),
      'water': getNewRange(selectedWater)
    }
    try {      
      for await (const [category, entries] of Object.entries(newRangeObj)) {
        const body = { "label": entries.label, "def": "" };
        await insertAttribute(userData.sub, category, body);
      }
    } catch { }
  }

  const [processAddSubmit, setProcessAddSubmit] = useState(false);
  const [processEditSubmit, setProcessEditSubmit] = useState(false);

  const onSubmit = () => {
    finalizeRecipe();
    if (mode === 'add') {
      setProcessAddSubmit(true);
    }
    else if (mode === 'edit') {
      setProcessEditSubmit(true);
    }
  }

  useEffect(() => {
    Object.keys(attributeRangeList['palate_range']).forEach(id => {
      let elem = {}
      elem[id] = <AddEditPalateRangeInput
        title={attributeRangeList['palate_range'][id]['label']}
        parateId={attributeRangeList['palate_range'][id]['value']}
        palateRate={palateRate}
        setPalateRate={setPalateRate}
      />
      setPalateRateHtmlDict(palateRateHtmlDict => ({...palateRateHtmlDict, ...elem}))
      let confirmElem = {}
      confirmElem[id] = <InputConfirmSection
      title={attributeRangeList['palate_range'][id]['label']}
      content={palateRate[attributeRangeList['palate_range'][id]['value']]}
      />
      setPalateRateConfirmationHtmlDict(palateRateConfirmationHtmlDict => ({...palateRateConfirmationHtmlDict, ...confirmElem}))
    })
  },[palateRate])


  useEffect(async () => {
    console.log('recipe: ', recipe)
    if (processAddSubmit && recipe.bean_id !== null) {
      const insertSuccess = await insertRecipe(userData.sub, recipe.bean_id, recipe);
      if (insertSuccess)
        setModal({mode: '', isOpen: false});
    }
  }, [processAddSubmit])

  useEffect(async () => {
    if (processEditSubmit && recipe.bean_id !== null) {
      const updateSuccess = await updateRecipe(userData.sub, targetRecipe['recipe_id'], recipe);
      if (updateSuccess)
        setModal({mode: '', isOpen: false});
    }
  }, [processEditSubmit])

  useEffect(() => {
    if (mode === 'edit') {
      setRecipe({...recipe,
        brew_date: targetRecipe['brew_date'] ? targetRecipe['brew_date'].split('T')[0] : undefined,
        grind_size: targetRecipe['grind_size'],
        grounds_weight: targetRecipe['grounds_weight'],
        water_weight: targetRecipe['water_weight'],
        water_temp: targetRecipe['water_temp'],
        yield_weight: targetRecipe['yield_weight'],
        extraction_time: targetRecipe['extraction_time'],
        tds: targetRecipe['tds'],
        memo: targetRecipe['memo'],
      })
    }
  },[])

  useEffect(() => {
    if (mode === 'edit' && Object.keys(targetRecipe['palate_rate']).length !== 0) {
      Object.keys(targetRecipe['palate_rate']).forEach(id => {
        setPalateRate(id, targetRecipe['palate_rate'][id])
      })
    }
  }, [recipe])

  return (

    <ModalWrapperContainer
      onCloseClick={() => setModal({mode: '', isOpen: false})}
      title={
        mode === 'add' ? 'Add New Recipe' :
        mode === 'edit' ? `Edit recipe ${targetRecipe['recipe_id']}` : null
      }
    >
      {Object.keys(beanList).length === 0
        ? 
        <div className="flex flex-col items-center">
          <div className="w-40 my-20">
            <CoffeeBagRight name="No Coffee Beans Available"/>
          </div>
          <p className="mb-16">There must be at least one coffee bean entry to create a new recipe. Please add coffee beans first.</p>
        </div>
        :
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
              disabled={selectedBean === null || selectedBean.length === 0}
              tabState={tabState.waterYieldTab}
              onClick={setOpenWaterYieldTab}
            />
            <StepsTab
              key="palates"
              title="3. Palates and Memo"
              disabled={selectedBean === null || selectedBean.length === 0}
              tabState={tabState.palatesTab}
              onClick={setOpenPalatesTab}
            />
            <StepsTab
              key="confirmation"
              title="4. Confirmation"
              disabled={selectedBean === null || selectedBean.length === 0}
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
              ref={coffeeBeansPage} 
              className="ease-linear transition-all duration-300"
            >
              <div className="md:flex md:px-8 my-8">
                <div className="flex flex-col md:w-1/2">
                  <FormMultiSelect 
                    title="Coffee Bean"
                    options={Object.values(beanList).map(({ coffee_bean_id: value, ...rest }) => ({ value, ...rest } ))}
                    value={selectedBean}
                    onChange={setSelectedBean}
                    isCreatable={false}
                    isMulti={false}
                  />
                  <FormInput
                    title="Brewing Date"
                    type="date" 
                    name="brewingdate" 
                    value={recipe.brew_date}
                    onChange={e => setRecipe({...recipe, brew_date: e.target.value})}
                  />
                  <FormMultiSelect 
                    title="Brewing Method"
                    options={Object.values(attributeRangeList.method_range)}
                    value={selectedMethod}
                    onChange={setSelectedMethod}
                    isCreatable={true}
                    isMulti={false}
                  />
                </div>

                <div className="md:w-1/2">
                  <FormMultiSelect 
                    title="Grinder"
                    options={Object.values(attributeRangeList.grinder_range)}
                    value={selectedGrinder}
                    onChange={setSelectedGrinder}
                    isCreatable={true}
                    isMulti={false}
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
                  onClick={() => setModal({mode: '', isOpen: false})}
                />
                <BlueButton
                  text="Next"
                  disabled={selectedBean === null || selectedBean.length === 0}
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
                  <FormMultiSelect 
                    title="Water"
                    options={Object.values(attributeRangeList.water_range)}
                    value={selectedWater}
                    onChange={setSelectedWater}
                    isCreatable={true}
                    isMulti={false}
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
                  <AddEditTdsInput
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
                  disabled={selectedBean === null || selectedBean.length === 0}
                  onClick={() => {
                    setOpenConfirmationTab();
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
                <AddEditMemoTextarea
                  recipe={recipe}
                  setRecipe={setRecipe}
                />
              </div>

              <div className="flex items-center justify-between px-2 md:px-8 pb-8">
                <RedOutlineButton
                  text="Go Back"
                  onClick={setOpenCoffeeBeansTab}
                />
                <BlueButton
                  text="Next"
                  disabled={selectedBean === null || selectedBean.length === 0}
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
                      <InputConfirmSection
                        title="TDS"
                        content={recipe.tds}
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
                      <p className="inline ml-8">{recipe.memo ? recipe.memo : 'Not Entered'}</p>
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
                  disabled={selectedBean === null || selectedBean.length === 0}
                  onClick={onSubmit}
                />
              </div>
            </div>
          </form>
        </>
      }
    </ModalWrapperContainer>
  )
}

export default AddEditRecipeModal
