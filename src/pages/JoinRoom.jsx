import { useEffect, useState } from "react";
import instance from "../config/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function JoinRoom() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [search, setSearch] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  async function fetchRooms(e) {
    try {
      e?.preventDefault();
      setLoading(true);
      let options = "";
      if (search) {
        options = `?name=${search}`;
      }
      const response = (
        await instance({
          method: "get",
          url: `/rooms${options}`,
        })
      ).data;

      console.log(response);

      setRooms(response);
    } catch (err) {
      toast.error(err.message || "Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  }

  function openModalHandler(roomId) {
    setSelectedRoomId(roomId);
    document.getElementById("join-modal").showModal();
  }

  async function joinRoomHandler(e) {
    try {
      e.preventDefault();
      if (!selectedRoomId) {
        toast.error("No room selected");
        return;
      }
      await instance({
        method: "post",
        url: `/rooms/${selectedRoomId}/join`,
        data: {
          username,
        },
      });
      localStorage.setItem("username", username);
      navigate(`/rooms/${selectedRoomId}/wait`);
    } catch (error) {
      toast.error(error.message || "Failed to join room");
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
              <input type="text" placeholder="Type here" value={search} onChange={(e) => setSearch(e.target.value)} className="input input-bordered flex-grow focus:outline-none bg-opacity-70" />
              <button className="btn btn-primary border-none ml-2 bg-[#0B3D2E] hover:bg-primary" onClick={(e) => fetchRooms(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </form>
            <div className="w-full">
              <div className="overflow-x-auto w-full h-96 overflow-y-auto">
                {rooms.length > 0 ? (
                  <table className="table w-full">
                    <thead className="sticky top-0 bg-primary text-white">
                      <tr>
                        <th className="w-16">No</th>
                        <th className="w-1/3">Name</th>
                        <th className="w-1/4">Player Count</th>
                        <th className="w-1/4">Status</th>
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
                            <button onClick={() => openModalHandler(room.id)} className="btn btn-neutral outline-none border-none  btn-sm bg-primary hover:bg-[#0C1E1A] text-white">
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

      {/* Modal moved outside of the map function */}
      <dialog id="join-modal" className="modal">
        <div className="modal-box bg-base-200 p-6 max-w-sm mx-auto">
          <h3 className="font-bold text-2xl mb-4 text-primary">Join Room</h3>
          <p className="text-lg mb-4">Please input your name:</p>
          <form method="dialog" className="space-y-4">
            <input className="w-full input input-bordered focus:border-primary focus:outline-none" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Your name" />
            <div className="modal-action">
              <button onClick={joinRoomHandler} className="btn bg-primary text-white hover:bg-[#0C1E1A] w-full">
                Join Room
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
