export const CustomTimerEditor = () => {
    return (
        <div className="text-center flex flex-col items-center px-6 bg-slate-200 rounded-lg py-3">
            <h3 className="text-center font-semibold mb-2 italic">
                Add Custom Timer
            </h3>

            <form className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <p className="flex flex-col text-sm">
                        Time to{" "}
                        <span className="uppercase font-bold text-base relative bottom-2">
                            focus
                        </span>
                    </p>
                    <input
                        type="text"
                        className=" rounded-lg px-2 py-1 text-center w-12 text-xl outline-none border-2 border-slate-300 hover:scale-[103%] transition"
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
                        type="text"
                        className=" rounded-lg px-2 py-1 text-center w-12 text-xl outline-none border-2 border-slate-300 hover:scale-[103%] transition"
                    />
                </div>
            </form>
        </div>
    );
};
