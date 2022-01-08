import { PlusIcon, PlusSmIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import AddBeanModal from './AddBeanModal'
import AddRecipeModal from './AddRecipeModal'

const FloatingMenu = () => {
  const [open, setOpen] = useState(false)

  const [openAddBeanModal, innerSetOpenAddBeanModal] = useState(false)
  const setOpenAddBeanModal = boolean => {
    innerSetOpenAddBeanModal(boolean);
  }

  const [openAddRecipeModal, innerSetOpenAddRecipeModal] = useState(false)
  const setOpenAddRecipeModal = boolean => {
    innerSetOpenAddRecipeModal(boolean);
  }

  return (
    <>
    <div className="z-20 fixed bottom-6 right-6">
      <Collapse in={open}>
        <div id="menu-content" className="">
          <button
            onClick={() => innerSetOpenAddBeanModal(true)}
            type="button"
            className="flex items-center shadow-md bg-orange text-white font-capitals uppercase font-bold text-xs tracking-widest rounded-3xl px-3 py-2 ml-auto mr-0 mb-3"
          >
            <PlusSmIcon
              className="h-4 w-4 mr-2" 
            />
            Coffee Bean
          </button>
          <button
            onClick={() => innerSetOpenAddRecipeModal(true)}
            type="button"
            className="flex items-center shadow-md bg-yellow text-white font-capitals uppercase font-bold text-xs tracking-widest rounded-3xl px-3 py-2 ml-auto mr-0 mb-3"
          >
            <PlusSmIcon 
              className="h-4 w-4 mr-2" 
            />
            Recipe
          </button>
        </div>
      </Collapse>
      <div className=""
        onClick={() => setOpen(!open)}
        aria-controls="menu-content"
        aria-expanded={open}
      >
        <div className="bg-green shadow-md rounded-3xl h-12 w-12 p-3 ml-auto mr-0">
          <PlusIcon className="h-full w-full text-white"></PlusIcon>
        </div>
      </div>
    </div>

    {openAddBeanModal ?  <AddBeanModal setOpenThisModal={setOpenAddBeanModal} /> : null}
    {openAddRecipeModal ?  <AddRecipeModal setOpenThisModal={setOpenAddRecipeModal} /> : null}
    </>
  )
}

export default FloatingMenu
