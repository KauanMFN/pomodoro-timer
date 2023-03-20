import { useEffect, useState } from "react";
import { AiFillCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { MdTimer } from "react-icons/md";
import { Link } from "react-router-dom";
import { AddCustomTimer } from "../components/AddCustomTimer";
import { CustomTimerEditor } from "../components/CustomTimerEditor";
import { CustomTypeComponent } from "../components/CustomTypeComponent";

export const Home = () => {
    const [timerEditor, setTimerEditor] = useState(false);
    const [focusTime, setFocusTime] = useState([]);
    const [relaxTime, setRelaxTime] = useState([]);

    // const [customTimerInfo, setCustomTimerInfo] = useState([]);
    const [customTimer, setCustomTimer] = useState([]);

    const openCustomTimerEditor = () => {
        // setCustomTimer([]);

        if (!timerEditor) {
            setTimerEditor(true);
        } else {
            setTimerEditor(false);
        }

        // console.log("Clicado", timerEditor);
    };

    const handleAddCustomTimer = (e) => {
        e.preventDefault();

        setCustomTimer([...customTimer, { focusTime, relaxTime }]);
        localStorage.setItem("focusTime", focusTime);
        localStorage.setItem("relaxTime", relaxTime);

        openCustomTimerEditor();
        console.log("Clicado", customTimer);
    };

    useEffect(() => {
        const localStorageRelaxTime = localStorage.getItem("relaxTime");
        const localStorageFocusTime = localStorage.getItem("focusTime");

        setCustomTimer([
            ...customTimer,
            { localStorageFocusTime, localStorageRelaxTime },
        ]);
    }, []);

    return (
        <div>
            <h1 className="text-4xl font-semibold text-slate-800 flex items-center justify-center gap-2">
                Pomodoro Timer <MdTimer />
            </h1>

            <div className="flex gap-5 items-center justify-center mt-5">
                <Link to="/type1">
                    <button className="bg-slate-200 px-10 py-5 rounded-xl font-thin hover:shadow-md hover:shadow-gray-300 hover:scale-105 transition-all duration-300 ">
                        <div>
                            <h3 className="text-xl font-normal mb-3">Type 1</h3>
                            <p className="">50 min in focus</p>
                            <p className="">10 min in pause</p>
                        </div>
                    </button>
                </Link>

                <Link to="/type2">
                    <button className="bg-slate-200 px-10 py-5 rounded-xl font-thin hover:shadow-md hover:shadow-gray-300 hover:scale-105 transition-all duration-300">
                        <div>
                            <h3 className="text-xl font-normal mb-3">Type 2</h3>
                            <p className="">25 min in focus</p>
                            <p className="">5 min in pause</p>
                        </div>
                    </button>
                </Link>
            </div>

            <div>
                <h3 className="text-center mt-7 mb-4 pt-4 border-2 border-b-0 border-r-0 border-l-0 text-xl font-semibold">
                    Custom Timers
                </h3>

                <div className="flex gap-5 transition-all flex-wrap justify-center">
                    {customTimer &&
                        customTimer.map((timer, index) => (
                            <CustomTypeComponent
                                focusTime={timer.focusTime}
                                relaxTime={timer.relaxTime}
                                key={index}
                                index={index + 1}
                            />
                        ))}

                    {timerEditor == 1 ? (
                        <div className="text-center flex flex-col items-center px-6 bg-slate-200 rounded-lg py-3 relative h-fit">
                            <span
                                className="absolute top-0 right-0 text-2xl translate-x-1/3 -translate-y-1/3 bg-red-400 rounded-full p-1 text-white cursor-pointer hover:scale-105 transition"
                                onClick={openCustomTimerEditor}
                            >
                                <AiFillCloseCircle />
                            </span>

                            <h3 className="text-center font-semibold mb-2 italic">
                                Add Custom Timer
                            </h3>

                            <form
                                className="flex flex-col gap-2"
                                onSubmit={handleAddCustomTimer}
                            >
                                <div className="flex gap-2">
                                    <p className="flex flex-col text-sm">
                                        Time to{" "}
                                        <span className="uppercase font-bold text-base relative bottom-2">
                                            focus
                                        </span>
                                    </p>
                                    <input
                                        type="number"
                                        className=" rounded-lg px-2 py-1 text-center w-12 text-xl outline-none border-2 border-slate-300 hover:scale-[103%] transition"
                                        onChange={(e) =>
                                            setFocusTime([e.target.value])
                                        }
                                        required
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <p className="flex flex-col text-sm">
                                        Time to{" "}
                                        <span className="uppercase font-bold text-base relative bottom-2">
                                            relax
                                        </span>
                                    </p>
                                    <input
                                        type="number"
                                        className=" rounded-lg px-2 py-1 text-center w-12 text-xl outline-none border-2 border-slate-300 hover:scale-[103%] transition"
                                        onChange={(e) =>
                                            setRelaxTime([e.target.value])
                                        }
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-slate-400 text-white rounded-lg w-full py-1 hover:bg-slate-500 hover:scale-105 transition"
                                >
                                    Add Timer
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div onClick={openCustomTimerEditor} className="h-fit">
                            <AddCustomTimer />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
