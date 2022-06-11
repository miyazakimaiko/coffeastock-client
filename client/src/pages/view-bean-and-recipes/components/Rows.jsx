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
  const deleteRecipe = useDeleteRecipe(userData.sub, beanId);
  const {modal, setModal, mode} = useContext(ModalStateContext);
  const [recipe, setRecipe] = useState({})

  const onEditClick = (item) => {
    setRecipe(item);
    setModal({ mode: mode.editRecipe, isOpen: true });
  }


  const onDeleteClick = (item) => {
    setRecipe(item);
    setModal({ mode: mode.deleteRecipe, isOpen: true });
  }


  const onDeleteSubmit = async (event) => {
    event.preventDefault();
    deleteRecipe.mutate(recipe)
    setModal({mode: '', isOpen: false})
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

      {modal.mode === mode.editRecipe && modal.isOpen ? (
        <AddEditRecipeModal
          setModal={setModal}
          targetRecipe={recipe}
          mode="edit"
        />
      ) : null}

      {modal.mode === mode.deleteRecipe && modal.isOpen ? (
        <DeleteModal
          label={`Recipe ID: ${recipe.recipe_id}`}
          onCloseClick={() => setModal({ mode: "", isOpen: false })}
          onDeleteSubmit={onDeleteSubmit}
        />
      ) : null}
    </>
  )
}

export default Rows