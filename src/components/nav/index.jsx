import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { BsPlus } from 'react-icons/bs';
import { HiOutlineBookOpen, HiOutlineCog, HiOutlineHome } from 'react-icons/hi';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import PushPinIcon from '../../assets/svgs/PushPinIcon'
import { NavStateContext } from '../../context/NavStateContext'
import './nav.scss'
import AddEditBeanModal from '../../modals/add-edit-bean-modal'
import AddEditRecipeModal from '../../modals/add-edit-recipe-modal'
import { ModalStateContext } from '../../context/ModalStateContext'
import Logo from '../../assets/images/logo-dark-bg.png'
import useUserTotalUsedMb from '../../hooks/useUserTotalUsedMb';
import { USER_TYPE } from '../../utils/Constants';
import useUserInfo from '../../hooks/useUserInfo';
import Upgrade from './Upgrade';
import Feedback from './Feedback';
import SendFeedbackModal from '../../modals/send-feedback-modal';


const Nav = (props) => {
  const { showNavbar, 
          pinnedNavbar, 
          setPinnedNavbar,
        } = useContext(NavStateContext);

  const { modal, 
          openAddBeanModal, 
          openAddRecipeModal, 
          modalModeSelection
        } = useContext(ModalStateContext);

  const [openBeansAccordion, innerSetOpenBeansAccordion] = useState(false);
  const [openRecipesAccordion, innerSetOpenRecipesAccordion] = useState(false);

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

  const [feedbackComponent, setFeedbackComponent] = useState(null);

  const { data: userInfo, 
          isLoading: userInfoIsLoading,
        } = useUserInfo();

  const { data: totalUsedMb, 
          isLoading: totalUsedMbIsLoading,
        } = useUserTotalUsedMb();

  useEffect(() => {
    if (userInfo?.user_type === 'TRIAL' && totalUsedMb) {
      // const totalUsedMbPercentage = totalUsedMb / USER_TYPE.TRIAL.MAX_CAPACITY_IN_MB * 100;
      // setUpgradeComponent(<Upgrade totalUsedMbPercentage={totalUsedMbPercentage} />);
      setFeedbackComponent(<Feedback />);
    }
  }, [userInfoIsLoading, totalUsedMbIsLoading]);


  return (
  <>
    <div>
      <nav
        ref={el => { props.navRef.current = el; }}
        className="l-nav z-40 top-0 bottom-0 overflow-auto bg-burnt-sienna border-r text-white"
      >
        <div className="p-4 lg:py-3 flex justify-between items-center">
            <div className="w-10/12 mx-auto lg:mx-0">
              <img src={Logo} alt="Coffeastock" />
            </div>
          <button 
            type="button" 
            ref={el => { props.pushpinRef.current = el; }} 
            className="h-4 w-4 pushpin hidden lg:block" onClick={setPinnedNavbar}>
            <PushPinIcon />
          </button>
        </div>

        <div className="overflow-auto absolute top-16 bottom-28 border-b left-0 right-0 border-creme border-opacity-20">
          <div className="py-4">
            <h3 className="mx-6 mb-3 text-xs opacity-50">Main</h3>
            <ul className="ml-10">
              <li className="h-10 flex items-center justify-between">
                <NavLink to="dashboard"
                  className={({ isActive }) => "flex items-center" 
                    + (isActive ? ' nav-link-active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                    onClick={pinnedNavbar ? null : showNavbar}>
                  <HiOutlineHome className="h-4 w-4"></HiOutlineHome>
                  <span className="ml-4">Dashboard</span>
                </NavLink>
              </li>

              <li className="h-10 flex items-center justify-between">
                <NavLink exact="true" to="coffee"
                  className={({ isActive }) => "flex items-center" 
                  + (isActive ? ' nav-link-active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                  onClick={pinnedNavbar ? null : showNavbar}>
                  <HiOutlineBookOpen className="h-4 w-4"></HiOutlineBookOpen>
                  <span className="ml-4">View All Beans</span>
                </NavLink>
              </li>

              <li className="h-10 flex items-center justify-between">
                <NavLink exact="true" to="compare/recipes"
                  className={({ isActive }) => "flex items-center" 
                  + (isActive ? ' nav-link-active font-bold' : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                  onClick={pinnedNavbar ? null : showNavbar}>
                  <HiOutlineBookOpen className="h-4 w-4"></HiOutlineBookOpen>
                  <span className="ml-4">Compare Recipes</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="py-4">
            <h3 className="mx-6 mb-3 text-xs opacity-50">Create</h3>
            <ul className="mx-5">
              <li className="h-10 w-full mb-2">
                <button type="button"
                  onClick={openAddBeanModal}
                  className="w-full flex items-center bg-white bg-opacity-20 rounded-full px-6 py-2 
                            transition-opacity duration-300 ease-out opacity-70 hover:opacity-100"
                >
                  <BsPlus className="h-full mr-2" />
                  New Coffee Bean
                </button>
              </li>

              <li className="h-10 w-full">
                <button type="button"
                  onClick={openAddRecipeModal}
                  className="w-full flex items-center bg-white bg-opacity-20 rounded-full px-6 py-2 
                            transition-opacity duration-300 ease-out opacity-70 hover:opacity-100"
                >
                  <BsPlus className="h-full mr-2" />
                  New Recipe
                </button>
              </li>
            </ul>
          </div>

          <div className="py-4">
            <h3 className="mx-6 mb-3 text-xs opacity-50">
                Customize Attributes
            </h3>
            <ul className="ml-6">
              <li className="mr-6">
                <div 
                  className="h-10 flex items-center 
                  justify-between transition-opacity duration-300 
                  ease-out opacity-70 hover:opacity-100 cursor-pointer"
                  onClick={() => toggleOpenBeansAccordion()}
                >
                  <div className="flex items-center">
                    <HiOutlineCog className="h-4 w-4"></HiOutlineCog>
                    <span className="ml-4">For Coffee Beans</span>
                  </div>
                  { openBeansAccordion === true 
                    ? <IoIosArrowUp className="h-4 w-4"></IoIosArrowUp>
                    : <IoIosArrowDown className="h-4 w-4"></IoIosArrowDown>
                  }
                </div>

                <div className="overflow-hidden">
                  <ul 
                    style={{ marginTop: beansMarginTop, opacity: beansOpacity }}
                    className="ease-in-out transition-all duration-500"
                  >
                    <li className="h-10 ml-8 mr-6 flex items-center justify-between">
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
                    <li className="h-10 ml-8 mr-6 flex items-center justify-between">
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
                    <li className="h-10 ml-8 mr-6 flex items-center justify-between">
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
                    <li className="h-10 ml-8 mr-6 flex items-center justify-between">
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
                    <li className="h-10 ml-8 mr-6 flex items-center justify-between">
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
                    <li className="h-10 ml-8 mr-6 flex items-center justify-between">
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
                  className="h-10 flex items-center 
                  justify-between transition-opacity duration-300 
                  ease-out opacity-70 hover:opacity-100 cursor-pointer"
                  onClick={() => toggleOpenRecipesAccordion()}
                >
                  <div className="flex items-center">
                    <HiOutlineCog className="h-4 w-4"></HiOutlineCog>
                    <span className="ml-4">For Recipes</span>
                  </div>
                  { openRecipesAccordion === true
                    ? <IoIosArrowUp className="h-4 w-4"></IoIosArrowUp>
                    : <IoIosArrowDown className="h-4 w-4"></IoIosArrowDown>
                  }
                </div>
                <div className="overflow-hidden">
                  <ul 
                    style={{ marginTop: recipesMarginTop, opacity: recipesOpacity }}
                    className="ease-in-out transition-all duration-500">
                    <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                      <NavLink 
                        exact="true" 
                        to="settings/grinder"
                        className={({ isActive }) => "flex items-center" 
                                    + (isActive ? ' nav-link-active font-bold' 
                                    : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                        onClick={pinnedNavbar ? null : showNavbar}
                      >
                        <span>Grinder</span>
                      </NavLink>
                    </li>
                    <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                      <NavLink 
                        exact="true" 
                        to="settings/method"
                        className={({ isActive }) => "flex items-center" 
                                    + (isActive ? ' nav-link-active font-bold' 
                                    : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                        onClick={pinnedNavbar ? null : showNavbar}
                      >
                        <span>Method</span>
                      </NavLink>
                    </li>
                    <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                      <NavLink 
                        exact="true" 
                        to="settings/water"
                        className={({ isActive }) => "flex items-center" 
                                    + (isActive ? ' nav-link-active font-bold' 
                                    : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                        onClick={pinnedNavbar ? null : showNavbar}
                      >
                        <span>water</span>
                      </NavLink>
                    </li>
                    <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                      <NavLink 
                        exact="true" 
                        to="settings/palate"
                        className={({ isActive }) => "flex items-center" 
                                    + (isActive ? ' nav-link-active font-bold' 
                                    : ' transition-opacity duration-300 ease-out opacity-70 hover:opacity-100')}
                        onClick={pinnedNavbar ? null : showNavbar}
                      >
                        <span>Palate</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>

        { feedbackComponent }
      </nav>

    </div>

    {modal.mode === modalModeSelection.addBean && modal.isOpen ?  <AddEditBeanModal /> : null}
    {modal.mode === modalModeSelection.addRecipe && modal.isOpen ?  <AddEditRecipeModal /> : null}
    {modal.mode === modalModeSelection.sendFeedback && modal.isOpen ?  <SendFeedbackModal /> : null}
  </>
  )
}

export default Nav
