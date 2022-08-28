import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUserData } from '../../../context/AccountContext'
import { ModalStateContext } from '../../../context/ModalStateContext'
import useDeleteRecipe from '../../../hooks/useDeleteRecipe'
import AddEditRecipeModal from '../../../modals/add-edit-recipe-modal'
import DeleteModal from '../../../modals/delete-modal'
import Row from './Row'

const Rows = ({data}) => {
  const userData = useUserData();
  const { id: beanId } = useParams();
  const deleteRecipe = useDeleteRecipe(userData.sub, beanId, userData.accessToken.jwtToken);
  const {
    modal,
    openEditRecipeModal,
    openDeleteRecipeModal,
    closeModal,
    modalModeSelection,
  } = useContext(ModalStateContext);
  const [recipe, setRecipe] = useState({})

  
  const onEditClick = (item) => {
    setRecipe(item);
    openEditRecipeModal();
  }


  const onDeleteClick = (item) => {
    setRecipe(item);
    openDeleteRecipeModal();
  }


  const onDeleteSubmit = async (event) => {
    event.preventDefault();
    deleteRecipe.mutate(recipe)
    closeModal();
  }

  return (
    <>
      {data.map((recipe) => (
        <Row
          recipe={recipe}
          onEditClick={() => onEditClick(recipe)}
          onDeleteClick={() => onDeleteClick(recipe)}
        />
      ))}

      {modal.mode === modalModeSelection.editRecipe && modal.isOpen ? (
        <AddEditRecipeModal
          recipeId={recipe.recipe_id}
        />
      ) : null}

      {modal.mode === modalModeSelection.deleteRecipe && modal.isOpen ? (
        <DeleteModal
          label={`Recipe ID: ${recipe.recipe_id}`}
          onDeleteSubmit={onDeleteSubmit}
        />
      ) : null}
    </>
  )
}

export default Rows