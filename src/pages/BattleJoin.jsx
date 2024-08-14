import React from 'react'

function BattleFight(){
    return(
        <div className="w-full h-screen flex flex-col items-center justify-center">
              <div className="w-full text-center mb-12">
                <h2 className="text-3xl font-bold absolute top-0 left-1/2 transform -translate-x-1/2 mt-12">TEXT</h2>
              </div>
        
              <div className="relative w-full flex justify-between">
                {/* Left Input */}
                <div className="w-1/3 flex justify-center items-center">
                  <div className="w-full max-w-xs">
                    <label htmlFor="usernameLeft" className="block mb-2 text-center">Nama Player</label>
                    <input
                      type="text"
                      id="usernameLeft"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Masukkan username"
                    />
                  </div>
                </div>
        
                {/* Circle in the center */}
                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center">
                    <span>Red</span>
                  </div>
                </div>
        
                {/* Right Input */}
                <div className="w-1/3 flex justify-center items-center">
                  <div className="w-full max-w-xs">
                    <label htmlFor="usernameRight" className="block mb-2 text-center">Nama Player</label>
                    <input
                      type="text"
                      id="usernameRight"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Masukkan username"
                    />
                  </div>
                </div>
              </div>
            </div>
    )
}
export default BattleFight

