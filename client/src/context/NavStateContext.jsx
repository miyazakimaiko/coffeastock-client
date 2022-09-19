import React, { useState } from 'react'
import { createContext } from 'react'

export const NavStateContext = createContext();

const NavStateProvider = (props) => {
  const [openNav, innerSetOpenNav] = useState(false);
  const setOpenNav = boolean => {
    innerSetOpenNav(boolean);
  }

  const [mainRef, innerSetMainRef] = useState(null);
  const setMainRef = (elem) => {
    innerSetMainRef(elem);
  }

const [headerRef, innerSetHeaderRef] = useState(null);
  const setHeaderRef = (elem) => {
    innerSetHeaderRef(elem);
  }

  const [navRef, innerSetNavRef] = useState(null);
  const setNavRef = (elem) => {
    innerSetNavRef(elem);
  }

  const [pushPinRef, innerSetPushPinRef] = useState(null);
  const setPushPinRef = (elem) => {
    innerSetPushPinRef(elem);
  }

  const showNavbar = () => {
    if (pinnedNavbar) {
      forceUnpin();
    }
    else {
      mainRef.classList.toggle('main-pd');
      headerRef.classList.toggle('header-pd');
      navRef.classList.toggle('nav-show');
      innerSetOpenNav(!openNav);
    }
  }

  const forceUnpin = () => {
    innerSetPinnedNavbar(false);
    pushPinRef.classList.remove('pinned');
    mainRef.classList.remove('main-pd');
    headerRef.classList.remove('header-pd');
    navRef.classList.remove('nav-show');
    innerSetOpenNav(false);
  }

  const [pinnedNavbar, innerSetPinnedNavbar] = useState(false);
  const setPinnedNavbar = () => {
    innerSetPinnedNavbar(!pinnedNavbar)
    pushPinRef.classList.toggle('pinned');
  }

  return (
    <NavStateContext.Provider value={
      { 
        openNav, 
        setOpenNav, 
        mainRef, 
        setMainRef, 
        headerRef, 
        setHeaderRef, 
        navRef, 
        setNavRef, 
        setPushPinRef, 
        showNavbar, 
        pinnedNavbar, 
        setPinnedNavbar, 
        forceUnpin
      }
      }>
      {props.children}
    </NavStateContext.Provider>
  )
}

export default NavStateProvider
