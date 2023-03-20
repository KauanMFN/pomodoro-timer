import { Link } from "react-router-dom";

export const CustomTypeComponent = ({ focusTime, relaxTime, index }) => {
    return (
        <Link to={`/type/custom/${index}`}>
            <button className="bg-slate-200 px-10 py-5 rounded-xl font-thin hover:shadow-md hover:shadow-gray-300 hover:scale-105 transition-all duration-300">
                <div>
                    <h3 className="text-xl font-normal mb-3">
                        Custom Type {index}
                    </h3>
                    <p className="">{focusTime} min in focus</p>
                    <p className="">{relaxTime} min in pause</p>
                </div>
            </button>
        </Link>
    );
};
