import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { BookOpenIcon, ChevronDownIcon, ChevronUpIcon, CogIcon, FilterIcon, HomeIcon, PlusCircleIcon } from '@heroicons/react/outline'
import { Collapse } from 'react-bootstrap'
import imgBeans from '../../images/beans.png'
import { toast } from 'react-toastify'


function Nav({setAuth}) {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openProcess, setOpenProcess] = useState(false);
  const [openOrigin, setOpenOrigin] = useState(false);

  const [name, setName] = useState('');

  const getName = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/user",
        {
          method: "GET",
          headers: {"token": localStorage.token}
        }
      );
      const parseRes = await response.json();
      console.log(parseRes.username)
      setName(parseRes.username)

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getName();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully.")
  }

  return (
  <nav 
  className="
      w-64 fixed top-0 bottom-0 overflow-auto
      bg-burnt-sienna 
      border-r
      text-white"
  >
    <div 
    className="
      border-b border-creme border-opacity-20 h-20 flex 
      justify-center items-center"
    >
      <h1 className="uppercase text-lg font-capitals">Coffee Journal</h1>
    </div>

    <div className="border-b border-creme border-opacity-20 flex flex-column tracking-widest text-sm py-3">
      <div className="
        my-2 mx-3 flex items-center justify-between
        transition-opacity duration-300
        ease-out opacity-70 hover:opacity-100
        cursor-pointer"
        onClick={() => setOpenUserMenu(!openUserMenu)}
        aria-controls="origin-content"
        aria-expanded={openUserMenu}
      >
        <div className="flex items-center">
          <div className="h-9 w-9 rounded-3xl border-1 flex-shrink-0">
            <img src={imgBeans} className="h-full w-full"/>
          </div>
          <div className="ml-4">
            <span>{name}</span>
          </div>
        </div>

        { openUserMenu === true ? (
          <ChevronUpIcon className="h-4 w-4"></ChevronUpIcon>
        ) :
          <ChevronDownIcon className="h-4 w-4"></ChevronDownIcon>
        }
      </div>
      <Collapse in={openUserMenu}>
        <div id="origin-content">
          <ul>
            <li className="h-10 mx-3 pl-9 flex items-center justify-between">
              <NavLink exact="true" to="/my-profile"
                className={({ isActive }) => "flex items-center" 
                + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
              >
                <span className="ml-4">My Profile</span>
              </NavLink>
            </li>
            <li className="h-10 mx-3 pl-9 flex items-center justify-between">
              <NavLink exact="true" to="/my-profile/edit"
                className={({ isActive }) => "flex items-center" 
                + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
              >
                <span className="ml-4">Edit My Profile</span>
              </NavLink>
            </li>
            <li className="h-10 mx-3 pl-9 flex items-center">
              <button className="flex items-center tracking-widest transition-opacity duration-300 ease-out opacity-70 hover:opacity-100" type="button" onClick={(e) => logout(e)}>
                <span className="ml-4">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </Collapse>
    </div>

    <div className="my-8 text-xs tracking-widest font-capitals uppercase">
      <h3 className="mx-6 my-2 opacity-50">
        Main
      </h3>
      <ul>
        <li className="h-10 mx-6 flex items-center justify-between font-bold">
          <NavLink to="/"
            className={({ isActive }) => "flex items-center" 
              + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
          >
            <HomeIcon className="h-4 w-4"></HomeIcon>
            <span className="ml-4">Dashboard</span>
          </NavLink>
        </li>

        <li className="h-10 mx-6 flex items-center justify-between font-bold">
          <NavLink exact="true" to="coffees"
            className={({ isActive }) => "flex items-center" 
            + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
          >
            <BookOpenIcon className="h-4 w-4"></BookOpenIcon>
            <span className="ml-4">my coffees</span>
          </NavLink>
        </li>
      </ul>
    </div>

    <div className="my-8 text-xs tracking-widest font-capitals uppercase">
      <h3 className="mx-6 my-2 opacity-50">
        Create New
      </h3>
      <ul>
        <li className="h-10 mx-6 flex items-center justify-between font-bold">
          <NavLink exact="true" to="create/bean"
            className={({ isActive }) => "flex items-center" 
            + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
          >
            <PlusCircleIcon className="h-4 w-4"></PlusCircleIcon>
            <span className="ml-4">Coffee Bean</span>
          </NavLink>
        </li>

        <li className="h-10 mx-6 flex items-center justify-between font-bold">
          <NavLink exact="true" to="create/recipe"
            className={({ isActive }) => "flex items-center" 
            + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
          >
            <PlusCircleIcon className="h-4 w-4"></PlusCircleIcon>
            <span className="ml-4">Recipe</span>
          </NavLink>
        </li>
      </ul>
    </div>

    <div className="my-8 text-xs tracking-widest font-capitals uppercase">
      <h3 className="mx-6 my-2 opacity-50">
          Filter by
      </h3>
      <ul>
        <li className="ml-6 mr-4">
          <div className="
            h-10 flex items-center justify-between font-bold
            transition-opacity duration-300
            ease-out opacity-70 hover:opacity-100
            cursor-pointer"
            onClick={() => setOpenOrigin(!openOrigin)}
            aria-controls="origin-content"
            aria-expanded={openOrigin}
          >
            <div className="flex items-center">
              <FilterIcon className="h-4 w-4"></FilterIcon>
              <span className="ml-4">Origin</span>
            </div>

            { openOrigin === true ? (
              <ChevronUpIcon className="h-4 w-4"></ChevronUpIcon>
            ) :
              <ChevronDownIcon className="h-4 w-4"></ChevronDownIcon>
            }
          </div>
          <Collapse in={openOrigin}>
            <div id="origin-content">
              <ul>
                <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                  <NavLink exact="true" to="ethiopia/1"
                    className={({ isActive }) => "flex items-center" 
                    + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                  >
                    <span>Ethiopia</span>
                  </NavLink>
                </li>
                <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                  <NavLink exact="true" to="colombia/1"
                    className={({ isActive }) => "flex items-center" 
                    + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                  >
                    <span>Colombia</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>

        <li className="ml-6 mr-4">
          <div className="
            h-10 flex items-center justify-between font-bold
            transition-opacity duration-300
            ease-out opacity-70 hover:opacity-100
            cursor-pointer"
            onClick={() => setOpenProcess(!openProcess)}
            aria-controls="process-content"
            aria-expanded={openProcess}
          >
            <div className="flex items-center">
              <FilterIcon className="h-4 w-4"></FilterIcon>
              <span className="ml-4">Process</span>
            </div>

            { openProcess === true ? (
              <ChevronUpIcon className="h-4 w-4"></ChevronUpIcon>
            ) :
              <ChevronDownIcon className="h-4 w-4"></ChevronDownIcon>
            }
          </div>
          <Collapse in={openProcess}>
            <div id="process-content">
              Test
            </div>
          </Collapse>
        </li>
      </ul>
    </div>

    <div className="my-8 text-xs tracking-widest font-capitals uppercase">
      <h3 className="mx-6 my-2  opacity-50">
          Settings
      </h3>
      <ul>
        <li className="h-10 mx-6 flex items-center justify-between font-bold">
          <NavLink exact="true" to="settings/bean"             
            className={({ isActive }) => "flex items-center" 
            + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
          >
            <CogIcon className="h-4 w-4"></CogIcon>
            <span className="ml-4">Coffee Bean</span>
          </NavLink>
        </li>

        <li className="h-10 mx-6 flex items-center justify-between font-bold">
          <NavLink exact="true" to="settings/recipe"
            className={({ isActive }) => "flex items-center" 
            + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
          >
            <CogIcon className="h-4 w-4"></CogIcon>
            <span className="ml-4">Recipe</span>
          </NavLink>
        </li>
      </ul>
    </div>

  </nav>
  )
}

export default Nav
