import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpenIcon, ChevronDownIcon, ChevronUpIcon, CogIcon, FilterIcon, HomeIcon, PlusCircleIcon } from '@heroicons/react/outline'
import { Collapse } from 'react-bootstrap'


function Nav() {
  const [openProcess, setOpenProcess] = useState(false);
  const [openOrigin, setOpenOrigin] = useState(false);

  return (
  <nav 
  className="
      w-64 
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

    <div className="my-8 text-sm tracking-widest font-capitals">
      <h3 className="mx-6 my-2 text-xs opacity-50 uppercase">
        Main
      </h3>
      <ul>
        <li
        className="h-10 mx-6 flex items-center justify-between
          transition-opacity duration-300 ease-out opacity-80 hover:opacity-100"
        >
          <Link to="/" className="flex items-center">
            <HomeIcon className="h-4 w-4"></HomeIcon>
            <span className="ml-2">Dashboard</span>
          </Link>
        </li>

        <li 
        className="h-10 mx-6 flex items-center justify-between
          transition-opacity duration-300 ease-out opacity-80 hover:opacity-100"
        >
          <Link to="/recipes" className="flex items-center hover:opacity-100">
            <BookOpenIcon className="h-4 w-4"></BookOpenIcon>
            <span className="ml-2">View All Recipes</span>
          </Link>
        </li>
      </ul>
    </div>

    <div className="my-8 text-sm tracking-widest font-capitals">
      <h3 className="mx-6 my-2 text-xs opacity-50 uppercase">
        Create New
      </h3>
      <ul>
        <li className="h-10 mx-6 flex items-center justify-between
          transition-opacity duration-300
          ease-out opacity-80 hover:opacity-100"
        >
          <Link to="/create/bean" className="flex items-center hover:opacity-100">
            <PlusCircleIcon className="h-4 w-4"></PlusCircleIcon>
            <span className="ml-2">Coffee Bean</span>
          </Link>
        </li>

        <li className="
          h-10 mx-6 flex items-center justify-between
          transition-opacity duration-300
          ease-out opacity-80 hover:opacity-100"
        >
          <Link to="/create/recipe" className="flex items-center hover:opacity-100">
            <PlusCircleIcon className="h-4 w-4"></PlusCircleIcon>
            <span className="ml-2">Recipe</span>
          </Link>
        </li>
      </ul>
    </div>

    <div className="my-8 text-sm tracking-widest font-capitals">
      <h3 className="mx-6 my-2 text-xs opacity-50 uppercase">
          Filter by
      </h3>
      <ul>
        <li className="mx-6">
          <div className="
            h-10 flex items-center justify-between
            transition-opacity duration-300
            ease-out opacity-80 hover:opacity-100
            cursor-pointer"
            onClick={() => setOpenOrigin(!openOrigin)}
            aria-controls="origin-content"
            aria-expanded={openOrigin}
          >
            <div className="flex items-center">
              <FilterIcon className="h-4 w-4"></FilterIcon>
              <span className="ml-2">Origin</span>
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
                <li
                className="h-10 mx-6 flex items-center justify-between
                  transition-opacity duration-300 ease-out opacity-80 hover:opacity-100"
                >
                  <Link to="/recipes/ethiopia/1" className="flex items-center">
                    <span>Ethiopia</span>
                  </Link>
                </li>
                <li
                className="h-10 mx-6 flex items-center justify-between
                  transition-opacity duration-300 ease-out opacity-80 hover:opacity-100"
                >
                  <Link to="/recipes/colombia/1" className="flex items-center">
                    <span>Colombia</span>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>

        <li className="mx-6">
          <div className="
            h-10 flex items-center justify-between
            transition-opacity duration-300
            ease-out opacity-80 hover:opacity-100
            cursor-pointer"
            onClick={() => setOpenProcess(!openProcess)}
            aria-controls="process-content"
            aria-expanded={openProcess}
          >
            <div className="flex items-center">
              <FilterIcon className="h-4 w-4"></FilterIcon>
              <span className="ml-2">Process</span>
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

    <div className="my-8 text-sm tracking-widest font-capitals">
      <h3 className="mx-6 my-2 text-xs opacity-50 uppercase">
          Settings
      </h3>
      <ul>
        <li className="
          h-10 mx-6 flex items-center justify-between
          transition-opacity duration-300
          ease-out opacity-80 hover:opacity-100"
        >
          <Link to="/settings/bean" className="flex items-center hover:opacity-100">
              <CogIcon className="h-4 w-4"></CogIcon>
              <span className="ml-2">Coffee Bean</span>
          </Link>
        </li>

        <li className="
          h-10 mx-6 flex items-center justify-between
          transition-opacity duration-300
          ease-out opacity-80 hover:opacity-100"
        >
          <Link to="/settings/recipe" className="flex items-center hover:opacity-100">
            <CogIcon className="h-4 w-4"></CogIcon>
            <span className="ml-2">Recipe</span>
          </Link>
        </li>
      </ul>
    </div>

  </nav>
  )
}

export default Nav
