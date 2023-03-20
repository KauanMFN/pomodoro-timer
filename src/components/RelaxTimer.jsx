import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaRegSmileWink } from "react-icons/fa";
import { Link } from "react-router-dom";

export const RelaxTimer = ({ focusTime, time }) => {
    const [minutes, setMinutes] = useState(time);
    const [timeFormated, setTimeFormated] = useState(
        `${minutes < 10 ? `0${minutes}` : minutes}:00`
    );
    const [isRunning, setIsRunning] = useState(true);
    const [seconds, setSeconds] = useState(59);

    useEffect(() => {
        let interval = null;

        if (!isRunning || timeFormated === "00:00")
            return clearInterval(interval);

        interval = setInterval(() => {
            setSeconds((prevSec) => prevSec - 1);
            formatTimer();

            localStorage.setItem("minutes", minutes);
            localStorage.setItem("seconds", seconds);

            if (minutes <= 0 && seconds <= 0) {
                setTimeFormated("00:00");
            }

            if (seconds <= 0) {
                setSeconds(59);
                setMinutes((prevTime) => prevTime - 1);
            }

            if (minutes == time) setMinutes((prevMinutes) => prevMinutes - 1);
        }, 10);

        return () => clearInterval(interval);
    }, [isRunning, minutes, seconds]);

    useEffect(() => {
        if (localStorage.length > 2 || localStorage.getItem(seconds) != null) {
            prevTime();
        }
    }, []);

    function prevTime() {
        const localStorageMinutes = localStorage.getItem("minutes");
        const localStorageSeconds = localStorage.getItem("seconds");

        const minutesFormated = `${
            localStorageMinutes < 10
                ? `0${localStorageMinutes}`
                : localStorageMinutes
        }`;
        const secondsFormated = `${
            localStorageSeconds < 10
                ? `0${localStorageSeconds}`
                : localStorageSeconds
        }`;

        setSeconds(localStorageSeconds);
        setMinutes(localStorageMinutes);
        setTimeFormated(`${minutesFormated}:${secondsFormated}`);
    }

    function formatTimer() {
        const minutesFormated = `${minutes < 10 ? `0${minutes}` : minutes}`;
        const secondsFormated = `${seconds < 10 ? `0${seconds}` : seconds}`;

        setTimeFormated(`${minutesFormated}:${secondsFormated}`);
    }

    return (
        <div className="text-center flex flex-col items-center justify-center h-screen py-5">
            <span className="mt-2 block italic text-slate-300">
                {focusTime}/{time}
            </span>

            <h1 className="text-center font-semibold text-4xl mt-4">
                Relax Timer: <br />{" "}
                <span className="font-thin">{timeFormated}</span>
            </h1>

            <div>
                {!isRunning && (
                    <button
                        className="bg-green-200 p-5 rounded-xl font-normal uppercase mt-5 hover:scale-105 hover:shadow-lg hover:shadow-gray-300 hover:bg-green-300 transition-all duration-300 active:bg-green-600 active:text-white w-40"
                        onClick={handleStartTimer}
                    >
                        Start Relax Timer
                    </button>
                )}

                {isRunning && timeFormated != "00:00" && (
                    <button
                        className="bg-red-200 p-5 rounded-xl font-normal uppercase mt-5 hover:scale-105 hover:shadow-lg hover:shadow-gray-300 hover:bg-red-300 transition-all duration-300 active:bg-red-600 active:text-white w-40"
                        onClick={handleStopTimer}
                    >
                        Stop Relax Timer
                    </button>
                )}

                {!isRunning && (
                    <button
                        className="bg-red-200 p-5 rounded-xl font-normal uppercase mt-5 hover:scale-105 hover:shadow-lg hover:shadow-gray-300 hover:bg-red-300 transition-all duration-300 active:bg-red-600 active:text-white w-40"
                        onClick={ChangeToFocusTimer(false)}
                    >
                        Start Focus Timer
                    </button>
                )}
            </div>
            {timeFormated === "00:00" && (
                <p className="flex items-center justify-center gap-2 mt-3 text-lg">
                    Timeout! Let's return to Focus. <FaRegSmileWink />
                </p>
            )}
        </div>
    );
};
