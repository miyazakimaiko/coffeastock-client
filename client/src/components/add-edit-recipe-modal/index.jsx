import React, { useEffect, useCallback, useState, createRef } from 'react'
import { useUserData } from '../../context/AccountContext';
import { useAttributeRangeList, useInsertAttribute } from '../../context/AttributeRangeContext';
import { useRecipeList, useInsertRecipe, useUpdateRecipe } from '../../context/RecipeContext';
import { unescapeHtml } from '../../utils/HtmlConverter'
import './modals.scss'
import AddEditBeanModalContainer from './components/AddEditBeanModalContainer';
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
import AddEditPalateRangeInput from './components/AddEditPalateInput';
import AddEditMemoTextarea from './components/AddEditMemoTextarea';

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
    water_type: null,
    water_temp: null,
    yield_weight: null,
    extraction_time: null,
    tds: null,
    palate_rates: {},
    memo: null,
  })

  const [selectedBean, setSelectedBean] = useState(null)
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [selectedGrinder, setSelectedGrinder] = useState(null)
  const [selectedWater, setSelectedWater] = useState(null)
  const [palateRate, innerSetPalateRate] = useState({})
  const [palateRateHtmlDict, setPalateRateHtmlDict] = useState({})
  
  const setPalateRate = (key, value) => {
    const newRate = {};
    newRate[key] = value;
    innerSetPalateRate(palateRate => (
      { ...palateRate, ...newRate }
    ));
  }

  console.log('palateRate: ', palateRate)

  const [tabState, setTabState] = useState({
    baseInfoTab: true,
    detailsTab: false,
    palatesTab: false,
    confirmationTab: false,
    canGoToConfirmation: false
  });

  const baseInfoPage = createRef(null);
  const detailsPage = createRef(null);
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
  const setOpenBaseInfoTab = () => {
    showPage(baseInfoPage);
    hidePage(detailsPage);
    hidePage(palatesPage);
    hidePage(confirmationPage);
    setTabState({...tabState, baseInfoTab: true, detailsTab: false, palatesTab: false, confirmationTab: false});
 } 

  const setOpenDetailsTab = () => {
    hidePage(baseInfoPage);
    showPage(detailsPage);
    hidePage(palatesPage);
    hidePage(confirmationPage);
    setTabState({...tabState, baseInfoTab: false, detailsTab: true, palatesTab: false, confirmationTab: false});
  }

  const setOpenPalatesTab = () => {
    hidePage(baseInfoPage);
    hidePage(detailsPage);
    showPage(palatesPage);    
    hidePage(confirmationPage);
    setTabState({...tabState, baseInfoTab: false, detailsTab: false, palatesTab: true, confirmationTab: false});
  }

  const setOpenConfirmationTab = () => {
    hidePage(baseInfoPage);
    hidePage(detailsPage);
    hidePage(palatesPage);
    showPage(confirmationPage);
    setTabState({...tabState, baseInfoTab: false, detailsTab: false, palatesTab: false, confirmationTab: true});
  }

  const checkCanGoToConfirmation = useCallback(() => {
    if (recipe.coffee_bean_id && recipe.method) {
      setTabState({...tabState, canGoToConfirmation: true});
    }
    else {
      setTabState({...tabState, canGoToConfirmation: false});
    }
  }, [recipe.method, recipe.coffee_bean_id])

  const convertToId = (selectedRange, category) => {
    try {      
      for (const entry of Object.values(attributeRangeList[category + '_range'])) {
        if (unescapeHtml(entry['label']) === selectedRange['label']) {
          return entry['value']
        }
      }
    } catch { }
    return
  }

  const finalizeRecipe = () => {
    const methodId = convertToId(selectedMethod, 'method')
    const grinderId = convertToId(selectedGrinder, 'grinder')
    const waterId = convertToId(selectedWater, 'water')
    setRecipe({...recipe, 
      method: methodId,
      grinder: grinderId,
      water: waterId,
    });
  }

  const getNewRangeList = (selectedRange) => {
    let newRangeList = selectedRange.filter((x) => "__isNew__" in x);
    return newRangeList;
  }

  const insertNewRangeList = async () => {
    let newRangeList = {
      'method': getNewRangeList(selectedMethod),
      'grinder': getNewRangeList(selectedGrinder),
      'water': getNewRangeList(selectedWater)
    }
    for (const [category, entries] of Object.entries(newRangeList)) {
      for await (const entry of entries) {
        const body = { "label": entry.label, "def": "" };
        await insertAttribute(userData.sub, category, body);
      }
    }
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
        parateId={id}
        palateRate={palateRate}
        setPalateRate={setPalateRate}
      />
      setPalateRateHtmlDict(palateRateHtmlDict => ({...palateRateHtmlDict, ...elem}))
    })
  },[palateRate])

  useEffect(async () => {
    if (processAddSubmit && recipe.method !== null) {
      const insertSuccess = await insertRecipe(userData.sub, recipe);
      if (insertSuccess)
        setModal({mode: '', isOpen: false});
    }
  }, [processAddSubmit])

  useEffect(async () => {
    if (processEditSubmit && recipe.method !== null) {
      const updateSuccess = await updateRecipe(userData.sub, targetRecipe['recipe_id'], recipe);
      if (updateSuccess)
        setModal({mode: '', isOpen: false});
    }
  }, [processEditSubmit])

  // To enable/disable Next button to go to confirmation section
  useEffect(() => {
    checkCanGoToConfirmation();
  }, [recipe.method, recipe.coffee_bean_id]);

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

    <AddEditBeanModalContainer
      title={
        mode === 'add' ? 'Add New Recipe' :
        mode === 'edit' ? `Edit recipe ${targetRecipe['recipe_id']}` : null
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
            disabled={selectedBean === '' || selectedBean === null}
            tabState={tabState.detailsTab}
            onClick={setOpenDetailsTab}
          />
          <StepsTab
            key="palates"
            title="3. Palates"
            disabled={selectedBean === '' || selectedBean === null}
            tabState={tabState.palatesTab}
            onClick={setOpenPalatesTab}
          />
          <StepsTab
            key="confirmation"
            title="4. Confirmation"
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
              <FormMultiSelect 
                title="Coffee Bean"
                options={Object.values(beanList).map(({ coffee_bean_id: value, ...rest }) => ({ value, ...rest } ))}
                value={selectedBean}
                onChange={setSelectedBean}
                isCreatable={false}
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
              />
            </div>

            <div className="md:w-1/2">
              <FormMultiSelect 
                title="Grinder"
                options={Object.values(attributeRangeList.grinder_range)}
                value={selectedGrinder}
                onChange={setSelectedGrinder}
                isCreatable={true}
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
              disabled={
                selectedBean === null || 
                selectedBean === '' ? true : false
              }
              onClick={setOpenDetailsTab}
            />
          </div>
        </div>

        <div 
          ref={detailsPage}
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
                    {/* <InputConfirmSection
                      title="Name"
                      content={recipe.label}
                    />
                    <InputConfirmSection
                      title="Single Origin"
                      content={recipe.single_origin ? 'Yes' : 'No'}
                    />
                    <InputConfirmSection
                      title="Grade (0 - 100)"
                      content={recipe.grade}
                    />
                    <MultiselectConfirmSection
                      title="Roaster"
                      content={selectedRoaster}
                    />
                    <InputConfirmSection
                      title="Roast Level (0 - 10)"
                      content={recipe.roast_level}
                    />
                    <InputConfirmSection
                      title="Roast Date"
                      content={recipe.roast_date}
                    /> */}
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
                  <>

                  </>
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
                  <p className="inline ml-8">{recipe.memo ? recipe.memo : 'Not Entered'}</p>
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

export default AddEditRecipeModal
