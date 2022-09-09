import React, { useEffect } from 'react';
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MenuAlt2Icon, PlusIcon, XIcon } from '@heroicons/react/outline'
import toastOnTopRight from '../../utils/customToast';
import { NavStateContext } from '../../context/NavStateContext';
import { useUserData, 
        useSetAuthenticated, 
        useSignout } from '../../context/AccountContext';
import AddEditBeanModal from '../../modals/add-edit-bean-modal';
import AddRecipeModal from '../../modals/add-edit-recipe-modal';
import Dropdown from '../../elements/Dropdown';
import { ModalStateContext } from '../../context/ModalStateContext';
import './header.scss'


const Header = (props) => {
  const { 
    openNav, 
    setMainRef, 
    setNavRef, 
    setPushPinRef, 
    showNavbar, 
    forceUnpin } = useContext(NavStateContext);
 
  const userData = useUserData()
  const setAuthenticated = useSetAuthenticated()
  const signout = useSignout()
  const navigate = useNavigate()

  const {
    modal, 
    openAddBeanModal, 
    openAddRecipeModal, 
    modalModeSelection } = useContext(ModalStateContext);

  const logout = () => {
    forceUnpin();
    signout();
    toastOnTopRight('success', 'Logged out successfully.')
  }

  useEffect(() => {
    setMainRef(props.mainRef.current);
    setNavRef(props.navRef.current);
    setPushPinRef(props.pushpinRef.current);
  }, [props.navRef])

  return (
    <>
    <div className={`header z-20 w-full pr-4 items-center border-b border-burnt-sienna border-opacity-20 ${openNav ? 'header-pd' : 'pl-4'}`}>
      <div className="flex">
        <div className="flex items-center cursor-pointer" onClick={showNavbar}>
          {openNav ? <XIcon className="h-8 w-8 opacity-80 hover:opacity-100 ease-linear transition-all duration-150" /> 
          : <MenuAlt2Icon className="h-8 w-8 opacity-80 hover:opacity-100 ease-linear transition-all duration-150"/>}
        </div>
        <div className="button-section">
          <button type="button"
            onClick={openAddBeanModal}
            className="flex items-center text-burnt-sienna  px-3 py-2 ml-4 mr-0 
            opacity-80 hover:opacity-100 ease-linear transition-all duration-150">
            <PlusIcon className="h-4 w-4 mr-2" />
            Coffee Bean
          </button>

          <button type="button"
            onClick={openAddRecipeModal}
            className="flex items-center text-burnt-sienna 
             px-3 py-2 ml-4 mr-0 
            opacity-80 hover:opacity-100 ease-linear transition-all duration-150">
            <PlusIcon className="h-4 w-4 mr-2" />
            Recipe
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center">
          <div className="mx-3">
            <Dropdown dropdownText={userData.nickname}>
              <div className="dropdown-content" >
                <NavLink exact="true" to="/account" className="dropdown-item">My Account</NavLink>
                <div className="dropdown-divider"></div>
                <button type="button" className="dropdown-item" onClick={logout}>Logout</button>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
    <div className="w-full border-b border-burnt-sienna border-opacity-20 "></div>

    {modal.mode === modalModeSelection.addBean && modal.isOpen ?  <AddEditBeanModal /> : null}
    {modal.mode === modalModeSelection.addRecipe && modal.isOpen ?  <AddRecipeModal /> : null}
    
    </>
    )
}

export default Header

