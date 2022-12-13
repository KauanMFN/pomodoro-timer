import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaRegSmileWink } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Timer = ({ time, relaxTime }) => {
    const [timeFormated, setTimeFormated] = useState("00:00");
    let [focusTime, setFocusTime] = useState(0);

    let seconds = 1;
    let minutes = 0;

    function startTimer({ start = 1 }) {
        console.log("Clicado");

        if (start == 1) {
            setInterval(() => {
                if (minutes <= time - 1 && seconds <= 59) {
                    timerFormated();
                    seconds++;
                    console.log(minutes);

                    if (seconds % 60 == 0) {
                        minutes++;
                        seconds = 0;
                    }

                    if (minutes == time) {
                        setTimeout(() => {
                            setTimeFormated(`${time}:00`);
                            setFocusTime(focusTime + time);
                        }, 1000);
                    }
                }
            }, 1000);

            function timerFormated() {
                if (seconds <= 9 && minutes <= 9) {
                    setTimeFormated(`0${minutes}:0${seconds}`);
                } else if (seconds >= 10 && minutes <= 9) {
                    setTimeFormated(`0${minutes}:${seconds}`);
                } else if (minutes >= 10 && seconds >= 10) {
                    setTimeFormated(`${minutes}:${seconds}`);
                } else {
                    setTimeFormated(`${minutes}:0${seconds}`);
                }
            }
        }
    }

    function stopTimer() {
        startTimer(0);
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

                {timeFormated === `${time}:00` && (
                    <button
                        className="bg-yellow-200 p-5 rounded-xl font-normal uppercase mt-5 hover:scale-105 hover:shadow-lg hover:shadow-gray-300 hover:bg-yellow-300 transition-all duration-300 active:bg-yellow-600 active:text-white w-40"
                        onClick={startTimer}
                    >
                        Restart Timer
                    </button>
                )}

                {timeFormated === "00:00" && (
                    <button
                        className="bg-green-200 p-5 rounded-xl font-normal uppercase mt-5 hover:scale-105 hover:shadow-lg hover:shadow-gray-300 hover:bg-green-300 transition-all duration-300 active:bg-green-600 active:text-white w-40"
                        onClick={startTimer}
                    >
                        Start Timer
                    </button>
                )}

                {timeFormated != `${time}:00` && timeFormated != "00:00" && (
                    <button
                        className="bg-red-200 p-5 rounded-xl font-normal uppercase mt-5 hover:scale-105 hover:shadow-lg hover:shadow-gray-300 hover:bg-red-300 transition-all duration-300 active:bg-red-600 active:text-white w-40"
                        onClick={stopTimer}
                    >
                        Stop Timer
                    </button>
                )}

                {/* {timeFormated === `${time}:00` ? (
                    <button
                        className="bg-slate-200 p-5 rounded-xl font-normal uppercase mt-5 hover:scale-105 hover:shadow-lg hover:shadow-gray-300 hover:bg-slate-300 transition-all duration-300 active:bg-slate-600 active:text-white"
                        onClick={startTimer}
                    >
                        Restart Timer
                    </button>
                ) : (
                    <button
                        className="bg-slate-200 p-5 rounded-xl font-normal uppercase mt-5 hover:scale-105 hover:shadow-lg hover:shadow-gray-300 hover:bg-slate-300 transition-all duration-300 active:bg-slate-600 active:text-white"
                        onClick={startTimer}
                    >
                        Start Timer
                    </button>
                )} */}

                {/* {timeFormated != `${time}:00` && seconds > 1 && (
                    <button
                        className="bg-slate-200 p-5 rounded-xl font-normal uppercase mt-5 hover:scale-105 hover:shadow-lg hover:shadow-gray-300 hover:bg-slate-300 transition-all duration-300 active:bg-slate-600 active:text-white"
                        onClick={stopTimer}
                    >
                        Stop Timer
                    </button>
                )} */}

                {timeFormated === `${time}:00` && (
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
