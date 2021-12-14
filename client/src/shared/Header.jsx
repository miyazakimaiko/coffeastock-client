import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'

const Header = () => {
    return (
        <div
          className="
            h-20 w-full mb-4 px-3 
            flex items-center justify-between
            border-b border-black border-opacity-20"
        >
            <h2 className="font-bold text-xl">Header</h2>
            <form 
              action=""
              className="
              relative
              flex items-center text-gray-400 focus-within:text-gray-500"
            >
              <SearchIcon className="w-5 h-5 ml-3 absolute pointer-events-none"></SearchIcon>
                <input 
                  type="text"
                  name="search"
                  placeholder="Search recipes/beans"
                  autoComplete="off"
                  aria-label="Search"
                  className="
                    w-64
                    pl-10 pr-3 py-2 rounded-sm outline-none ring-1 
                    ring-gray-300 focus-visible:ring-gray-400 focus-visible:ring-2"
                />
            </form>
        </div>
    )
}

export default Header
