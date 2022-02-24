import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { ChevronDownIcon, MenuAlt2Icon, PlusIcon, PlusSmIcon, XIcon } from '@heroicons/react/outline'

import { NavStateContext } from '../../context/NavState';
import { AccountContext } from '../../context/Account';
import imgFace from '../../images/face.jpg'
import AddBeanModal from '../Modals/AddBeanModal';
import AddRecipeModal from '../Modals/AddRecipeModal';
import './Header.scss'

const Header = (props) => {
  const { 
    openNav, 
    setMainRef, 
    setNavRef, 
    setPushPinRef, 
    showNavbar, 
    forceUnpin 
  } = useContext(NavStateContext);

  const { 
    userData,
    setAuthenticated, 
    signout 
  } = useContext(AccountContext);

  const [
    openAddBeanModal, 
    innerSetOpenAddBeanModal
  ] = useState(false);

  const setOpenAddBeanModal = boolean => 
    innerSetOpenAddBeanModal(boolean);

  const [
    openAddRecipeModal, 
    innerSetOpenAddRecipeModal
  ] = useState(false)

  const setOpenAddRecipeModal = boolean => 
    innerSetOpenAddRecipeModal(boolean);

  const logout = () => {
    forceUnpin();
    signout();
    setAuthenticated(false);
    toast.success(
      "Logged out successfully.", 
      { position: toast.POSITION.BOTTOM_CENTER }
    )
  }

  useEffect(() => {
    setMainRef(props.mainRef.current);
    setNavRef(props.navRef.current);
    setPushPinRef(props.pushpinRef.current);
  }, [props.navRef])

  return (
    <>
    <div className="header h-16 w-full px-4 items-center header-border">
      <div className="flex">
        <div className="flex items-center cursor-pointer" onClick={showNavbar}>
          {openNav ? <XIcon className="h-8 w-8 opacity-80 hover:opacity-100 ease-linear transition-all duration-150" /> 
          : <MenuAlt2Icon className="h-8 w-8 opacity-80 hover:opacity-100 ease-linear transition-all duration-150"/>}
        </div>

        <button type="button"
          onClick={() => innerSetOpenAddBeanModal(true)}
          className="flex items-center text-burnt-sienna 
          font-capitals uppercase text-sm tracking-widest px-3 py-2 ml-4 mr-0 
          opacity-80 hover:opacity-100 ease-linear transition-all duration-150">
          <PlusIcon className="h-4 w-4 mr-2" />
          Coffee Bean
        </button>

        <button type="button"
          onClick={() => innerSetOpenAddRecipeModal(true)}
          className="flex items-center text-burnt-sienna 
          font-capitals uppercase text-sm tracking-widest px-3 py-2 ml-4 mr-0 
          opacity-80 hover:opacity-100 ease-linear transition-all duration-150">
          <PlusIcon className="h-4 w-4 mr-2" />
          Recipe
        </button>
      </div>

      <div>
        <div className="flex items-center">
          <div className="h-9 w-9 flex-shrink-0">
            <img src={imgFace} className="h-full w-full rounded-3xl"/>
          </div>
          <div className="mx-3">
            <a
              className="flex items-center tracking-widest" 
              href="#" 
              id="navbarDropdown" 
              role="button" 
              data-bs-toggle="dropdown" 
              aria-haspopup="true" 
              aria-expanded="false">
              {userData.nickname}
              <ChevronDownIcon className="h-4 w-4 ml-2"/>
            </a>
            <div className="dropdown-menu dropdown-menu-end border-none shadow-md animate slideIn" aria-labelledby="navbarDropdown">
              <NavLink exact="true" to="/my-profile" className="dropdown-item">My Account</NavLink>
              <div className="dropdown-divider"></div>
              <button type="button" className="dropdown-item" onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="w-hull border-b border-burnt-sienna border-opacity-20 "></div>

    {openAddBeanModal ?  <AddBeanModal setOpenThisModal={setOpenAddBeanModal} /> : null}
    {openAddRecipeModal ?  <AddRecipeModal setOpenThisModal={setOpenAddRecipeModal} /> : null}
    
    </>
    )
}

export default Header

