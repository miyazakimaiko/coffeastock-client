import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { BookOpenIcon, ChevronDownIcon, ChevronUpIcon, CogIcon, HomeIcon } from '@heroicons/react/outline'
import PushPinIcon from '../../assets/svgs/PushPinIcon'
import { NavStateContext } from '../../context/NavStateContext'
import './nav.scss'
import AddEditBeanModal from '../../modals/add-edit-bean-modal'
import AddEditRecipeModal from '../../modals/add-edit-recipe-modal'
import { ModalStateContext } from '../../context/ModalStateContext'


const Nav = (props) => {
  const { showNavbar, pinnedNavbar, setPinnedNavbar } = useContext(NavStateContext);
  const [openBeansAccordion, innerSetOpenBeansAccordion] = useState(false);
  const [openRecipesAccordion, innerSetOpenRecipesAccordion] = useState(false);
  const {modal, openAddBeanModal, openAddRecipeModal, modalModeSelection} = useContext(ModalStateContext);

  const [beansOpacity, setBeansOpacity] = useState(0);
  const [recipesOpacity, setRecipesOpacity] = useState(0);
  const [beansMarginTop, setBeansMarginTop] = useState("-400px");
  const [recipesMarginTop, setRecipesMarginTop] = useState("-400px");

  const toggleOpenBeansAccordion = () => {
    if (openBeansAccordion) {
      setBeansOpacity(0);
      innerSetOpenBeansAccordion(false);
    } else {
      setBeansMarginTop("0");
      innerSetOpenBeansAccordion(true);
    }
  }

  const toggleOpenRecipesAccordion = () => {
    if (openRecipesAccordion) {
      setRecipesOpacity(0);
      innerSetOpenRecipesAccordion(false);
    } else {
      setRecipesMarginTop("0");
      innerSetOpenRecipesAccordion(true);
    }
  }

  useEffect(() => {
    if (!openBeansAccordion) {
      const beansAccordionTimer = setTimeout(() => setBeansMarginTop("-400px"), 200);
      return() => clearTimeout(beansAccordionTimer)
    } else {
      const beansAccordionTimer = setTimeout(() => setBeansOpacity(1), 300);
      return() => clearTimeout(beansAccordionTimer)
    }
  }, [openBeansAccordion]);

  useEffect(() => {
    if (!openRecipesAccordion) {
      const recipesAccordionTimer = setTimeout(() => setRecipesMarginTop("-400px"), 200);
      return() => clearTimeout(recipesAccordionTimer)
    } else {
      const recipesAccordionTimer = setTimeout(() => setRecipesOpacity(1), 300);
      return() => clearTimeout(recipesAccordionTimer)
    }
  }, [openRecipesAccordion]);

  return (
  <>
    <div>
      <nav
        ref={el => { props.navRef.current = el; }}
        className="l-nav z-20 top-0 bottom-0 overflow-auto
          bg-burnt-sienna border-r text-white">
        <div 
          className="h-16 px-6 flex justify-between items-center">
          <h1 className=" text-lg">Coffeastock</h1>
          <button 
            type="button" 
            ref={el => { props.pushpinRef.current = el; }} 
            className="h-4 w-4 pushpin hidden lg:block" onClick={setPinnedNavbar}>
            <PushPinIcon />
          </button>
        </div>

        <div className="my-8 ">
          <h3 className="mx-6 my-3 text-xs opacity-50">
            Main
          </h3>
          <ul className="ml-10">
            <li className="h-12 flex items-center justify-between">
              <NavLink to="/"
                className={({ isActive }) => "flex items-center" 
                  + (isActive ? ' nav-link-active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                  onClick={pinnedNavbar ? null : showNavbar}>
                <HomeIcon className="h-4 w-4"></HomeIcon>
                <span className="ml-4">Dashboard</span>
              </NavLink>
            </li>

            <li className="h-12 flex items-center justify-between">
              <NavLink exact="true" to="coffees"
                className={({ isActive }) => "flex items-center" 
                + (isActive ? ' nav-link-active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                onClick={pinnedNavbar ? null : showNavbar}>
                <BookOpenIcon className="h-4 w-4"></BookOpenIcon>
                <span className="ml-4">View Coffees</span>
              </NavLink>
            </li>

            <li className="h-12 flex items-center justify-between">
              <NavLink exact="true" to="compare/recipes"
                className={({ isActive }) => "flex items-center" 
                + (isActive ? ' nav-link-active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                onClick={pinnedNavbar ? null : showNavbar}>
                <BookOpenIcon className="h-4 w-4"></BookOpenIcon>
                <span className="ml-4">Compare Recipes</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="my-8 ">
          <h3 className="mx-6 my-3 text-xs opacity-50">
            Create
          </h3>
          <ul className="ml-10">
            <li className="h-12 flex items-center justify-between">
              <button type="button"
                onClick={openAddBeanModal}
                className="transition-opacity duration-300 ease-out opacity-70 hover:opacity-100">
                New Coffee Bean
              </button>
            </li>

            <li className="h-12 flex items-center justify-between">
            <button type="button"
                onClick={openAddRecipeModal}
                className="transition-opacity duration-300 ease-out opacity-70 hover:opacity-100">
                New Recipe
              </button>
            </li>
          </ul>
        </div>

        <div className="my-8 ">
          <h3 className="mx-6 my-3 text-xs opacity-50">
              Customize Attributes
          </h3>
          <ul className="ml-6">
            <li className="mr-6">
              <div 
                className="h-12 flex items-center 
                justify-between transition-opacity duration-300 
                ease-out opacity-70 hover:opacity-100 cursor-pointer"
                onClick={() => toggleOpenBeansAccordion()}>
                <div className="flex items-center">
                  <CogIcon className="h-4 w-4"></CogIcon>
                  <span className="ml-4">For Coffee Beans</span>
                </div>
                { openBeansAccordion === true ? 
                  <ChevronUpIcon className="h-4 w-4"></ChevronUpIcon>
                : <ChevronDownIcon className="h-4 w-4"></ChevronDownIcon>
                }
              </div>

              <div className="overflow-hidden">
                <ul 
                  style={{ marginTop: beansMarginTop, opacity: beansOpacity }}
                  className="ease-in-out transition-all duration-500">
                  <li className="h-12 ml-8 mr-6 flex items-center justify-between">
                    <NavLink 
                      exact="true" 
                      to="settings/origin"
                      onClick={pinnedNavbar ? null : showNavbar}
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' nav-link-active font-bold' 
                      : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')} >
                      <span>Origin</span>
                    </NavLink>
                  </li>
                  <li className="h-12 ml-8 mr-6 flex items-center justify-between">
                    <NavLink 
                      exact="true" 
                      to="settings/farm"
                      onClick={pinnedNavbar ? null : showNavbar}
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' nav-link-active font-bold' 
                      : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')} >
                      <span>Farm</span>
                    </NavLink>
                  </li>
                  <li className="h-12 ml-8 mr-6 flex items-center justify-between">
                    <NavLink 
                      exact="true" 
                      to="settings/variety"
                      onClick={pinnedNavbar ? null : showNavbar}
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' nav-link-active font-bold' 
                      : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')} >
                      <span>Variety</span>
                    </NavLink>
                  </li>
                  <li className="h-12 ml-8 mr-6 flex items-center justify-between">
                    <NavLink 
                      exact="true" 
                      to="settings/process"
                      onClick={pinnedNavbar ? null : showNavbar}
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' nav-link-active font-bold' 
                      : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')} >
                      <span>Process</span>
                    </NavLink>
                  </li>
                  <li className="h-12 ml-8 mr-6 flex items-center justify-between">
                    <NavLink 
                      exact="true" 
                      to="settings/roaster"
                      onClick={pinnedNavbar ? null : showNavbar}
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' nav-link-active font-bold' 
                      : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')} >
                      <span>Roaster</span>
                    </NavLink>
                  </li>
                  <li className="h-12 ml-8 mr-6 flex items-center justify-between">
                    <NavLink 
                      exact="true" 
                      to="settings/aroma"
                      onClick={pinnedNavbar ? null : showNavbar}
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' nav-link-active font-bold' 
                      : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')} >
                      <span>Aroma</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            <li className="mr-6">
              <div 
                className="h-12 flex items-center 
                justify-between transition-opacity duration-300 
                ease-out opacity-70 hover:opacity-100 cursor-pointer"
                onClick={() => toggleOpenRecipesAccordion()} >
                <div className="flex items-center">
                  <CogIcon className="h-4 w-4"></CogIcon>
                  <span className="ml-4">For Recipes</span>
                </div>
                { openRecipesAccordion === true ? (
                  <ChevronUpIcon className="h-4 w-4"></ChevronUpIcon>
                ) :
                  <ChevronDownIcon className="h-4 w-4"></ChevronDownIcon>
                }
              </div>
              <div className="overflow-hidden">
                <ul 
                  style={{ marginTop: recipesMarginTop, opacity: recipesOpacity }}
                  className="ease-in-out transition-all duration-500">
                  <li className="h-12 ml-8 mr-6 flex items-center justify-between">
                    <NavLink 
                      exact="true" 
                      to="settings/grinder"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' nav-link-active font-bold' 
                      : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}>
                      <span>Grinder</span>
                    </NavLink>
                  </li>
                  <li className="h-12 ml-8 mr-6 flex items-center justify-between">
                    <NavLink 
                      exact="true" 
                      to="settings/method"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' nav-link-active font-bold' 
                      : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}>
                      <span>Method</span>
                    </NavLink>
                  </li>
                  <li className="h-12 ml-8 mr-6 flex items-center justify-between">
                    <NavLink 
                      exact="true" 
                      to="settings/water"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' nav-link-active font-bold' 
                      : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}>
                      <span>water</span>
                    </NavLink>
                  </li>
                  <li className="h-12 ml-8 mr-6 flex items-center justify-between">
                    <NavLink 
                      exact="true" 
                      to="settings/palate"
                      className={({ isActive }) => "flex items-center" 
                      + (isActive ? ' nav-link-active font-bold' 
                      : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                      onClick={pinnedNavbar ? null : showNavbar}>
                      <span>Palate</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    {modal.mode === modalModeSelection.addBean && modal.isOpen ?  <AddEditBeanModal /> : null}
    {modal.mode === modalModeSelection.addRecipe && modal.isOpen ?  <AddEditRecipeModal /> : null}
  </>
  )
}

export default Nav
