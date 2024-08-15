import { createContext, useEffect, useState } from "react";
import PlayerCard from "../components/PlayerCard";
import { useParams } from "react-router-dom";
import axios from "../config/axios";
import { toast } from "react-toastify";
import { socket } from "../utils/socket";
import { QuestionContext } from "../contexts/QuestionContext";

export const RoomContext = createContext(null);

export default function Room() {
  const { roomId } = useParams();
  const [room, setRoom] = useState({});
  const [playing, setPlaying] = useState("");
  const [question, setQuestion] = useState("");
  async function getRoomDetail(roomId) {
    try {
      const { data } = await axios({
        method: "get",
        url: `/rooms/${roomId}`,
      });

      setRoom(data);
      setPlaying(data.Players[0].username);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on("set-question", (arg) => {
        setQuestion(arg);
      });
      socket.on("set-room", (arg) => {
        setRoom(arg);
      });
    }
  }, [socket]);

  useEffect(() => {
    getRoomDetail(roomId);
    socket.emit("start-game", roomId);
  }, []);
  return (
    <>
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-no-repeat transform scale-x-[-1] bg-[url('https://images.unsplash.com/photo-1605429201125-37e867327609?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"></div>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="relative h-full px-20 w-screen">
          <div className="flex flex-col w-full h-full justify-center py-16 gap-10">
            <div className="h-1/3 text-white w-full text-center flex items-center justify-center">
              <p className="text-6xl font-semibold text-white">{question}</p>
            </div>
            <div className="h-2/3 grid grid-cols-2 w-full gap-10 text-center">
              <QuestionContext.Provider value={{ question, setQuestion, getRoomDetail }}>
                <RoomContext.Provider
                  value={{
                    playing,
                    setPlaying,
                    room,
                    setRoom,
                  }}
                >
                  {Array.isArray(room.Players) && room.Players.map((player) => <PlayerCard key={player.id} player={player} />)}
                </RoomContext.Provider>
              </QuestionContext.Provider>
            </div>
          </div>
          <div className="text-white">1</div>
        </div>
      </div>
    </>
  );
}
