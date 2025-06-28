import React, { useState } from "react";
import App2 from "./App2";

// AnnouncementCard Component with comment functionality
const AnnouncementCard: React.FC<{
  sender: string;
  message: string;
  attachmentName?: string;
  initialComments?: { author: string; text: string }[];
}> = ({ sender, message, attachmentName, initialComments = [] }) => {
  const [comments, setComments] = useState(initialComments);
  const [commentInput, setCommentInput] = useState("");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInput.trim() === "") return;
    setComments([...comments, { author: "You", text: commentInput }]);
    setCommentInput("");
  };

  return (
    <div className="bg-white shadow rounded-xl p-5 mb-6">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold mr-3">
          {sender[0]}
        </div>
        <span className="font-medium text-gray-800">{sender}</span>
      </div>
      <div className="text-gray-800 whitespace-pre-line mb-4">{message}</div>
      {attachmentName && (
        <div className="flex items-center bg-gray-100 rounded px-3 py-2 mb-4 w-fit">
          <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828l7.586-7.586a4 4 0 00-5.656-5.656l-7.586 7.586a6 6 0 008.485 8.485l6.586-6.586" />
          </svg>
          <span className="text-sm text-blue-700 underline cursor-pointer">{attachmentName}</span>
        </div>
      )}
      <div className="border-t pt-4 mt-4">
        <div className="text-xs text-gray-500 mb-2">{comments.length} class comment{comments.length !== 1 && "s"}</div>
        {comments.map((c, i) => (
          <div key={i} className="flex items-center mb-1">
            <span className="font-medium text-gray-700 mr-2">{c.author}</span>
            <span className="text-gray-600">{c.text}</span>
          </div>
        ))}
        <form className="flex items-center mt-2" onSubmit={handleAddComment}>
          <input
            type="text"
            placeholder="Add a class comment..."
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 px-3 py-1 text-purple-600 font-medium rounded hover:bg-purple-100 transition"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

// QuizCard Component
const QuizCard: React.FC<{
  title: string;
  description: string;
  questions: number;
  time: string;
  startTime: string;
}> = ({ title, description, questions, time, startTime }) => (
  <div className="bg-white shadow rounded-xl p-5 flex flex-col md:flex-row items-center justify-between mt-6">
    <div>
      <div className="font-semibold text-base text-gray-800">{title}</div>
      <div className="text-sm text-gray-600 mb-1">{description}</div>
      <div className="text-xs text-gray-500">
        {questions} Questions &nbsp;•&nbsp; {time} &nbsp;•&nbsp; Start Time - {startTime}
      </div>
    </div>
    <button className="mt-4 md:mt-0 bg-purple-600 text-white px-6 py-2 rounded font-medium hover:bg-purple-700 transition text-sm">
      Attempt
    </button>
  </div>
);

// Main App Component
const announcementMessage = `Dear Students,

I have completed 8 experiments (only for the B1 batch, as there was a holiday on Thursday for the B2 batch).
Only two more experiments are remaining.
The quiz will be conducted sometime in the third week, close to April 25th. The syllabus will include everything covered before the quiz. I have completed 8 experiments (only for the B1 batch, as there was a holiday on Thursday for the B2 batch). Only two experiments are remaining. The quiz will be conducted sometime in the third week, close to April 25th. The syllabus will include everything covered prior to the quiz.

I have attached a note for trigonometric digits, but the coding part has already been completed in the lab (Ex 8 till length). (B1 batch)
I had also requested an online class to complete the same for B1 and B2, but have not received any reply regarding that.

Please prepare yourselves for the quiz and the end-term examination. We will inform you about the end-term dates once they are finalized.

Thanks and regards,
Hemish Morgan`;

const initialComments = [
  { author: "Mr. Hemish Morgan", text: "ok" },
];

const App1: React.FC = () => (
  <div className="bg-gray-100 py-4 px-3 rounded-2xl">
    <div className="w-full mx-auto">
      {/* Announcement input (mocked as per screenshot) */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 flex items-center">
        <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold mr-3">
          P
        </div>
        <input
          type="text"
          placeholder="Announce something to your class"
          className="w-full border-none bg-transparent focus:ring-0 text-gray-700"
        />
        <button className="ml-2 text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="19.5" cy="12" r="1.5" />
            <circle cx="4.5" cy="12" r="1.5" />
          </svg>
        </button>
      </div>

      {/* Announcement Cards */}
      <AnnouncementCard
        sender="Mr. Hemish Morgan"
        message={announcementMessage}
        attachmentName="javascript.pdf"
        initialComments={initialComments}
      />
      <AnnouncementCard
        sender="Mr. Hemish Morgan"
        message={announcementMessage}
        attachmentName="javascript.pdf"
        initialComments={initialComments}
      />


      <App2 />
    </div>
  </div>
);

export default App1;
