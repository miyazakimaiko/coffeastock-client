import { MenuAlt2Icon, PlusSmIcon, XIcon } from '@heroicons/react/outline'
import { NavLink } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { toast } from 'react-toastify'
import { NavStateContext } from '../../context/NavState';
import './Header.scss'
import { AccountContext } from '../../context/Account';
import imgBeans from '../../images/beans.png'
import AddBeanModal from './AddBeanModal';
import AddRecipeModal from './AddRecipeModal';


const Header = (props) => {
  const { openNav, setMainRef, setNavRef, setPushPinRef, showNavbar, forceUnpin } = useContext(NavStateContext);
  const { setAuthenticated, signout } = useContext(AccountContext);

  useEffect(() => {
    setMainRef(props.mainRef.current);
    setNavRef(props.navRef.current);
    setPushPinRef(props.pushpinRef.current);
  }, [props.navRef])

  const logout = () => {
    forceUnpin();
    signout();
    setAuthenticated(false);
    toast.success("Logged out successfully.", {
      position: toast.POSITION.BOTTOM_CENTER
    })
  }

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
    <div className="header h-16 w-full mb-4 px-4 items-center header-border">
      <div className="flex">
        <div className="flex items-center" onClick={showNavbar}>
          {openNav ? <XIcon className="h-8 w-8" /> : <MenuAlt2Icon className="h-8 w-8"/>}
        </div>
        <button
          onClick={() => innerSetOpenAddBeanModal(true)}
          type="button"
          className="flex items-center bg-orange text-white font-capitals uppercase font-bold text-xs tracking-widest rounded-3xl px-3 py-2 ml-4 mr-0"
        >
          <PlusSmIcon
            className="h-4 w-4 mr-2" 
          />
          Coffee Bean
        </button>
        <button
          onClick={() => innerSetOpenAddRecipeModal(true)}
          type="button"
          className="flex items-center bg-yellow text-white font-capitals uppercase font-bold text-xs tracking-widest rounded-3xl px-3 py-2 ml-4 mr-0"
        >
          <PlusSmIcon 
            className="h-4 w-4 mr-2" 
          />
          Recipe
        </button>
      </div>
      <div>
        <a href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <div className="h-9 w-9 rounded-3xl border-2 border-burnt-sienna flex-shrink-0">
            <img src={imgBeans} className="h-full w-full"/>
          </div>
        </a>
        <div class="dropdown-menu dropdown-menu-end border-none shadow-md animate slideIn" aria-labelledby="navbarDropdown">
          <NavLink exact="true" to="/my-profile" className="dropdown-item">My Account</NavLink>
          <div class="dropdown-divider"></div>
          <button type="button" class="dropdown-item" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
    {openAddBeanModal ?  <AddBeanModal setOpenThisModal={setOpenAddBeanModal} /> : null}
    {openAddRecipeModal ?  <AddRecipeModal setOpenThisModal={setOpenAddRecipeModal} /> : null}
    </>
    )
}

export default Header

