import { FaMedal } from 'react-icons/fa';

export default function ScholarshipsCard() {
  return (
    <div className="flex-1 border border-[#6B3DFE] rounded-lg overflow-hidden shadow-sm max-w-[440px]">
      {/* Background image container */}
      <div className="relative h-[200px]">
        {/* Background image */}
        <img
          src="/test8.png"
          alt=""
          className="w-full h-full object-cover"
        />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-center p-5">
          <div className="flex items-center gap-2 mb-1">
            <FaMedal className="w-5 h-5 text-white" />
            <h2 className="text-white text-lg font-semibold">
              Scholarships & Discounts
            </h2>
          </div>
          <p className="text-sm text-white/80 leading-snug ">
            View your available scholarships, applied discounts, and Scholarship Programs.
          </p>

          <button className="mt-9 w-full bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition">
            View Scholarships →
          </button>
        </div>
      </div>
    </div>
  );
}
