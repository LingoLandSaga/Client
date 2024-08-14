import { useEffect, useState } from "react";
import instance from "../config/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function JoinRoom() {
  const [rooms, setRooms] = useState([]);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  async function fetchRooms() {
    try {
      setLoading(true);
      const response = (
        await instance({
          method: "get",
          url: "/rooms",
        })
      ).data;

      setRooms(response);
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function joinRoomHandler(e, id) {
    try {
      e.preventDefault();
      await instance({
        method: "post",
        url: `/rooms/${id}/join`,
      });
      navigate(`/rooms/${id}`);
    } catch (err) {
      toast.error(err);
    }
  }

  useEffect(() => {
    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-no-repeat transform scale-x-[-1] bg-[url('https://images.unsplash.com/photo-1605429201125-37e867327609?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"></div>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="relative flex justify-center items-center h-full">
          <div className="card bg-base-300 bg-opacity-80 w-[32rem] shadow-xl">
            <div className="card-body items-center text-center gap-y-6">
              <h2 className="card-title text-3xl text-[#0B3D2E]">Find a Room and Play!</h2>
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-no-repeat transform scale-x-[-1] bg-[url('https://images.unsplash.com/photo-1605429201125-37e867327609?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"></div>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative flex justify-center items-center h-full px-4">
        <div className="card bg-base-300 bg-opacity-80 w-full max-w-4xl shadow-xl overflow-hidden">
          <div className="card-body items-center text-center gap-y-6">
            <h2 className="card-title text-3xl text-[#0B3D2E]">Find a Room and Play!</h2>
            <form className="w-full flex">
              <input type="text" placeholder="Type here" className="input input-bordered flex-grow focus:outline-none bg-opacity-70" />
              <button className="btn btn-primary ml-2 bg-[#0B3D2E] hover:bg-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </form>
            <div className="w-full">
              <div className="overflow-x-auto w-full h-96 overflow-y-auto">
                {rooms.length > 0 ? (
                  <table className="table w-full">
                    <thead className="sticky top-0 bg-base-300 bg-opacity-90">
                      <tr>
                        <th className="w-16 text-black">No</th>
                        <th className="w-1/3 text-black">Name</th>
                        <th className="w-1/4 text-black">Player Count</th>
                        <th className="w-1/4 text-black">Status</th>
                        <th className="w-1/6"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {rooms.map((room, i) => (
                        <tr key={room.id} className="hover:bg-base-200 hover:bg-opacity-70">
                          <td className="text-black">{i + 1}</td>
                          <td className="text-black">{room.name}</td>
                          <td className="text-black">{room.playerCount}</td>
                          <td className="text-black">{room.isFinished ? "Finished" : "Unfinished"}</td>
                          <td>
                            <button onClick={(e) => joinRoomHandler(e, room.id)} className="btn btn-outline btn-primary btn-sm bg-[#0B3D2E] hover:bg-primary text-white">
                              Join
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-center text-white">Room not found, are you sure it exists?</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
