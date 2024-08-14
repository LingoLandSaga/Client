import React from 'react'
import { useTheme } from '../ThemeContext'

function CreateRoom() {
    const { isDarkMode } = useTheme();
    
    return (
        <div className="centered-page">
            <div className={`bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>

                <h2 className="text-3xl font-bold mb-6 text-center">Buat Room</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="roomName" className="block text-sm font-medium mb-1">Nama Room</label>
                        <input
                            type="text"
                            id="roomName"
                            className={`w-full px-3 py-2 bg-opacity-30 rounded-md `}
                            placeholder="Masukkan Nama Room"
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
                        <input
                            type="text"
                            id="username"   
                            className={`w-full px-3 py-2 bg-opacity-30 rounded-md `}
                            placeholder="Masukkan Username"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-blue-600 text-black py-2 px-4 rounded-md `}
                    >
                        Buat Room
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateRoom