import { AiOutlinePlus } from "react-icons/ai";

export const AddCustomTimer = () => {
    return (
        <div className="bg-slate-100 w-[190px] h-[128px] rounded-lg flex items-center justify-center border-dotted border-slate-200 border-4 cursor-pointer hover:scale-105 transition">
            <AiOutlinePlus className="text-slate-400" />
        </div>
    );
};
