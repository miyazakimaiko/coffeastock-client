import { MenuAlt2Icon, XIcon } from '@heroicons/react/outline'
import { NavLink } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useContext } from 'react';
import { toast } from 'react-toastify'
import { NavStateContext } from '../../context/NavState';
import './Header.scss'
import { AccountContext } from '../../context/Account';
import imgBeans from '../../images/beans.png'


const Header = (props) => {
  const { openNav, setMainRef, setNavRef, setPushPinRef, showNavbar } = useContext(NavStateContext);
  const { setAuthenticated, signout } = useContext(AccountContext);

  useEffect(() => {
    setMainRef(props.mainRef.current);
    setNavRef(props.navRef.current);
    setPushPinRef(props.pushpinRef.current);
  }, [props.navRef])

  const logout = () => {
    signout();
    setAuthenticated(false);
    toast.success("Logged out successfully.")
  }

  return (
    <div className="header h-16 w-full mb-4 px-4 items-center header-border">
      <div className="flex">
        <div className="flex items-center" onClick={showNavbar}>
          {openNav ? <XIcon className="h-8 w-8" /> : <MenuAlt2Icon className="h-8 w-8"/>}
        </div>
        <h2 className="text-2xl ml-4">{props.title}</h2>
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
      {/* <form 
        action=""
        className="relative flex items-center text-gray-400 focus-within:text-gray-500 w-64 max-w-1/2"
      >
        <SearchIcon className="w-5 h-5 ml-3 absolute pointer-events-none"></SearchIcon>
          <input 
            type="text"
            name="search"
            placeholder="Search recipes/beans"
            autoComplete="off"
            aria-label="Search"
            className="w-full pl-10 pr-3 py-2 rounded-sm outline-none ring-1 
              ring-gray-300 focus-visible:ring-gray-400 focus-visible:ring-2"
          />
      </form> */}
    </div>
    )
}

export default Header
