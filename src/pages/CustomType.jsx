import { CustomTimer } from "../components/CustomTimer";

export const CustomType = ({ time, relaxTime }) => {
    return (
        <div className="text-center">
            <CustomTimer time={time} relaxTime={relaxTime} />
        </div>
    );
};
