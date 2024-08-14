import { useEffect, useState } from "react";
import instance from "../config/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateRoom() {
  const [options, setOptions] = useState([]);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  async function createRoomHandler() {
    try {
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
      ).data;
      toast.success("Room created successfully!");
      navigate(`rooms/${response.room.id}`);
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <div className="card bg-base-300 w-full max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6 text-center">Create a New Room</h2>
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
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : "Create Room"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
