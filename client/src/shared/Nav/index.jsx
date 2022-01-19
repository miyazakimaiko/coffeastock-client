import React, { useState} from 'react'
import { NavLink } from 'react-router-dom'
import { BookOpenIcon, ChevronDownIcon, ChevronUpIcon, CogIcon, FilterIcon, HomeIcon } from '@heroicons/react/outline'
import { Collapse } from 'react-bootstrap'
import { useContext } from 'react'
import { AccountContext } from '../../context/Account'
import './Nav.scss'
import { NavStateContext } from '../../context/NavState'
import PushPinIcon from '../../svgs/PushPinIcon'

const Nav = (props) => {
  const { showNavbar, pinnedNavbar, setPinnedNavbar } = useContext(NavStateContext);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openProcess, setOpenProcess] = useState(false);
  const [openOrigin, setOpenOrigin] = useState(false);
  const [openSettingCoffeeBeans, setOpenSettingCoffeeBeans] = useState(false);
  const [openSettingRecipes, setOpenSettingRecipes] = useState(false);

  const { userData } = useContext(AccountContext);


  return (
  <div id="nav-bar">
    <nav
      ref={el => { props.navRef.current = el; }}
      id="nav"
      className="l-nav fixed top-0 bottom-0 overflow-auto
        bg-burnt-sienna border-r text-white"
    >
      <div className=" border-b border-creme border-opacity-20 h-16 flex justify-between items-center px-3">
        <h1 className="uppercase text-lg font-capitals">Coffee Journal</h1>
        <button type="button" ref={el => { props.pushpinRef.current = el; }} className="h-4 w-4 pushpin hidden lg:block" onClick={setPinnedNavbar}>
          <PushPinIcon />
        </button>
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
                onClick={pinnedNavbar ? null : showNavbar}
            >
              <HomeIcon className="h-4 w-4"></HomeIcon>
              <span className="ml-4">Dashboard</span>
            </NavLink>
          </li>

          <li className="h-10 mx-6 flex items-center justify-between font-bold">
            <NavLink exact="true" to="coffees"
              className={({ isActive }) => "flex items-center" 
              + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
              onClick={pinnedNavbar ? null : showNavbar}
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
                      onClick={pinnedNavbar ? null : showNavbar}
                    >
                      <span>Origin</span>
                    </NavLink>
                  </li>
                  <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                    <NavLink exact="true" to="settings/farm"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}
                    >
                      <span>Farm</span>
                    </NavLink>
                  </li>
                  <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                    <NavLink exact="true" to="settings/variety"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}
                    >
                      <span>Variety</span>
                    </NavLink>
                  </li>
                  <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                    <NavLink exact="true" to="settings/process"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}
                    >
                      <span>process</span>
                    </NavLink>
                  </li>
                  <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                    <NavLink exact="true" to="settings/roaster"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}
                    >
                      <span>roaster</span>
                    </NavLink>
                  </li>
                  <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                    <NavLink exact="true" to="settings/aroma"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}
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
                      onClick={pinnedNavbar ? null : showNavbar}
                    >
                      <span>grinder</span>
                    </NavLink>
                  </li>
                  <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                    <NavLink exact="true" to="settings/method"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}
                    >
                      <span>method</span>
                    </NavLink>
                  </li>
                  <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                    <NavLink exact="true" to="settings/water"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}
                    >
                      <span>water</span>
                    </NavLink>
                  </li>
                  <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                    <NavLink exact="true" to="settings/palate"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}
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
  </div>
  )
}

export default Nav
