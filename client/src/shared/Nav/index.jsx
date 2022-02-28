import React, { useState} from 'react'
import { NavLink } from 'react-router-dom'
import { BookOpenIcon, ChevronDownIcon, ChevronUpIcon, CogIcon, HomeIcon } from '@heroicons/react/outline'
import { useContext } from 'react'
import './Nav.scss'
import { NavStateContext } from '../../context/NavState'
import PushPinIcon from '../../svgs/PushPinIcon'

const Nav = (props) => {
  const { showNavbar, pinnedNavbar, setPinnedNavbar } = useContext(NavStateContext);
  const [openSettingCoffeeBeans, setOpenSettingCoffeeBeans] = useState(false);
  const [openSettingRecipes, setOpenSettingRecipes] = useState(false);

  return (
  <div id="nav-bar">
    <nav
      ref={el => { props.navRef.current = el; }}
      id="nav"
      className="l-nav fixed top-0 bottom-0 overflow-auto
        bg-burnt-sienna border-r text-white"
    >
      <div className=" border-b border-creme border-opacity-20 h-16 px-6 flex justify-between items-center">
        <h1 className="uppercase text-lg font-capitals">Coffee Journal</h1>
        <button type="button" ref={el => { props.pushpinRef.current = el; }} className="h-4 w-4 pushpin hidden lg:block" onClick={setPinnedNavbar}>
          <PushPinIcon />
        </button>
      </div>

      <div className="my-8 text-sm font-capitals uppercase">
        <h3 className="mx-6 my-3 text-xs opacity-50">
          Main
        </h3>
        <ul className="ml-10">
          <li className="h-12 flex items-center justify-between">
            <NavLink to="/"
              className={({ isActive }) => "flex items-center" 
                + (isActive ? ' nav-link-active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                onClick={pinnedNavbar ? null : showNavbar}
            >
              <HomeIcon className="h-4 w-4"></HomeIcon>
              <span className="ml-4">Dashboard</span>
            </NavLink>
          </li>

          <li className="h-12 flex items-center justify-between">
            <NavLink exact="true" to="coffees"
              className={({ isActive }) => "flex items-center" 
              + (isActive ? ' nav-link-active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
              onClick={pinnedNavbar ? null : showNavbar}
            >
              <BookOpenIcon className="h-4 w-4"></BookOpenIcon>
              <span className="ml-4">my coffees</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="my-8 text-sm font-capitals uppercase">
        <h3 className="mx-6 my-3 text-xs opacity-50">
            Customize Range
        </h3>
        <ul className="ml-6">
          <li className="mr-6">
            <div className="
              h-12 flex items-center justify-between
              transition-opacity duration-300
              ease-out opacity-70 hover:opacity-100
              cursor-pointer"
              onClick={() => setOpenSettingCoffeeBeans(!openSettingCoffeeBeans)}
              aria-controls="origin-content"
              aria-expanded={openSettingCoffeeBeans}
            >
              <div className="flex items-center">
                <CogIcon className="h-4 w-4"></CogIcon>
                <span className="ml-4">For Coffee Beans</span>
              </div>

              { openSettingCoffeeBeans === true ? (
                <ChevronUpIcon className="h-4 w-4"></ChevronUpIcon>
              ) :
                <ChevronDownIcon className="h-4 w-4"></ChevronDownIcon>
              }
            </div>
            {/* <Collapse in={openSettingCoffeeBeans}>
              <div id="origin-content">
                <ul>
                  <li className="h-12 ml-8 mr-6 flex items-center justify-between">
                    <NavLink exact="true" to="settings/origin"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' nav-link-active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}
                    >
                      <span>Origin</span>
                    </NavLink>
                  </li>
                  <li className="h-12 ml-8 mr-6 flex items-center justify-between">
                    <NavLink exact="true" to="settings/farm"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' nav-link-active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}
                    >
                      <span>Farm</span>
                    </NavLink>
                  </li>
                  <li className="h-12 ml-8 mr-6 flex items-center justify-between">
                    <NavLink exact="true" to="settings/variety"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' nav-link-active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}
                    >
                      <span>Variety</span>
                    </NavLink>
                  </li>
                  <li className="h-12 ml-8 mr-6 flex items-center justify-between">
                    <NavLink exact="true" to="settings/process"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' nav-link-active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}
                    >
                      <span>process</span>
                    </NavLink>
                  </li>
                  <li className="h-12 ml-8 mr-6 flex items-center justify-between">
                    <NavLink exact="true" to="settings/roaster"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' nav-link-active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}
                    >
                      <span>roaster</span>
                    </NavLink>
                  </li>
                  <li className="h-12 ml-8 mr-6 flex items-center justify-between">
                    <NavLink exact="true" to="settings/aroma"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' nav-link-active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}
                    >
                      <span>aroma</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </Collapse> */}
          </li>

          <li className="mr-6">
            <div className="
              h-12 flex items-center justify-between
              transition-opacity duration-300
              ease-out opacity-70 hover:opacity-100
              cursor-pointer"
              onClick={() => setOpenSettingRecipes(!openSettingRecipes)}
              aria-controls="origin-content"
              aria-expanded={openSettingRecipes}
            >
              <div className="flex items-center">
                <CogIcon className="h-4 w-4"></CogIcon>
                <span className="ml-4">For Recipes</span>
              </div>

              { openSettingRecipes === true ? (
                <ChevronUpIcon className="h-4 w-4"></ChevronUpIcon>
              ) :
                <ChevronDownIcon className="h-4 w-4"></ChevronDownIcon>
              }
            </div>
            {/* <Collapse in={openSettingRecipes}>
              <div id="origin-content">
                <ul>
                  <li className="h-12 ml-8 mr-6 flex items-center justify-between">
                    <NavLink exact="true" to="settings/grinder"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' nav-link-active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}
                    >
                      <span>grinder</span>
                    </NavLink>
                  </li>
                  <li className="h-12 ml-8 mr-6 flex items-center justify-between">
                    <NavLink exact="true" to="settings/method"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' nav-link-active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}
                    >
                      <span>method</span>
                    </NavLink>
                  </li>
                  <li className="h-12 ml-8 mr-6 flex items-center justify-between">
                    <NavLink exact="true" to="settings/water"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' nav-link-active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}
                    >
                      <span>water</span>
                    </NavLink>
                  </li>
                  <li className="h-12 ml-8 mr-6 flex items-center justify-between">
                    <NavLink exact="true" to="settings/palate"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' nav-link-active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}
                    >
                      <span>palate</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </Collapse> */}
          </li>

        </ul>
      </div>

    </nav>
  </div>
  )
}

export default Nav
