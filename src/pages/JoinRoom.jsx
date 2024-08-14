import React from 'react'
import { useTheme } from '../ThemeContext'

function JoinRoom(){
    const { isDarkMode } = useTheme();
    // Data contoh untuk tabel
    const players = [
        { id: 1, name: "Player 1", status: "Ready" },
        { id: 2, name: "Player 2", status: "Not Ready" },
        { id: 3, name: "Player 3", status: "Ready" },
    ];

    return(
        <div className={`min-h-screen flex items-center justify-center bg-default text-default`}>
            <div className={`bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-3xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>Bergabung ke Room</h2>
                <table className="w-full mb-6">
                    <tbody>
                        <tr>
                            <td className="py-2">
                                <label htmlFor="roomId" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>ID Room</label>
                            </td>
                            <td className="py-2">
                                <input
                                    type="text"
                                    id="roomId"
                                    className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                                    placeholder="Masukkan ID Room"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2">
                                <label htmlFor="username" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Username</label>
                            </td>
                            <td className="py-2">
                                <input
                                    type="text"
                                    id="username"
                                    className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                                    placeholder="Masukkan Username"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="mb-6">
                    <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Daftar Pemain</h3>
                    <p className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total Pemain: {players.length}</p>
                    <table className={`w-full rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-white bg-opacity-30'}`}>
                        <thead>
                            <tr className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                <th className="p-2 text-left">No</th>
                                <th className="p-2 text-left">Nama</th>
                                <th className="p-2 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player, index) => (
                                <tr key={player.id} className={isDarkMode ? 'text-white' : 'text-black'}>
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2">{player.name}</td>
                                    <td className="p-2">{player.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button
                    className={`w-full py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}
                >
                    Bergabung
                </button>
            </div>
        </div>
    )
}
export default JoinRoom