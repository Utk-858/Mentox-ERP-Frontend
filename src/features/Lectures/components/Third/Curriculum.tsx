import React, { useState } from 'react'

const curriculumData = [
  {
    section: "This is lesson title – open",
    open: true,
    lessons: [
      {
        title: "Lesson title – not purchased course",
        duration: "30 minutes",
        locked: true,
        active: false,
      },
      {
        title: "Quiz title – purchased course/lock",
        duration: "30 minutes",
        locked: true,
        active: false,
      },
      {
        title: "LMS Website and LearnPress Introduction – Active",
        duration: "30 minutes",
        locked: false,
        active: true,
      },
      {
        title: "Lesson title – not purchased course",
        duration: "30 minutes",
        locked: true,
        active: false,
      },
    ],
  },
  {
    section: "This is lesson title – Close",
    open: false,
    lessons: [
      {
        title: "Lesson title",
        duration: "30 minutes",
        locked: false,
        active: false,
      },
    ],
  },
  {
    section: "This is lesson title – Close",
    open: false,
    lessons: [
      {
        title: "Lesson title",
        duration: "30 minutes",
        locked: false,
        active: false,
      },
    ],
  },
  {
    section: "This is lesson title – Close",
    open: false,
    lessons: [
      {
        title: "Lesson title",
        duration: "30 minutes",
        locked: false,
        active: false,
      },
    ],
  },
];
const Curriculum = () => {
     const [openSections, setOpenSections] = useState(
    curriculumData.map((section) => section.open)
  );

  const toggleSection = (idx: number) => {
    setOpenSections((openSections) =>
      openSections.map((open, i) => (i === idx ? !open : open))
    );
  };

  const expandAll = () => setOpenSections(openSections.map(() => true));

  return (

    <>
     <div className="text-3xl max-w-5xl w-full font-bold">Curriculum</div>
          <div className="max-w-5xl w-full mt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="text-gray-700 text-sm">
                15 sections · 51 lectures · 5hr 30mins
              </div>
              <button
                className="text-purple-600 text-sm font-semibold hover:underline"
                onClick={expandAll}
              >
                Expand All Sections
              </button>
            </div>
            <div className="bg-white rounded-lg shadow divide-y divide-gray-100">
              {curriculumData.map((section, idx) => (
                <div key={idx}>
                  <button
                    className="w-full flex justify-between items-center px-4 py-3 text-left font-semibold bg-gray-100 hover:bg-gray-200 transition"
                    onClick={() => toggleSection(idx)}
                  >
                    <span>{section.section}</span>
                    <span>{openSections[idx] ? "▲" : "▼"}</span>
                  </button>
                  {openSections[idx] && (
                    <div className="px-6 py-2 bg-gray-50">
                      {section.lessons.map((lesson, lidx) => (
                        <div
                          key={lidx}
                          className={`flex items-center justify-between py-1 ${
                            lesson.active
                              ? "text-purple-600 font-semibold underline"
                              : lesson.locked
                              ? "text-gray-400"
                              : "text-gray-700"
                          }`}
                        >
                          <span>{lesson.title}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs">{lesson.duration}</span>
                            {lesson.locked && (
                              <svg
                                width="16"
                                height="16"
                                fill="none"
                                className="text-gray-400"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M17 11V7a5 5 0 00-10 0v4"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <rect
                                  x="5"
                                  y="11"
                                  width="14"
                                  height="10"
                                  rx="2"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </>
  )
}

export default Curriculum