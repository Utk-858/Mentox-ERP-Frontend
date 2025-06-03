
// import { BsArrowRight } from "react-icons/bs";
import { FaRegCirclePlay } from "react-icons/fa6";

const MentoxBanner = () => {
  return (
    <div className="w-[19rem] bg-[#702DFF] h-[6.5rem] flex flex-col rounded-[0.7rem] p-2 gap-2">
        <div className="text-[0.5rem] font-[400] text-white">
            YOUR PERSONALISED LEARNING PARTNER
        </div>
        <div className="text-[0.9rem] font-[600] text-white w-[12rem]">
            Unlock your full potential
            with Mentox AI Tutor
        </div>
        <button className="bg-black h-[1.3rem] w-[6rem] rounded-[1.5rem] font-[500] text-[0.5rem] text-white flex gap-2 p-0.5 cursor-pointer">
            Discover AI learning <span className="mt-0.5"><FaRegCirclePlay/></span>
        </button>

    </div>
  );
};

export default MentoxBanner;
