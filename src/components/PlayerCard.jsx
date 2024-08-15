import { useContext, useEffect, useState } from "react";
import Heart from "../components/Heart";
import { RoomContext } from "../pages/Room";
import axios from "../config/axios";
import { QuestionContext } from "../contexts/QuestionContext";
import { socket } from "../utils/socket";
import { useNavigate, useParams } from "react-router-dom";
export default function PlayerCard({ player }) {
  const { question, setQuestion } = useContext(QuestionContext);
  const { roomId } = useParams();
  const { room, playing, setPlaying } = useContext(RoomContext);
  const [falseCount, setFalseCount] = useState(0);
  const [answer, setAnswer] = useState("");
  //   const [timer, setTimer] = useState(8);
  const navigate = useNavigate();
  const arrHeart = Array.from({ length: player.lives });
  let changeTurn;
  const playingIndex = room.Players.findIndex((val) => val.username === playing);

  if (playingIndex + 1 > room.Players.length - 1) {
    changeTurn = 0;
  } else {
    changeTurn = playingIndex + 1;
  }

  //   useEffect(() => {
  //     let countdown;
  //     if (playing === localStorage.username) {
  //       countdown = setInterval(() => {
  //         setTimer((prevTimer) => {
  //           if (prevTimer <= 1) {
  //             clearInterval(countdown);
  //             handleTimeOut();
  //             return 0;
  //           }
  //           return prevTimer - 1;
  //         });
  //       }, 1000);
  //     }
  //     return () => clearInterval(countdown);
  //   }, [playing]);

  //   const handleTimeOut = () => {
  //     if (player.lives === 1) {
  //       socket.emit("player-lose", playing);
  //       console.log(`${playing} kalah`);
  //       document.getElementById("modal_lost").showModal();
  //     } else {
  //       socket.emit("false-ans", {
  //         playerId: room.Players[playingIndex].id,
  //         roomId,
  //       });
  //       if (falseCount === 1) {
  //         setPlaying(room.Players[changeTurn].username);
  //         socket.emit("change-turn", room.Players[changeTurn].username);
  //         socket.emit("change-question");
  //         setFalseCount(0);
  //         socket.emit("change-falseCount", 0);
  //       } else {
  //         setFalseCount((val) => val + 1);
  //         socket.emit("change-falseCount", falseCount + 1);
  //         setPlaying(room.Players[changeTurn].username);
  //         socket.emit("change-turn", room.Players[changeTurn].username);
  //       }
  //     }
  //     setTimer(8);
  //   };
  async function homeButtonHandler(e) {
    try {
      e.preventDefault();
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function submitAnswer(e) {
    try {
      e.preventDefault();
      const { data } = await axios({
        method: "post",
        url: "/check-word",
        data: {
          question: question,
          answer,
        },
      });

      setPlaying(room.Players[changeTurn].username);
      socket.emit("change-turn", { playerName: room.Players[changeTurn].username, roomId });
      socket.emit("change-question", roomId);
      console.log(data);
    } catch (err) {
      if (player.lives === 1) {
        socket.emit("player-lose", { playing, roomId });
        await axios({
          method: "put",
          url: `/rooms/${roomId}`,
        });
        console.log(`${playing} kalah`);
        document.getElementById("modal_lost").showModal();
      } else {
        socket.emit("false-ans", {
          playerId: room.Players[playingIndex].id,
          roomId,
        });
        if (falseCount === 1) {
          setPlaying(room.Players[changeTurn].username);
          socket.emit("change-turn", { playerName: room.Players[changeTurn].username, roomId });
          socket.emit("change-question", roomId);
          setFalseCount(0);
          socket.emit("change-falseCount", { falseCount: 0, roomId });
        } else {
          setFalseCount((val) => val + 1);
          socket.emit("change-falseCount", { falseCount: falseCount + 1, roomId });
          setPlaying(room.Players[changeTurn].username);
          socket.emit("change-turn", { playerName: room.Players[changeTurn].username, roomId });
        }
      }
    } finally {
      setAnswer("");
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on("set-turn", (arg) => {
        setPlaying(arg);
      });
      socket.on("set-falseCount", (arg) => {
        setFalseCount(arg);
      });
      socket.on("lose-notif", (arg) => {
        document.getElementById("modal_lost").showModal();
      });
    }
  }, [socket]);

  useEffect(() => {
    socket.emit("join-room", roomId);
  }, []);

  return (
    <>
      <div className={"w-full text-white rounded p-5 text-2xl " + (playing === player.username ? "bg-primary " : "bg-[#0C1E1A]")}>
        <div className="h-1/4 flex justify-between">
          <p className="font-semibold">{player.username}</p>
          <div className="flex">
            {arrHeart.map((_, i) => (
              <Heart key={i + 1} />
            ))}
          </div>
        </div>
        <div className="h-1/4"></div>
        <div className="h-2/4 flex flex-1 items-center">
          {playing === player.username ? (
            playing === localStorage.username ? (
              <form onSubmit={submitAnswer} className="w-full">
                <input type="text" className="input input-bordered w-full text-black" onChange={(e) => setAnswer(e.target.value)} />
              </form>
            ) : (
              <input type="text" className="input input-bordered w-full text-black" disabled />
            )
          ) : (
            <input type="text" className="input input-bordered w-full text-black" disabled />
          )}
        </div>
        <dialog id="modal_lost" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-black">SU SU SU SUPERNOVA</h3>
            <p className="py-4 text-black">{playing === localStorage.username ? "You lose!" : `Congratulations, you win the game!`}</p>
            <div className="modal-action">
              <form method="dialog">
                <button onClick={homeButtonHandler} className="btn outline outline-primary bg-primary hover:bg-green-700 text-white border-none">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}
