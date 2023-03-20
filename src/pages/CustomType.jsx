import { CustomTimer } from "../components/CustomTimer";
import { Timer } from "../components/Timer";

export const CustomType = ({ focusTime, relaxTime }) => {
    return (
        <div className="text-center">
            {/* <CustomTimer time={focusTime} relaxTime={relaxTime} /> */}
            <Timer time={focusTime} relaxTime={relaxTime} />
        </div>
    );
};
