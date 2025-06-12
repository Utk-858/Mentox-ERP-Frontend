import React, { useState, Suspense } from "react";
import { lazy } from "react";
const Thankyoupopup=lazy(()=>import("../components/createquiz/Thankyoupopup"))
const Sidebar = lazy(() => import("../../../components/Sidebar"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
const CreateQuizPage3 = lazy(() => import('../components/createquiz/Createquizpage3'));
const CreateQuizPage4 = lazy(() => import('../components/createquiz/Createquizpage4'));
// Lazy import of Step component
const CreateQuizPage2 = lazy(() => import('../components/createquiz/Createquizpage2'));
const CreateQuizPage1 = lazy(
  () => import("../components/createquiz/Createquizpage1")
);
const CreateQuiz: React.FC = () => {
  const [step, setStep] = useState(1);
    const [showThankYou, setShowThankYou] = useState(false);

  const renderMiddle = () => {
    switch (step) {
      case 1:
        return <CreateQuizPage1 />;
      case 2:
        return <CreateQuizPage2/>;
        case 3:
        return <CreateQuizPage3/>
         case 4:
        return <CreateQuizPage4/>
      default:
        return <CreateQuizPage1/>;
    }
  };

  return (
    <div className="w-full h-screen flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-full mt-4 flex flex-col">
        <div className="relative flex w-full justify-center z-10 text-center mt-4 mb-4">
            <Searchbar />
          </div>
        <div>
          <div className="flex flex-col p-8 rounded-xl shadow bg-[#F5F5F7] max-w-6xl mx-auto mt-10">
            {/* Top Heading */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                {/* <IoChevronBack className="text-2xl" /> */}
                <div>
                  <h1 className="text-[2rem] font-[600]">Create New Quiz</h1>
                  <p className="text-[1.5rem] font-[400] text-[#363636]">
                    Add questions, set answers and configure quiz settings
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="border border-[#000] bg-white px-4 py-2 rounded-[0.95rem] text-[1.25rem] font-[500] cursor-pointer">
                  Save Draft
                </button>
                {step === 4 && (
    <button className="px-6 py-2 bg-[#702DFF] rounded-[0.95rem] text-white text-[1.25rem] font-[500] cursor-pointer">
      Preview
    </button>
  )}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex gap-6">
              {/* Left Column */}
              

              {/* Middle Section */}
              <div className="w-full">
                <Suspense fallback={<div className="p-4">Loading...</div>}>
                  {renderMiddle()}
                </Suspense>
              </div>
            </div>

            {/* Bottom Buttons */}
<div className="mt-6 flex justify-end gap-6">
  <button
    onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
    className="border px-4 py-2 rounded-[0.8rem] bg-white text-[1.3rem] border-[#000]"
  >
    &lt; Prev
  </button>

  {step === 4 ? (
    <>
     <button
  className="px-4 py-2 bg-[#702DFF] text-white border border-[#000] rounded-[0.8rem] text-[1.3rem]"
  onClick={() => setShowThankYou(true)}
>
  Preview & Publish
</button>

      
    </>
  ) : (
    <button
      onClick={() => setStep((prev) => prev + 1)}
      className="bg-[#702DFF] text-white px-4 py-2 rounded-[0.8rem] text-[1.3rem]"
    >
      Next &gt;
    </button>
  )}
</div>

          </div>
        </div>
      </div>
      {showThankYou && <Thankyoupopup onClose={() => setShowThankYou(false)} />}

    </div>
  );
};

export default CreateQuiz;

