import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaRegSmileWink } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RelaxTimer } from "./RelaxTimer";

export const Timer = ({ time, relaxTime }) => {
    const [minutes, setMinutes] = useState(time);
    const [timeInFocus, setTimeInFocus] = useState(0);
    const [timeFormated, setTimeFormated] = useState(
        `${minutes < 10 ? `0${minutes}` : minutes}:00`
    );
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(59);

    const [relaxTimer, setRelaxTimer] = useState(false);

    function handleStartRelaxTimer() {
        setRelaxTimer(!relaxTimer);
        setSeconds(0);
        setMinutes(relaxTime);

        handleStartTimer();
    }

    function handleStartTimer() {
        setIsRunning(true);
    }

    function handleStopTimer() {
        setIsRunning(false);
    }

    function handleRestartTimer() {
        const timeFormated = `${time < 10 ? `0${time}` : time}`;

        setIsRunning(false);
        setMinutes(time);
        setTimeFormated(`${timeFormated}:00`);
        setSeconds(59);

        localStorage.setItem("minutes", time);
        localStorage.removeItem("seconds");
    }

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
                if (relaxTimer === false) {
                    setTimeInFocus(timeInFocus + time);
                    localStorage.setItem("focusTime", timeInFocus + time);
                }
            }

            if (seconds <= 0) {
                setSeconds(59);
                setMinutes((prevTime) => prevTime - 1);
            }

            if (minutes == time) setMinutes((prevMinutes) => prevMinutes - 1);
        }, 1);

        return () => clearInterval(interval);
    }, [isRunning, minutes, seconds]);

    useEffect(() => {
        if (localStorage.length > 2 || localStorage.getItem(seconds) != null) {
            prevTime();
        }

        const localStorageFocusTime = localStorage.getItem("focusTime");
        setTimeInFocus(Number(localStorageFocusTime));
    }, []);

    // useEffect(() => {
    //     console.log(relaxTimer);
    // }, [relaxTimer]);

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

                <div className="flex justify-center gap-2">
                    {minutes != time && relaxTimer === false && (
                        <button
                            className="bg-yellow-200 p-5 rounded-xl font-normal uppercase mt-5 hover:scale-105 hover:shadow-lg hover:shadow-gray-300 hover:bg-yellow-300 transition-all duration-300 active:bg-yellow-600 active:text-white w-40"
                            onClick={handleRestartTimer}
                        >
                            Restart Timer
                        </button>
                    )}

                    {!isRunning &&
                        timeFormated != "00:00" &&
                        relaxTimer === false && (
                            <button
                                className="bg-green-200 p-5 rounded-xl font-normal uppercase mt-5 hover:scale-105 hover:shadow-lg hover:shadow-gray-300 hover:bg-green-300 transition-all duration-300 active:bg-green-600 active:text-white w-40"
                                onClick={handleStartTimer}
                            >
                                Start Timer
                            </button>
                        )}

                    {isRunning &&
                        timeFormated != "00:00" &&
                        relaxTimer === false && (
                            <button
                                className="bg-red-200 p-5 rounded-xl font-normal uppercase mt-5 hover:scale-105 hover:shadow-lg hover:shadow-gray-300 hover:bg-red-300 transition-all duration-300 active:bg-red-600 active:text-white w-40"
                                onClick={handleStopTimer}
                            >
                                Stop Timer
                            </button>
                        )}

                    {timeFormated === "00:00" && relaxTimer === false && (
                        <button
                            className="bg-blue-200 p-5 rounded-xl font-normal uppercase mt-5 hover:scale-105 hover:shadow-lg hover:shadow-gray-300 hover:bg-blue-300 transition-all duration-300 active:bg-blue-600 active:text-white w-40"
                            onClick={handleStartRelaxTimer}
                        >
                            Start Relax Timer
                        </button>
                    )}

                    {timeFormated === "00:00" && relaxTimer === true && (
                        <button
                            className="bg-blue-200 p-5 rounded-xl font-normal uppercase mt-5 hover:scale-105 hover:shadow-lg hover:shadow-gray-300 hover:bg-blue-300 transition-all duration-300 active:bg-blue-600 active:text-white w-40"
                            onClick={handleStartRelaxTimer}
                        >
                            Start Focus Timer
                        </button>
                    )}
                </div>

                {timeFormated === "00:00" && relaxTimer === false && (
                    <p className="flex items-center justify-center gap-2 mt-3 text-lg">
                        Timeout! Let's relax. <FaRegSmileWink />
                    </p>
                )}

                {timeFormated === "00:00" && relaxTimer === true && (
                    <p className="flex items-center justify-center gap-2 mt-3 text-lg">
                        Timeout! Let's return to focus. <FaRegSmileWink />
                    </p>
                )}
            </div>

            <span className="font-semibold text-lg">
                <span className="font-normal text-sm italic text-slate-300 mr-2">
                    Time in focus:
                </span>
                {timeInFocus} minutes
                <button
                    className="text-sm font-normal px-2 py-1 scale-75 text-red-400"
                    onClick={() => {
                        setTimeInFocus(0);
                        localStorage.setItem("focusTime", 0);
                    }}
                >
                    Reset
                </button>
            </span>
        </div>
    );
};
