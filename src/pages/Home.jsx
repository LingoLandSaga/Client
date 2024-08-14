import React from 'react'
import Navbar from '../components/Navbar'
import {Link} from 'react-router-dom'
import { useTheme } from '../ThemeContext'

function HomePage() {
  const { isDarkMode } = useTheme();

  const backgroundImage = isDarkMode ? 'url("../src/11_black.png")' : 'url("../src/11.jpg")';

  return (
    <div 
      className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
      style={{ backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-full px-3 sm:px-5 lg:px-7 flex flex-col lg:flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-start w-full lg:w-1/2 mb-8 lg:mb-0 lg:mr-4">
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center uppercase font-serif tracking-wide ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Selamat Datang, Pejuang!
            </h1>
            <p className={`text-base sm:text-lg lg:text-xl mb-8 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Uji ingatan & kecepatan ketikmu dan bertahanlah di LingoLandSaga ini!
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link to="/join-room" className={`px-6 py-2 bg-${isDarkMode ? 'gray-300' : 'blue-600'} rounded-lg hover:bg-${isDarkMode ? 'gray-400' : 'blue-700'} text-base font-semibold transition duration-300 ${isDarkMode ? 'text-black' : 'text-white'}`}>
                JOIN ROOM
              </Link>
              <Link to="/create-room" className={`px-6 py-2 bg-${isDarkMode ? 'gray-300' : 'green-800'} rounded-lg hover:bg-${isDarkMode ? 'gray-400' : 'gray-900'} text-base font-semibold transition duration-300 ${isDarkMode ? 'text-black' : 'text-white'}`}>
                CREATE ROOM
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:ml-4">
            <h2 className={`text-3xl font-bold mb-10 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>RULES</h2>
            <ul className={`space-y-3 text-lg text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} backdrop-blur-md bg-opacity-30 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg`}>
              <li>1. Ketik kata yang muncul secepat mungkin</li>
              <li>2. Setiap kesalahan mengurangi poin</li>
              <li>3. Waktu terbatas untuk setiap ronde</li>
              <li>4. Pemain dengan poin tertinggi menang</li>
              <li>5. Bersenang-senanglah!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage