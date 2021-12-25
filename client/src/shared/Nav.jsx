import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { BookOpenIcon, ChevronDownIcon, ChevronUpIcon, CogIcon, FilterIcon, HomeIcon, PlusCircleIcon } from '@heroicons/react/outline'
import { Collapse } from 'react-bootstrap'


function Nav() {
  const [openProcess, setOpenProcess] = useState(false);
  const [openOrigin, setOpenOrigin] = useState(false);

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

    <div className="border-b border-creme border-opacity-20 h-20 flex justify-center items-center">
      <h2 className="font-extralight text-sm tracking-widest">Maiko.M</h2>
    </div>

    <div className="my-8 text-xs tracking-widest font-capitals uppercase">
      <h3 className="mx-6 my-2 opacity-50">
        Main
      </h3>
      <ul>
        <li className="h-10 mx-6 flex items-center justify-between font-bold">
          <NavLink to="/"
            className={({ isActive }) => "flex items-center" 
              + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-80 hover:opacity-100')}
          >
            <HomeIcon className="h-4 w-4"></HomeIcon>
            <span className="ml-4">Dashboard</span>
          </NavLink>
        </li>

        <li className="h-10 mx-6 flex items-center justify-between font-bold">
          <NavLink exact to="coffees"
            className={({ isActive }) => "flex items-center" 
            + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-80 hover:opacity-100')}
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
          <NavLink exact to="create/bean"
            className={({ isActive }) => "flex items-center" 
            + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-80 hover:opacity-100')}
          >
            <PlusCircleIcon className="h-4 w-4"></PlusCircleIcon>
            <span className="ml-4">Coffee Bean</span>
          </NavLink>
        </li>

        <li className="h-10 mx-6 flex items-center justify-between font-bold">
          <NavLink exact to="create/recipe"
            className={({ isActive }) => "flex items-center" 
            + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-80 hover:opacity-100')}
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
        <li className="mx-6">
          <div className="
            h-10 flex items-center justify-between font-bold
            transition-opacity duration-300
            ease-out opacity-80 hover:opacity-100
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
                  <NavLink exact to="ethiopia/1"
                    className={({ isActive }) => "flex items-center" 
                    + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-80 hover:opacity-100')}
                  >
                    <span>Ethiopia</span>
                  </NavLink>
                </li>
                <li className="h-10 ml-8 mr-6 flex items-center justify-between">
                  <NavLink exact to="colombia/1"
                    className={({ isActive }) => "flex items-center" 
                    + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-80 hover:opacity-100')}
                  >
                    <span>Colombia</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>

        <li className="mx-6">
          <div className="
            h-10 flex items-center justify-between font-bold
            transition-opacity duration-300
            ease-out opacity-80 hover:opacity-100
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
        <li className="
          h-10 mx-6 flex items-center justify-between font-bold
          transition-opacity duration-300
          ease-out opacity-80 hover:opacity-100"
        >
          <NavLink exact to="settings/bean"             
            className={({ isActive }) => "flex items-center" 
            + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-80 hover:opacity-100')}
          >
            <CogIcon className="h-4 w-4"></CogIcon>
            <span className="ml-4">Coffee Bean</span>
          </NavLink>
        </li>

        <li className="
          h-10 mx-6 flex items-center justify-between font-bold
          transition-opacity duration-300
          ease-out opacity-80 hover:opacity-100"
        >
          <NavLink exact to="settings/recipe"
            className={({ isActive }) => "flex items-center" 
            + (isActive ? ' active font-bold' : ' transition-opacity duration-300 ease-out opacity-80 hover:opacity-100')}
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
