import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="navbar bg-transparent fixed top-0 left-0 right-0 z-50 px-20">
        <div className="flex justify-between w-full items-center">
          <Link className="hover:bg-gray-800 p-2 rounded-lg" to={"/"}>
            <h1 className="text-xl text-white font-semibold">LingoLand Saga</h1>
          </Link>
          <button className="text-white" onClick={() => document.getElementById("rules").showModal()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
          </button>
          <dialog id="rules" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Game Rules!</h3>
              <p className="py-4">
                - Tebak kata berdasarkan hint yang muncul <br />- Setiap tebakan salah akan mengurangi 1 nyawa <br />- Player akan diberi 3 nyawa untuk setiap match <br />
                - Pemenang ditentukan berdasarkan player yang bertahan terakhir <br />- Tebak kata berdasarkan kata yang muncul
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn outline outline-primary text-primary hover:bg-primary hover:text-white border-none">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
}
