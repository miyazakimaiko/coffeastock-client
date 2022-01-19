import React, { useState } from 'react'
import { createContext } from 'react'

export const NavStateContext = createContext();

const NavState = (props) => {
  const [openNav, innerSetOpenNav] = useState(false);
  const setOpenNav = boolean => {
    innerSetOpenNav(boolean);
  }

  const [mainRef, innerSetMainRef] = useState(null);
  const setMainRef = (elem) => {
    innerSetMainRef(elem);
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
    mainRef.classList.toggle('main-pd');
    navRef.classList.toggle('nav-show');
    // change icon
    if (navRef.classList.contains('nav-show')) {
      innerSetOpenNav(true);
    } else innerSetOpenNav(false);
  }

  const [pinnedNavbar, innerSetPinnedNavbar] = useState(false);
  const setPinnedNavbar = () => {
    innerSetPinnedNavbar(!pinnedNavbar)
    pushPinRef.classList.toggle('pinned');
  }

  const forceUnpin = () => {
    innerSetPinnedNavbar(false);
    pushPinRef.classList.remove('pinned');
  }

  return (
    <NavStateContext.Provider value={
      {openNav, setOpenNav, mainRef, setMainRef, navRef, setNavRef, setPushPinRef, showNavbar, pinnedNavbar, setPinnedNavbar, forceUnpin}
      }>
      {props.children}
    </NavStateContext.Provider>
  )
}

export default NavState
