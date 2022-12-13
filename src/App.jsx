import { Link, Outlet } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

export const App = () => {
    return (
        <div className="font-ubuntu flex items-center justify-center h-screen text-slate-800">
            <Outlet />
        </div>
    );
};
