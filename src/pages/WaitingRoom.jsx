import { useEffect, useState } from "react";
import instance from "../config/axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PlayerWaitingCard from "../components/PlayerWaitingCard";
import { socket } from "../utils/socket";

export default function WaitingRoom() {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      socket.emit("join-room", roomId);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onStartTheGame() {
      navigate(`/rooms/${roomId}`);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("start-the-game", onStartTheGame);

    if (socket.connected) {
      socket.emit("join-room", roomId);
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("start-the-game", onStartTheGame);
    };
  }, [roomId, navigate]);

  async function fetchPlayers() {
    try {
      setIsLoading(true);
      const response = await instance({
        method: "get",
        url: `/rooms/${roomId}`,
      });
      setPlayers(response.data.Players);
    } catch (error) {
      toast.error("Failed to fetch players.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleStartGame = (e) => {
    e.preventDefault();
    if (isConnected) {
      socket.emit("start-the-game", roomId, (error) => {
        if (error) {
          console.error("Error starting game:", error);
          toast.error("Failed to start the game.");
        } else {
          console.log("Game start event emitted successfully");
        }
      });
    } else {
      console.error("Socket not connected");
      toast.error("Not connected to server. Please try again.");
    }
  };
  if (isLoading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <>
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-no-repeat transform scale-x-[-1] bg-[url('https://images.unsplash.com/photo-1605429201125-37e867327609?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"></div>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="relative h-full px-20 w-screen">
          <div className="flex flex-col w-full h-full justify-center items-center py-16 gap-10">
            <div className="h-1/4 text-white w-full text-center flex items-center justify-center">
              <p className="text-6xl font-semibold text-white">Waiting for players to join...</p>
            </div>
            {players.length > 0 ? (
              <div className="h-2/4 grid grid-cols-2 w-3/4 gap-10 text-center">
                {players.map((player) => (
                  <PlayerWaitingCard key={player.id} userName={player.username} />
                ))}
              </div>
            ) : (
              <p className="text-white">No players have joined yet.</p>
            )}
            <div className="h-1/4">
              {players.length >= 2 && (
                <button onClick={handleStartGame} className="btn bg-primary text-white border-none hover:bg-[#0C1E1A] hover:outline hover:outline-1 hover:outline-white">
                  Start Game
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
