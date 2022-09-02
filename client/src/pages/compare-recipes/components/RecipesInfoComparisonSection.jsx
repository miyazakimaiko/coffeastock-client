import React, { useContext, useState } from 'react'
import { useUserData } from '../../../context/AccountContext';
import { ModalStateContext } from '../../../context/ModalStateContext';
import BlueButton from '../../../elements/BlueButton';
import PalateRadarChartDouble from '../../../elements/PalateRadarChartDouble';
import convertIntervalObjToString from '../../../helpers/ConvertIntervalObjToString';
import useBeans from '../../../hooks/useBeans';
import useRanges from '../../../hooks/useRanges';
import useRecipe from '../../../hooks/useRecipe'
import AddEditRecipeModal from '../../../modals/add-edit-recipe-modal';
import RecipeComparisonListItem from './RecipeComparisonListItem';

const RecipesInfoComparisonSection = ({ selectedRecipeLeftId, selectedRecipeRightId }) => {
  const userData = useUserData();
  const { data: rangeList, isLoading: rangeListIsLoading } = useRanges();
  const { data: beanList, isLoading: beanListIsLoading } = useBeans(userData.sub, userData.accessToken.jwtToken);

  const { 
    data: selectedRecipeRight, 
    isLoading: recipeRightIsLoading 
  } = useRecipe(selectedRecipeRightId);

  const { 
    data: selectedRecipeLeft, 
    isLoading: recipeLeftIsLoading 
  } = useRecipe(selectedRecipeLeftId);

  const {
    modal,
    openEditRecipeModal,
    modalModeSelection,
  } = useContext(ModalStateContext);

  const [recipeToEdit, setRecipeToEdit] = useState(null);

  function openEditRecipeModalOfSide(position) {
    if (position === 'left') {
      setRecipeToEdit(selectedRecipeLeft);
    }
    else if (position === 'right') {
      setRecipeToEdit(selectedRecipeRight);
    }
    openEditRecipeModal();
  }

  if (recipeLeftIsLoading 
    || recipeRightIsLoading 
    || rangeListIsLoading 
    || beanListIsLoading
  ) {
    return 'Loading...'
  }

  return (
    <>
      { selectedRecipeLeft || selectedRecipeRight ? (
        <div className="bg-white py-10 m-10 rounded-lg shadow-sm">
          <h3 className="mt-5 mb-16 text-xl text-center">
            Recipes Info Comparison
          </h3>
          <PalateRadarChartDouble
            className="w-full md:w-1/2 max-w-lg mx-auto"
            redTitle={selectedRecipeLeft ? `${beanList[selectedRecipeLeft.bean_id]?.label} ${
              selectedRecipeLeft.label
            }` : 'Not Selected'}
            blueTitle={selectedRecipeRight ? `${beanList[selectedRecipeRight.bean_id]?.label} ${
              selectedRecipeRight.label
            }` : 'Not Selected'}
            redRatesObj={selectedRecipeLeft?.palate_rates}
            blueRatesObj={selectedRecipeRight?.palate_rates}
          />
          <div className="recipe-conparison-container my-12 mx-2 md:mx-12">
            <RecipeComparisonListItem
              name="Beans"
              leftData={beanList[selectedRecipeLeft?.bean_id]?.label}
              rightData={beanList[selectedRecipeRight?.bean_id]?.label}
            />
            <RecipeComparisonListItem
              name="Number"
              leftData={selectedRecipeLeft?.label}
              rightData={selectedRecipeRight?.label}
            />
            <RecipeComparisonListItem
              name="Brew Date"
              leftData={selectedRecipeLeft?.brew_date}
              rightData={selectedRecipeRight?.brew_date}
            />
            <RecipeComparisonListItem
              name="Total Rate"
              leftData={selectedRecipeLeft?.total_rate}
              rightData={selectedRecipeRight?.total_rate}
            />
            <RecipeComparisonListItem
              name="Method"
              leftData={
                rangeList.method_range[selectedRecipeLeft?.method[0]]
                  ?.label
              }
              rightData={
                rangeList.method_range[selectedRecipeRight?.method[0]]
                  ?.label
              }
            />
            <RecipeComparisonListItem
              name="Grinder"
              leftData={
                rangeList.grinder_range[selectedRecipeLeft?.grinder[0]]
                  ?.label
              }
              rightData={
                rangeList.grinder_range[selectedRecipeRight?.grinder[0]]
                  ?.label
              }
            />
            <RecipeComparisonListItem
              name="Grind Size"
              leftData={selectedRecipeLeft?.grind_size}
              rightData={selectedRecipeRight?.grind_size}
            />
            <RecipeComparisonListItem
              name="Grounds Weight"
              leftData={selectedRecipeLeft?.grounds_weight}
              rightData={selectedRecipeRight?.grounds_weight}
            />
            <RecipeComparisonListItem
              name="Water"
              leftData={
                rangeList.water_range[selectedRecipeLeft?.water[0]]
                  ?.label
              }
              rightData={
                rangeList.water_range[selectedRecipeRight?.water[0]]
                  ?.label
              }
            />
            <RecipeComparisonListItem
              name="Water Weight"
              leftData={selectedRecipeLeft?.water_weight}
              rightData={selectedRecipeRight?.water_weight}
            />
            <RecipeComparisonListItem
              name="Water Temperature"
              leftData={selectedRecipeLeft?.water_temp}
              rightData={selectedRecipeRight?.water_temp}
            />
            <RecipeComparisonListItem
              name="Yield Weight"
              leftData={selectedRecipeLeft?.yield_weight}
              rightData={selectedRecipeRight?.yield_weight}
            />
            <RecipeComparisonListItem
              name="TDS"
              leftData={selectedRecipeLeft?.tds}
              rightData={selectedRecipeRight?.tds}
            />
            <RecipeComparisonListItem
              name="Extraction Time"
              leftData={convertIntervalObjToString(
                selectedRecipeLeft?.extraction_time
              )}
              rightData={convertIntervalObjToString(
                selectedRecipeRight?.extraction_time
              )}
            />
            <RecipeComparisonListItem
              name="Memo"
              leftData={selectedRecipeLeft?.memo}
              rightData={selectedRecipeRight?.memo}
            />
          </div>
          <div className="flex justify-around">
            <BlueButton
              text="Edit Recipe on Left"
              onClick={() => openEditRecipeModalOfSide("left")}
            />
            <BlueButton
              text="Edit Recipe on Right"
              onClick={() => openEditRecipeModalOfSide("right")}
            />
          </div>
        </div>
      ) : null}

      {modal.mode === modalModeSelection.editRecipe &&
      modal.isOpen &&
      recipeToEdit ? (
        <AddEditRecipeModal recipeId={recipeToEdit.recipe_id} />
      ) : null}
    </>
  );
}

export default RecipesInfoComparisonSection