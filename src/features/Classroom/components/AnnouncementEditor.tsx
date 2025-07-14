import React, { useRef, useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  Plus,
  Upload,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { Send } from "lucide-react";

interface StoredAttachment {
  name: string;
  type: string;
  dataUrl: string;
}

const AnnouncementEditor = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [post, setPost] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<StoredAttachment[]>([]);
  const [comments, setComments] = useState<string[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedPost = localStorage.getItem("announcement_post");
    const storedAttachments = localStorage.getItem("announcement_attachments");
    const storedComments = localStorage.getItem("announcement_comments");

    if (storedPost) setPost(storedPost);
    if (storedAttachments) setAttachments(JSON.parse(storedAttachments));
    if (storedComments) setComments(JSON.parse(storedComments));
  }, []);

  const execCommand = (cmd: string) => {
    document.execCommand(cmd, false);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          setAttachments((prev) => [
            ...prev,
            {
              name: file.name,
              type: file.type,
              dataUrl,
            },
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handlePost = () => {
    if (contentRef.current) {
      const html = contentRef.current.innerHTML;
      setPost(html);
      localStorage.setItem("announcement_post", html);
      localStorage.setItem("announcement_attachments", JSON.stringify(attachments));
      localStorage.setItem("announcement_comments", JSON.stringify(comments));
      setIsExpanded(false);
    }
  };

  const handleCancel = () => {
    if (contentRef.current) contentRef.current.innerHTML = "";
    setIsExpanded(false);
  };

  const handleDelete = () => {
    setPost(null);
    setAttachments([]);
    setComments([]);
    setShowMenu(false);
    localStorage.removeItem("announcement_post");
    localStorage.removeItem("announcement_attachments");
    localStorage.removeItem("announcement_comments");
  };

  const handleCommentPost = () => {
    if (commentInput.trim()) {
      const updated = [...comments, commentInput.trim()];
      setComments(updated);
      localStorage.setItem("announcement_comments", JSON.stringify(updated));
      setCommentInput("");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden relative">
      {!isExpanded ? (
        <div
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setIsExpanded(true)}
        >
          <div className="flex items-center space-x-4">
            <div className="bg-purple-300 text-black text-lg rounded-full w-10 h-10 flex items-center justify-center font-semibold">
              P
            </div>
            <span className="text-sm text-gray-500">
              Announce something to your class
            </span>
          </div>
          <MoreVertical className="text-gray-500" />
        </div>
      ) : (
        <div className="p-4 space-y-4">
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <span>For</span>
            <div className="text-[#702DFF] border border-[#702DFF] px-3 py-1 rounded-full flex items-center gap-2">
              <img src="/Group (1).png" alt="" className="w-4 h-4" />
              All Students
            </div>
          </div>

          <div className="bg-gray-100 border border-gray-200 rounded-lg p-3">
            <div
              ref={contentRef}
              contentEditable
              className="w-full min-h-[120px] bg-gray-100 p-3 outline-none"
              data-placeholder="Announce something..."
              suppressContentEditableWarning            ></div>

            <div className="flex items-center gap-1 mt-2">
              <button onClick={() => execCommand("bold")} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Bold">
                <Bold size={16} />
              </button>
              <button onClick={() => execCommand("italic")} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Italic">
                <Italic size={16} />
              </button>
              <button onClick={() => execCommand("underline")} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Underline">
                <Underline size={16} />
              </button>
              <button onClick={() => execCommand("insertUnorderedList")} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Bullet List">
                <List size={16} />
              </button>
            </div>
          </div>

          <div className="flex space-x-4 items-center">
            <label className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer">
              <img src="/Group (2).png" alt="Upload file" />
              <input
                type="file"
                className="hidden"
                onChange={handleUpload}
                accept="image/*,application/pdf"
              />
            </label>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition" title="Add YouTube video">
              <img src="/mdi_youtube.png" alt="YouTube" />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition" title="Add item">
              <Plus size={20} className="text-gray-500" />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition" title="Add link">
              <img src="/material-symbols_link-rounded.png" alt="Link" />
            </button>
            <label className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer">
              <Upload size={20} className="text-gray-500" />
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleUpload}
                accept="image/*,application/pdf"
              />
            </label>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button onClick={handleCancel} className="text-gray-500 hover:underline">
              Cancel
            </button>
            <button
              onClick={handlePost}
              className="bg-[#702DFF] text-white px-4 py-2 rounded-md font-medium hover:bg-[#5d21cc]"
            >
              Post
            </button>
          </div>
        </div>
      )}

      {post && (
        <div className="p-4 border-t mt-4 relative">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-purple-300 text-black text-lg rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                P
              </div>
              <div>
                <p className="font-semibold">Mr. Hemish Morgan</p>
                <p className="text-xs text-gray-500">Just now</p>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-full hover:bg-gray-100"
                title="More options"
              >
                <MoreVertical className="text-gray-500" />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-1 w-36 bg-white border rounded shadow z-10">
                  <button
                    onClick={handleDelete}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <Trash2 size={16} /> Delete Post
                  </button>
                </div>
              )}
            </div>
          </div>

          <div
            className="prose max-w-none text-gray-800 mb-2"
            dangerouslySetInnerHTML={{ __html: post }}
          ></div>

          {attachments.map((file, idx) => {
            const isImage = file.type.startsWith("image/");
            return (
              <div
                key={idx}
                className="mt-2 flex items-center space-x-2 border p-2 rounded bg-gray-100 text-sm"
              >
                {isImage ? (
                  <img src={file.dataUrl} alt="attachment" className="w-10 h-10 object-cover rounded" />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded" />
                )}
                <span className="truncate">{file.name}</span>
              </div>
            );
          })}

          {/* Comments Section */}
          {comments.length > 0 && (
            <div className="mt-4 border-t pt-4 space-y-2 text-sm text-gray-800">
              <p className="font-semibold text-purple-700">{comments.length} Class comment{comments.length > 1 && "s"}</p>
              {comments.map((comment, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="bg-purple-300 text-black text-lg rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                    P
                  </div>
                  <div className="bg-gray-100 p-2 rounded-lg w-full">
                    <p className="font-semibold text-sm">Student</p>
                    <p className="text-gray-700">{comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* New Comment Input */}
          <div className="mt-4 flex items-start gap-3">
            <div className="bg-purple-300 text-black text-lg rounded-full w-8 h-8 flex items-center justify-center font-semibold">
              P
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add class comment..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>
            <button
              onClick={handleCommentPost}
              className="px-4 py-2"
              title="Post comment"
            >
             <img src="/Vector (4).png" alt="Send" />
            </button>
          </div>
        </div>
      )}
    </div>
  );};

export default AnnouncementEditor;
