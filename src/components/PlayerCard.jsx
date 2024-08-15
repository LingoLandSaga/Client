import { useContext, useEffect, useState } from 'react';
import Heart from '../components/Heart';
import { RoomContext } from '../pages/Room';
import axios from '../config/axios';
import { QuestionContext } from '../contexts/QuestionContext';
import { socket } from '../utils/socket';
import { useParams } from 'react-router-dom';
export default function PlayerCard({ player }) {
    const { question, setQuestion } = useContext(QuestionContext);
    const { roomId } = useParams();
    const { room, playing, setPlaying } = useContext(RoomContext);
    const [falseCount, setFalseCount] = useState(0);
    const [answer, setAnswer] = useState('');
    const [timer, setTimer] = useState(8);
    const arrHeart = Array.from({ length: player.lives });
    let changeTurn;
    const playingIndex = room.Players.findIndex(
        (val) => val.username === playing
    );

    if (playingIndex + 1 > room.Players.length - 1) {
        changeTurn = 0;
    } else {
        changeTurn = playingIndex + 1;
    }

    // useEffect(() => {
    //     let countdown;
    //     if (playing === localStorage.username) {
    //         countdown = setInterval(() => {
    //             setTimer((prevTimer) => {
    //                 if (prevTimer <= 1) {
    //                     clearInterval(countdown);
    //                     handleTimeOut();
    //                     return 0;
    //                 }
    //                 return prevTimer - 1;
    //             });
    //         }, 1000);
    //     }
    //     return () => clearInterval(countdown);
    // }, [playing]);

    // const handleTimeOut = () => {
    //     socket.emit('false-ans', {
    //         playerId: room.Players[playingIndex].id,
    //         roomId,
    //     });
    //     setPlaying(room.Players[changeTurn].username);
    //     socket.emit('change-turn', room.Players[changeTurn].username);
    //     socket.emit('change-question');
    //     setTimer(8);
    // };

    async function submitAnswer(e) {
        try {
            e.preventDefault();
            const { data } = await axios({
                method: 'post',
                url: '/check-word',
                data: {
                    question: question,
                    answer,
                },
            });

            setPlaying(room.Players[changeTurn].username);
            socket.emit('change-turn', room.Players[changeTurn].username);
            socket.emit('change-question');
            console.log(data);
        } catch (err) {
            socket.emit('false-ans', {
                playerId: room.Players[playingIndex].id,
                roomId,
            });
            if (falseCount === 1) {
                setPlaying(room.Players[changeTurn].username);
                socket.emit('change-turn', room.Players[changeTurn].username);
                socket.emit('change-question');
                setFalseCount(0);
                socket.emit('change-falseCount', 0);
            } else {
                setFalseCount((val) => val + 1);
                socket.emit('change-falseCount', falseCount + 1);
                setPlaying(room.Players[changeTurn].username);
                socket.emit('change-turn', room.Players[changeTurn].username);
            }
        } finally {
            setAnswer('');
            setTimer(8);
        }
    }

    useEffect(() => {
        if (socket) {
            socket.on('set-turn', (arg) => {
                setPlaying(arg);
            });
            socket.on('set-falseCount', (arg) => {
                setFalseCount(arg);
            });
        }
    }, [socket]);

    return (
        <>
            <div
                className={
                    'w-full text-white rounded p-5 text-2xl ' +
                    (playing === player.username
                        ? 'bg-primary '
                        : 'bg-[#0C1E1A]')
                }
            >
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
                                <input
                                    type="text"
                                    className="input input-bordered w-full text-black"
                                    onChange={(e) => setAnswer(e.target.value)}
                                />
                            </form>
                        ) : (
                            <input
                                type="text"
                                className="input input-bordered w-full text-black"
                                disabled
                            />
                        )
                    ) : (
                        <input
                            type="text"
                            className="input input-bordered w-full text-black"
                            disabled
                        />
                    )}
                </div>
            </div>
        </>
    );
}
