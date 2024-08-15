import { useEffect, useState } from "react";
import instance from "../config/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateRoom() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  async function createRoomHandler(e) {
    try {
      e.preventDefault();
      setLoading(true);
      const response = (
        await instance({
          method: "post",
          url: "/rooms",
          data: {
            username,
            name,
          },
        })
      ).data.data;
      toast.success("Room created successfully!");
      localStorage.setItem('username', username);
      navigate(`/rooms/${response.room.id}`);
    } catch (err) {
      console.log(err);
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-no-repeat transform scale-x-[-1] bg-[url('https://images.unsplash.com/photo-1605429201125-37e867327609?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"></div>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative flex justify-center items-center h-full px-4">
        <div className="card bg-base-300 bg-opacity-80 w-full max-w-4xl shadow-xl overflow-hidden">
          <div className="card-body items-center text-center gap-y-6">
            <h2 className="card-title text-3xl text-[#0B3D2E]">Create a Room and Play!</h2>

            <div className="w-full">
              <form onSubmit={createRoomHandler} className="space-y-4">
                <div>
                  <label htmlFor="name" className="label">
                    <span className="label-text">Room Name</span>
                  </label>
                  <input type="text" id="name" className="input input-bordered w-full" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter room name" required />
                </div>
                <div>
                  <label htmlFor="username" className="label">
                    <span className="label-text">Your Username</span>
                  </label>
                  <input type="text" id="username" className="input input-bordered w-full" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" required />
                </div>
                <div className="mt-6">
                  <button type="submit" className="btn bg-[#0B3D2E] text-white w-full" disabled={loading}>
                    {loading ? <span className="loading loading-spinner"></span> : "Create Room"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
