

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/SidebarTeacher";
import axiosInstance from "@/api/axios";    

interface CourseData {
  title: string;
  subtitle: string;
  description: string;
  language: string;
  level: string;
  subcategory: string;
  primaryTopic: string;
  courseImage?: File | null;
  promoVideo?: File | null;
}

const initialFormData: CourseData = {
  title: "",
  subtitle: "",
  description: "",
  language: "",
  level: "",
  subcategory: "",
  primaryTopic: "",
  courseImage: null,
  promoVideo: null,
};

const CourseLandingPage: React.FC = () => {
  const [formData, setFormData] = useState<CourseData>(initialFormData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // setLoading(true);
        // const response = await axiosInstance.get("/api/course");
        // const data = response.data;

        // const {
        //   title,
        //   subtitle,
        //   description,
        //   language,
        //   level,
        //   subcategory,
        //   primaryTopic,
        // } = data;

        // setFormData((prev) => ({
        //   ...prev,
        //   title,
        //   subtitle,
        //   description,
        //   language,
        //   level,
        //   subcategory,
        //   primaryTopic,
        // }));
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [name]: file }));
  };
const handleSubmit = async () => {
  const payload = new FormData();

  for (const key in formData) {
    const value = formData[key as keyof CourseData];
    if (value instanceof File) {
      payload.append(key, value);
    } else if (typeof value === "string") {
      payload.append(key, value);
    }
  }

  try {
    setLoading(true);
    await axiosInstance.post("/lectures/create", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Course created successfully!");
  } catch (error) {
    console.error("Error creating course:", error);
    alert("Creation failed!");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mt-10 mx-auto bg-white p-8 rounded-md shadow border space-y-6 flex-1">
        <h1 className="text-2xl font-bold">Course landing page</h1>
        <p className="text-md text-gray-600">
          Your course landing page is crucial to your success on Mentox. If it’s
          done right, it can also help you gain visibility in search engines
          like Google. Learn more about{" "}
          <a href="#" className="text-purple-600 underline">
            course title standards
          </a>
          .
        </p>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-semibold mb-3">
            Course title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Eg: Define the role of course"
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>

        {/* Subtitle */}
        <div>
          <label htmlFor="subtitle" className="block font-semibold mb-3">
            Course subtitle
          </label>
          <input
            id="subtitle"
            name="subtitle"
            type="text"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="Eg: Define the role of course"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-semibold mb-3">
            Course description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Eg: Describe your course"
            className="w-full border border-gray-300 rounded-lg p-2"
            rows={4}
          />
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold mb-2">Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Select</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Select</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">Subcategory</label>
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Select</option>
              <option value="Web Dev">Web Dev</option>
              <option value="Data Science">Data Science</option>
            </select>
          </div>
        </div>

        {/* Primary topic */}
        <div>
          <label htmlFor="primaryTopic" className="block font-semibold mb-3">
            What is primarily taught in your course?
          </label>
          <input
            id="primaryTopic"
            name="primaryTopic"
            type="text"
            value={formData.primaryTopic}
            onChange={handleChange}
            placeholder="Eg: Python, React"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Course Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {/* Course Image Upload */}
          <div className="flex flex-col space-y-2">
            <label className="font-semibold text-md">Course Image</label>
            <div className="w-full aspect-video bg-gray-200 rounded" />
          </div>
          <div>
            <p className="text-sm text-gray-700 mb-2 mt-8">
              Upload your course image here. It must meet our{" "}
              <a href="#" className="text-purple-600 underline">
                course image quality standards
              </a>{" "}
              to be accepted. Important guidelines: 750x422 pixels; jpg, jpeg,
              gif, or png. no text on the image.
            </p>

            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={(e) =>
                  handleFileChange("courseImage", e.target.files?.[0] || null)
                }
                className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
              />
              <button className="bg-[#702DFF] text-white px-4 py-2 rounded hover:bg-purple-700 text-sm">
                Upload File
              </button>
            </div>
            {formData.courseImage && (
              <p className="text-xs text-gray-600 mt-1">
                Selected: {formData.courseImage.name}
              </p>
            )}
          </div>
        </div>

        {/* Spacer */}
        <div className="h-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Promo Video Preview Placeholder */}
          <div className="flex flex-col space-y-2">
            <label className="font-semibold text-md">Promotional video</label>
            <div className="w-full aspect-video bg-gray-200 rounded" />
          </div>

          <div>
            <p className="text-sm text-gray-700 mb-2 mt-8">
              Your promo video is a quick and compelling way for students to
              preview what they’ll learn in your course. Students considering
              your course are more likely to enroll if your promo video is
              well–made.{" "}
              <a href="#" className="text-purple-600 underline">
                Learn how to make your promo video awesome!
              </a>
            </p>

            <div className="flex items-center gap-2">
              <input
                type="file"
                placeholder="no file chosen"
                accept="video/*"
                onChange={(e) =>
                  handleFileChange("promoVideo", e.target.files?.[0] || null)
                }
                className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
              />
              <button className="bg-[#702DFF] text-white px-4 py-2 rounded hover:bg-purple-700 text-sm">
                Upload File
              </button>
            </div>
            {formData.promoVideo && (
              <p className="text-xs text-gray-600 mt-1">
                Selected: {formData.promoVideo.name}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default CourseLandingPage;
