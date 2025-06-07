import '../../../../App.css'
const Thankyoupopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-start justify-center z-50 pt-24">
      <div className="bg-[#606060] p-8 rounded-xl w-96 text-center text-white shadow-xl transform transition-all duration-500 translate-y-[-50px] animate-slideDown">
        <h2 className="text-2xl font-bold mb-2">Thank You</h2>
        <p className="mb-6 text-lg">Quiz has been created!</p>
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-2 px-6 py-2 bg-white text-black font-medium rounded-full"
        >
          Back To Home
        </button>
      </div>
    </div>
  );
};

export default Thankyoupopup;
