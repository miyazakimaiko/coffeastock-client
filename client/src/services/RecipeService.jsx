import { useContext, useEffect, useState } from 'react'
import { ModalStateContext } from '../context/ModalStateContext';
import useAddRecipe from '../hooks/useAddRecipe';
import useEditRecipe from '../hooks/useEditRecipe';

const RecipeService = () => {
  const addRecipe = useAddRecipe();
  const editRecipe = useEditRecipe();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { modal, closeModal, modalModeSelection } = useContext(ModalStateContext);

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

  const [processAddSubmit, setProcessAddSubmit] = useState(false);
  const [processEditSubmit, setProcessEditSubmit] = useState(false);

  useEffect(() => {
    if (processAddSubmit && recipe.bean_id !== null) {
      addRecipe.mutate(recipe, {
        onSuccess: () => {
          closeModal();
        },
      });
      setProcessAddSubmit(false);
    }
  }, [processAddSubmit]);

  useEffect(() => {
    if (processEditSubmit && recipe.bean_id !== null) {
      editRecipe.mutate(recipe, {
        onSuccess: () => {
          closeModal();
        },
      });
      setProcessEditSubmit(false);
    }
  }, [processEditSubmit]);

  useEffect(() => {
    if (editRecipe.isLoading || addRecipe.isLoading) {
      setIsSubmitting(true);
    }
    else {
      setIsSubmitting(false);
    }
  }, [editRecipe.isLoading, addRecipe.isLoading])
  

  const onSubmit = () => {
    if (modal.mode === modalModeSelection.addRecipe) {
      setProcessAddSubmit(true);
    }
    else if (modal.mode === modalModeSelection.editRecipe) {
      setProcessEditSubmit(true);
    }
  }

  return [recipe, setRecipe, onSubmit, isSubmitting]
}

export default RecipeService