import React, { useEffect } from 'react';
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiMenuAlt2 } from 'react-icons/hi';
import { FiPlus } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { TO_LOGIN } from '../../utils/Paths';
import toastOnTopRight from '../../utils/customToast';
import { capitalize } from '../../helpers/HtmlConverter';
import { NavStateContext } from '../../context/NavStateContext';
import { useUserData, 
        useSignout } from '../../context/AccountContext';
import AddEditBeanModal from '../../modals/add-edit-bean-modal';
import AddRecipeModal from '../../modals/add-edit-recipe-modal';
import Dropdown from '../../elements/Dropdown';
import { ModalStateContext } from '../../context/ModalStateContext';
import './dashboard-header.scss'


const DashboardHeader = (props) => {
  const { openNav, 
          setMainRef, 
          setHeaderRef,
          setNavRef, 
          setPushPinRef, 
          showNavbar
        } = useContext(NavStateContext); 

  const { modal, 
          openAddBeanModal, 
          openAddRecipeModal, 
          modalModeSelection
        } = useContext(ModalStateContext);

  const userData = useUserData();
  const signout = useSignout();
  const navigate = useNavigate();

  const logout = () => {
    signout();
    navigate(TO_LOGIN, { replace: true });
    toastOnTopRight('success', 'Logged out successfully.')
  }

  useEffect(() => {
    setMainRef(props.mainRef.current);
    setHeaderRef(props.headerRef.current);
    setNavRef(props.navRef.current);
    setPushPinRef(props.pushpinRef.current);
  }, [props.navRef])

  return (
    <>
    <div 
      ref={el => { props.headerRef.current = el; }}
      className="header z-30 w-full items-center border-b border-burnt-sienna border-opacity-20"
    >
      <div className="flex items-center">
        <div className="flex items-center cursor-pointer mx-4" onClick={showNavbar}>
          {openNav ? <IoClose className="h-8 w-8 opacity-80 hover:opacity-100 ease-linear transition-all duration-150" /> 
          : <HiMenuAlt2 className="h-8 w-8 opacity-80 hover:opacity-100 ease-linear transition-all duration-150"/>}
        </div>
        <h2 className="text-base lg:text-xl">{capitalize(props.title)}</h2>
      </div>

      <div className="flex items-center">
        <div className="button-section">
          <button type="button"
            onClick={openAddBeanModal}
            className="flex items-center text-burnt-sienna px-3 py-2 ml-4 mr-0  
                       border border-burnt-sienna rounded border-opacity-40 hover:border-opacity-100
                       opacity-80 hover:opacity-100 ease-linear transition-all duration-150"
          >
            <FiPlus className="h-4 w-4 mr-2" />
            Coffee Bean
          </button>

          <button type="button"
            onClick={openAddRecipeModal}
            className="flex items-center text-burnt-sienna px-3 py-2 ml-4 mr-0
                       border border-burnt-sienna rounded border-opacity-40 hover:border-opacity-100
                       opacity-80 hover:opacity-100 ease-linear transition-all duration-150"
          >
            <FiPlus className="h-4 w-4 mr-2" />
            Recipe
          </button>
        </div>
        <div className="mx-6">
          <Dropdown dropdownText={userData.nickname}>
            <div className="dropdown-content" >
              <NavLink exact="true" to="account" className="dropdown-item">My Account</NavLink>
              <div className="dropdown-divider"></div>
              <button type="button" className="dropdown-item" onClick={logout}>Logout</button>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
    <div className="w-full border-b border-burnt-sienna border-opacity-20 "></div>

    {modal.mode === modalModeSelection.addBean && modal.isOpen ?  <AddEditBeanModal /> : null}
    {modal.mode === modalModeSelection.addRecipe && modal.isOpen ?  <AddRecipeModal /> : null}
    
    </>
    )
}

export default DashboardHeader

