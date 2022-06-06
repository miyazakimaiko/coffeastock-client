import { createContext, useState } from "react";

export const ModalStateContext = createContext();

const ModalStateProvider = (props) => {

  const [modal, setModal] = useState({
    mode: '',
    isOpen: false,
  });

  const mode = {
    addRange: 'addRange',
    editRange: 'editRange',
    deleteRange: 'deleteRange',
  
    addBean: 'addBean',
    editBean: 'editBean',
    deleteBean: 'deleteBean',
  
    addRecipe: 'addRecipe',
    editRecipe: 'editRecipe',
    deleteRecipe: 'deleteRecipe',
  }

  return (
    <ModalStateContext.Provider
      value={
        {modal, setModal, mode}
      }
    >
      {props.children}
    </ModalStateContext.Provider>
  )
}

export default ModalStateProvider;