import React from 'react'

function BattleFight(){
    return(
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-full text-center mb-12">
        <h2 className="text-3xl font-bold absolute top-12 left-1/2 transform -translate-x-1/2 mt-12">KATA KATA ADA DISINI</h2>
      </div>
      <div className="relative w-full flex justify-between">
        {/* Form di sisi kiri */}
        <div className="w-1/3 flex justify-center items-center">
          <div className="w-full max-w-xs">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label htmlFor="namaPlayerKiri" className="block mb-2 text-center">Nama Player</label>
              </div>
              <div className="mb-4">
                <label htmlFor="jawabanPlayerKiri" className="block mb-2 text-center"></label>
                <input
                  type="text"
                  id="jawabanPlayerKiri"
                  className="w-full px-3 py-2 border rounded-md text-white"
                  placeholder="Masukkan jawaban di sini"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      console.log('Jawaban kiri dikirim:', e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            </form>
          </div>
        </div>

        {/* Lingkaran di tengah */}
        <div className="inset-0 flex justify-center items-center">
          <div className="w-24 h-24 border-2 border-black flex items-center justify-center shadow-lg">
            <span>Red Turn</span>
          </div>
        </div>

        {/* Form di sisi kanan */}
        <div className="w-1/3 flex justify-center items-center">
          <div className="w-full max-w-xs">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label htmlFor="namaPlayerKanan" className="block mb-2 text-center">Nama Player</label>

              </div>
              <div className="mb-4">
                <label htmlFor="jawabanPlayerKanan" className="block mb-2 text-center"></label>
                <input
                  type="text"
                  id="jawabanPlayerKanan"
                  className="w-full px-3 py-2 border rounded-md text-white"
                  placeholder="Masukkan jawaban di sini"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      console.log('Jawaban kanan dikirim:', e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
}
export default BattleFight


// <div className="w-full h-screen flex flex-col items-center justify-center">
// <div className="w-full text-center mb-12">
//   <h2 className="text-3xl font-bold absolute top-12 left-1/2 transform -translate-x-1/2 mt-12">Ini lokasi kata kata nya </h2> 
// </div>

// <div className="relative w-full flex justify-between">
//   {/* Left Input */}
//   <div className="w-1/3 flex justify-center items-center">
//     <div className="w-full max-w-xs">
//       <label className="block mb-2 text-center">Nama Player</label>
//       <inpu

//         type="text"
//         id="usernameLeft"
//         className="w-full px-3 py-2 border rounded-md"
//         placeholder="Masukkan jawaban disini"
//       />
//     </div>
//   </div>

//   {/* Circle in the center */}
//   <div className="absolute inset-0 flex justify-center items-center">
//     <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center">
//       <span>Red</span>
//     </div>
//   </div>

//   {/* Right Input */}
//   <div className="w-1/3 flex justify-center items-center">
//     <div className="w-full max-w-xs">
//       <label className="block mb-2 text-center">Nama Player</label>
//       <input
//         type="text"
//         id="usernameRight"
//         className="w-full px-3 py-2 border rounded-md"
//         placeholder="Masukkan username"
//       />
//     </div>
//   </div>
// </div>
// </div>
