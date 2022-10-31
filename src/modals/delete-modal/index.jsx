import React, { useContext } from 'react'
import { ModalStateContext } from '../../context/ModalStateContext'
import ModalWrapperContainer from '../../elements/ModalWrapperContainer';

const DeleteModal = ({label, onDeleteSubmit}) => {
  const { modal, modalModeSelection, closeModal } = useContext(ModalStateContext);

  // can add all delete functionality here for Bean, Recipe, and Range by using modal.mode

  return (
    <ModalWrapperContainer
      onCloseClick={closeModal}
      title={
        modal.mode === modalModeSelection.deleteRange ? 'Delete Range' :
        modal.mode === modalModeSelection.deleteBean ? 'Delete Bean' :
        modal.mode === modalModeSelection.deleteRecipe ? 'Delete Recipe' : null
      }
    >
      {/*body*/}
      <div className="card-content px-3 py-10">
        <p className='text-center'>
          Are you sure to delete the entry <strong>{label}</strong> ?
        </p>
      </div>
      <div className="flex items-center justify-between px-8 pb-8">
        <button
          className="text-red-500 background-transparent 
            px-6 py-2  outline-none 
          focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="bg-red text-white opacity-80 
                     hover:opacity-100    
                     px-6 py-2 rounded-3xl ease-linear transition-all duration-150"
          type="submit"
          onClick={onDeleteSubmit}
        >
          Yes, Delete
        </button>
      </div>
    </ModalWrapperContainer>
  )
}

export default DeleteModal