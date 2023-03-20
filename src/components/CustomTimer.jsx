import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaRegSmileWink } from "react-icons/fa";
import { Link } from "react-router-dom";

export const CustomTimer = ({ time, relaxTime }) => {
    const [minutes, setMinutes] = useState(time);
    const [focusTime, setFocusTime] = useState(0);
    const [timeFormated, setTimeFormated] = useState(`${minutes}:00`);
    const [isRunning, setIsRunning] = useState(false);

    const [seconds, setSeconds] = useState(59);

    function handleStartTimer() {
        setIsRunning(true);
    }

    function handleStopTimer() {
        setIsRunning(false);
    }

    function handleRestartTimer() {
        setIsRunning(false);
        setMinutes(time);
        setTimeFormated(`${time}:00`);
        setSeconds(59);
    }

    useEffect(() => {
        console.log("Clicado");
        let interval = null;

        if (!isRunning) return clearInterval(interval);

        interval = setInterval(() => {
            setSeconds((prevSec) => prevSec - 1);
            formatTimer();

            if (minutes <= 0) {
                setTimeFormated("00:00");
                setFocusTime(focusTime + time);
            }

            if (seconds <= 0) {
                setSeconds(59);
                setMinutes((prevTime) => prevTime - 1);
            }

            if (minutes == time) setMinutes((prevMinutes) => prevMinutes - 1);
        }, 100);
        return () => clearInterval(interval);
    }, [isRunning, minutes, seconds]);

    function formatTimer() {
        const minutesFormated = `${minutes < 10 ? `0${minutes}` : minutes}`;
        const secondsFormated = `${seconds < 10 ? `0${seconds}` : seconds}`;

        setTimeFormated(`${minutesFormated}:${secondsFormated}`);
    }

    return (
        <div className="text-center flex flex-col items-center justify-between h-screen py-5">
            <Link to="/" className="">
                <AiFillHome className="text-3xl opacity-20 hover:opacity-100 transition" />
            </Link>

            <div>
                <span className="mt-2 block italic text-slate-300">
                    {time}/{relaxTime}
                </span>

                <h1 className="text-center font-semibold text-4xl mt-4">
                    Timer: <br />{" "}
                    <span className="font-thin">{timeFormated}</span>
                </h1>

                {minutes != time && (
                    <button
                        className="bg-yellow-200 p-5 rounded-xl font-normal uppercase mt-5 hover:scale-105 hover:shadow-lg hover:shadow-gray-300 hover:bg-yellow-300 transition-all duration-300 active:bg-yellow-600 active:text-white w-40"
                        onClick={handleRestartTimer}
                    >
                        Restart Timer
                    </button>
                )}

                {minutes == time && (
                    <button
                        className="bg-green-200 p-5 rounded-xl font-normal uppercase mt-5 hover:scale-105 hover:shadow-lg hover:shadow-gray-300 hover:bg-green-300 transition-all duration-300 active:bg-green-600 active:text-white w-40"
                        onClick={handleStartTimer}
                    >
                        Start Timer
                    </button>
                )}

                {minutes != 0 && minutes != time && (
                    <button
                        className="bg-red-200 p-5 rounded-xl font-normal uppercase mt-5 hover:scale-105 hover:shadow-lg hover:shadow-gray-300 hover:bg-red-300 transition-all duration-300 active:bg-red-600 active:text-white w-40"
                        onClick={handleStopTimer}
                    >
                        Stop Timer
                    </button>
                )}

                {setMinutes === `${time}:00` && (
                    <p className="flex items-center justify-center gap-2 mt-3 text-lg">
                        Timeout! Let's relax. <FaRegSmileWink />
                    </p>
                )}
            </div>

            <span className="font-semibold text-lg">
                <span className="font-normal text-sm italic text-slate-300 mr-2">
                    Time in focus:
                </span>
                {focusTime} minutes
            </span>
        </div>
    );
};
