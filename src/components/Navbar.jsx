import React from 'react'
import { useTheme } from '../ThemeContext'

function Navbar(){
    const { isDarkMode, toggleTheme } = useTheme();
    
    return (
        <nav className={`py-2 fixed top-0 left-0 right-0 z-10 navbar ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <div className="flex items-center justify-between px-4">
                <div className="flex-1"></div>
                <div className="flex items-center justify-center flex-1">
                    <span className="text-lg font-bold uppercase font-serif">
                        LingSaga
                    </span>
                </div>
                <div className="flex items-center justify-end flex-1">
                    <button onClick={toggleTheme} className={`px-4 py-2 rounded-md ml-auto ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-black'}`}>
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar