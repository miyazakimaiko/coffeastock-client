import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { MenuAlt2Icon, PlusIcon, XIcon } from '@heroicons/react/outline'

import { NavStateContext } from '../../context/NavStateContext';
import { useUserData, useSetAuthenticated, useSignout } from '../../context/AccountContext';
import imgFace from '../../assets/images/face.jpg'
import AddEditBeanModal from '../add-edit-bean-modal';
import AddRecipeModal from '../add-edit-recipe-modal';
import './header.scss'
import Dropdown from '../elements/Dropdown';

const MODE = {
  BEAN: 'bean',
  RECIPE: 'recipe'
}

const Header = (props) => {
  const { 
    openNav, 
    setMainRef, 
    setNavRef, 
    setPushPinRef, 
    showNavbar, 
    forceUnpin 
  } = useContext(NavStateContext);
 
  const userData = useUserData()
  const setAuthenticated = useSetAuthenticated()
  const signout = useSignout()

  const [modal, setModal] = useState({mode: '', isOpen: false})

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
        <div className="button-section">
          <button type="button"
            onClick={() => setModal({mode: 'bean', isOpen: true})}
            className="flex items-center text-burnt-sienna  px-3 py-2 ml-4 mr-0 
            opacity-80 hover:opacity-100 ease-linear transition-all duration-150">
            <PlusIcon className="h-4 w-4 mr-2" />
            Coffee Bean
          </button>

          <button type="button"
            onClick={() => setModal({mode: 'recipe', isOpen: true})}
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
                <NavLink exact="true" to="/my-profile" className="dropdown-item">My Account</NavLink>
                <div className="dropdown-divider"></div>
                <button type="button" className="dropdown-item" onClick={logout}>Logout</button>
              </div>
            </Dropdown>
          </div>
          <div className="h-9 w-9 flex-shrink-0">
            <img src={imgFace} className="h-full w-full rounded-3xl"/>
          </div>
        </div>
      </div>
    </div>
    <div className="w-hull border-b border-burnt-sienna border-opacity-20 "></div>

    {modal.mode === MODE.BEAN && modal.isOpen ?  <AddEditBeanModal setModal={setModal} /> : null}
    {modal.mode === MODE.RECIPE && modal.isOpen ?  <AddRecipeModal setOpenThisModal={setModal} /> : null}
    
    </>
    )
}

export default Header

