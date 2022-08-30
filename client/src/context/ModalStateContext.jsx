import { createContext, useState } from "react";

export const ModalStateContext = createContext();

const ModalStateProvider = (props) => {

  const [modal, setModal] = useState({
    mode: '',
    isOpen: false,
  });

  const modalModeSelection = {
    addRange: 'addRange',
    editRange: 'editRange',
    deleteRange: 'deleteRange',
  
    addBean: 'addBean',
    editBean: 'editBean',
    deleteBean: 'deleteBean',
  
    addRecipe: 'addRecipe',
    editRecipe: 'editRecipe',
    deleteRecipe: 'deleteRecipe',

    changeNickname: 'changeNickname',
    changePassword: 'changePassword',
  }

  function openAddRangeModal() {
    setModal({ mode: modalModeSelection.addRange, isOpen: true });
  }

  function openEditRangeModal() {
    setModal({ mode: modalModeSelection.editRange, isOpen: true });
  }

  function openDeleteRangeModal() {
    setModal({ mode: modalModeSelection.deleteRange, isOpen: true });
  }

  function openAddBeanModal() {
    setModal({ mode: modalModeSelection.addBean, isOpen: true });
  }

  function openEditBeanModal() {
    setModal({ mode: modalModeSelection.editBean, isOpen: true });
  }

  function openDeleteBeanModal() {
    setModal({ mode: modalModeSelection.deleteBean, isOpen: true });
  }

  function openAddRecipeModal() {
    setModal({ mode: modalModeSelection.addRecipe, isOpen: true });
  }

  function openEditRecipeModal() {
    setModal({ mode: modalModeSelection.editRecipe, isOpen: true });
  }

  function openDeleteRecipeModal() {
    setModal({ mode: modalModeSelection.deleteRecipe, isOpen: true });
  }

  function openChangeNicknameModal() {
    setModal({ mode: modalModeSelection.changeNickname, isOpen: true });
  }

  function openChangePasswordModal() {
    setModal({ mode: modalModeSelection.changePassword, isOpen: true });
  }

  function closeModal() {
    setModal({ mode: "", isOpen: false });
  }

  return (
    <ModalStateContext.Provider
      value={
        {
          modal, 
          openAddRangeModal,
          openEditRangeModal,
          openDeleteRangeModal,
          openAddBeanModal,
          openEditBeanModal,
          openDeleteBeanModal,
          openAddRecipeModal,
          openEditRecipeModal,
          openDeleteRecipeModal,
          openChangeNicknameModal,
          openChangePasswordModal,
          closeModal,
          modalModeSelection,
        }
      }
    >
      {props.children}
    </ModalStateContext.Provider>
  )
}

export default ModalStateProvider;