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
      <div className="container w-screen h-screen flex justify-center items-center">
        <div className="card bg-base-300 w-[32rem] shadow-xl">
          {/* <figure className="px-10 pt-10">
          <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" className="rounded-xl" />
        </figure> */}
          <div className="card-body items-center text-center gap-y-6">
            <h2 className="card-title">Find a Room and Play!</h2>
            <form className="w-full join">
              <input type="text" placeholder="Type here" className="input input-bordered join-item flex-grow focus:outline-none" />
              <button className="btn btn-primary join-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </form>
            <div className="flex flex-wrap gap-2 justify-center">
              <div className="">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <div className="card bg-base-300 w-full max-w-3xl shadow-xl overflow-hidden">
        <div className="card-body items-center text-center gap-y-6">
          <h2 className="card-title">Find a Room and Play!</h2>
          <form className="w-full flex">
            <input type="text" placeholder="Type here" className="input input-bordered flex-grow focus:outline-none" />
            <button className="btn btn-primary ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </form>
          <div className="w-full">
            <div className="overflow-x-auto w-full">
              {rooms.length > 0 ? (
                <table className="table w-full">
                  <thead>
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
                      <tr key={room.id} className="hover">
                        <td>{i + 1}</td>
                        <td>{room.name}</td>
                        <td>{room.playerCount}</td>
                        <td>{room.isFinished ? "Finished" : "Unfinished"}</td>
                        <td>
                          <button onClick={(e) => joinRoomHandler(e, room.id)} className="btn btn-outline btn-primary btn-sm">
                            Join
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center">Room not found, are you sure it exists?</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
