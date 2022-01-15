import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { BookOpenIcon, ChevronDownIcon, ChevronUpIcon, CogIcon, FilterIcon, HomeIcon } from '@heroicons/react/outline'
import { Collapse } from 'react-bootstrap'
import imgBeans from '../../images/beans.png'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AccountContext } from '../../context/Account'

const Nav = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openProcess, setOpenProcess] = useState(false);
  const [openOrigin, setOpenOrigin] = useState(false);
  const [openSettingCoffeeBeans, setOpenSettingCoffeeBeans] = useState(false);
  const [openSettingRecipes, setOpenSettingRecipes] = useState(false);

  const { userData, setAuthenticated, signout } = useContext(AccountContext);

  const logout = () => {
    signout();
    setAuthenticated(false);
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
            <span>{userData.nickname}</span>
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
                <span className="ml-4">My Account</span>
              </NavLink>
            </li>
            <li className="h-10 mx-3 pl-9 flex items-center">
              <button className="flex items-center tracking-widest transition-opacity duration-300 ease-out opacity-70 hover:opacity-100" type="button" onClick={logout}>
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
          Customize
      </h3>
      <ul>
        <li className="ml-6 mr-4">
          <div className="
            h-10 flex items-center justify-between font-bold
            transition-opacity duration-300
            ease-out opacity-70 hover:opacity-100
            cursor-pointer"
            onClick={() => setOpenSettingCoffeeBeans(!openSettingCoffeeBeans)}
            aria-controls="origin-content"
            aria-expanded={openSettingCoffeeBeans}
          >
            <div className="flex items-center">
              <CogIcon className="h-4 w-4"></CogIcon>
              <span className="ml-4">Coffee Beans</span>
            </div>

            { openSettingCoffeeBeans === true ? (
              <ChevronUpIcon className="h-4 w-4"></ChevronUpIcon>
            ) :
              <ChevronDownIcon className="h-4 w-4"></ChevronDownIcon>
            }
          </div>
          <Collapse in={openSettingCoffeeBeans}>
            <div id="origin-content">
              <ul>
                <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                  <NavLink exact="true" to="settings/origin"
                    className={({ isActive }) => "flex items-center" 
                    + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                  >
                    <span>Origin</span>
                  </NavLink>
                </li>
                <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                  <NavLink exact="true" to="settings/farm"
                    className={({ isActive }) => "flex items-center" 
                    + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                  >
                    <span>Farm</span>
                  </NavLink>
                </li>
                <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                  <NavLink exact="true" to="settings/variety"
                    className={({ isActive }) => "flex items-center" 
                    + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                  >
                    <span>Variety</span>
                  </NavLink>
                </li>
                <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                  <NavLink exact="true" to="settings/process"
                    className={({ isActive }) => "flex items-center" 
                    + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                  >
                    <span>process</span>
                  </NavLink>
                </li>
                <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                  <NavLink exact="true" to="settings/roaster"
                    className={({ isActive }) => "flex items-center" 
                    + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                  >
                    <span>roaster</span>
                  </NavLink>
                </li>
                <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                  <NavLink exact="true" to="settings/aroma"
                    className={({ isActive }) => "flex items-center" 
                    + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                  >
                    <span>aroma</span>
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
            onClick={() => setOpenSettingRecipes(!openSettingRecipes)}
            aria-controls="origin-content"
            aria-expanded={openSettingRecipes}
          >
            <div className="flex items-center">
              <CogIcon className="h-4 w-4"></CogIcon>
              <span className="ml-4">Recipes</span>
            </div>

            { openSettingRecipes === true ? (
              <ChevronUpIcon className="h-4 w-4"></ChevronUpIcon>
            ) :
              <ChevronDownIcon className="h-4 w-4"></ChevronDownIcon>
            }
          </div>
          <Collapse in={openSettingRecipes}>
            <div id="origin-content">
              <ul>
                <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                  <NavLink exact="true" to="settings/grinder"
                    className={({ isActive }) => "flex items-center" 
                    + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                  >
                    <span>grinder</span>
                  </NavLink>
                </li>
                <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                  <NavLink exact="true" to="settings/method"
                    className={({ isActive }) => "flex items-center" 
                    + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                  >
                    <span>method</span>
                  </NavLink>
                </li>
                <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                  <NavLink exact="true" to="settings/water"
                    className={({ isActive }) => "flex items-center" 
                    + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                  >
                    <span>water</span>
                  </NavLink>
                </li>
                <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                  <NavLink exact="true" to="settings/palate"
                    className={({ isActive }) => "flex items-center" 
                    + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                  >
                    <span>palate</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>

      </ul>
    </div>

  </nav>
  )
}

export default Nav
