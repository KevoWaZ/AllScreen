'use client'

import { useState } from 'react'
import { FiSearch, FiMenu, FiX } from 'react-icons/fi'
import { FaImdb } from 'react-icons/fa'
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'
import Form from 'next/form'



const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header>
    <nav className={`dark:bg-gray-900 dark:text-white bg-white text-gray-800`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={'/'} className="flex items-center flex-shrink-0">
            <FaImdb className="text-3xl text-red-600" />
            <span className="font-bold text-xl ml-2">AllScreen</span>
          </Link>
          <div className="hidden md:flex md:flex-1 md:justify-center">
            <div className="relative w-full max-w-xl">
                      <Form action={'/search'}>
              <input
                type="search"
                name='search'
                placeholder="Search movies, TV shows..."
                className={`w-full py-2 px-4 rounded-full dark:bg-gray-800 dark:text-white bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600`}
              />
              <button type='submit'>
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </button>
                      </Form>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/movies" className="hover:text-red-600 transition-colors">Movies</Link>
            <Link href="/tv-shows" className="hover:text-red-600 transition-colors">TV Shows</Link>
            <ThemeToggle  />
          </div>
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search movies, TV shows..."
                className={`w-full py-2 px-4 rounded-full dark:bg-gray-800 dark:text-white bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600`}
              />
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Link 
              href="/movies" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-600 transition-colors"
              onClick={toggleMenu}
            >
              Movies
            </Link>
            <Link 
              href="/tv-shows" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-600 transition-colors"
              onClick={toggleMenu}
            >
              TV Shows
            </Link>
          </div>
        </div>
      )}
    </nav>
    </header>
  )
}

export default Header

