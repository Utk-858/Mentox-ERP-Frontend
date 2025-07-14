import React from 'react'
import {
  Users,
  BookOpen,
  Calendar,
  Languages,
  HelpCircle,
  BarChart,
  Heart,
  Share2,
} from "lucide-react";
import { NavLink } from 'react-router-dom';

const Container = () => {
  return (
    <div className='flex flex-row w-full justify-center'>
         <div className="max-w-5xl">
        <nav className="text-sm text-gray-400 mb-2">Home / All Courses</nav>
        <div className="flex flex-col md:flex-row md:items-start gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">
              Create an LMS Website with LearnPress
            </h1>
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-2 gap-2">
              <span>by KenyWhite</span>
              <span>in Business, IT & Software,</span>
              <span className="text-purple-600">Technology</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-purple-600 font-bold">4.8</span>
              <span className="text-yellow-400">★ ★ ★ ★ ★</span>
              <span className="text-gray-400">(280)</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">Last updated: Sep 12, 2024</span>
            </div>
            {/* Overview */}
            <h2 className="font-semibold mb-1">Overview</h2>
            <p className="text-gray-600 mb-4">
              A series of videos from ThimPress, give you a detailed tutorial to
              create an LMS Website with LearnPress – LMS & Education WordPress
              Plugin.
              <br />
              <br />
              This course is a detailed and easy tutorial to get you all setup
              and going with the use of LearnPress LMS Plugin. It is a free and
              simple plugin to help you create an Online Course Website right
              for cheap. This course walks you through the main features of the
              plugin like Creation of Courses, Lessons, Quizzes, and finally
              shows you how to boost up your Website with Premium LearnPress
              Add-ons and other WordPress plugins (Creator of LearnPress).
              <br />
              The course additional lessons take the course layouts and featured
              images.
            </p>
          
          </div>
          {/* Sidebar */}
          <aside className="w-full md:w-72 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
                alt="Course"
                className="rounded-lg mb-4 object-cover w-full h-32"
              />
              <ul className="text-gray-600 text-sm mb-4 space-y-2">
  <li className="flex items-center gap-2">
    <Users size={16} className="text-purple-600" />
    1,200 Students
  </li>
  <li className="flex items-center gap-2">
    <BookOpen size={16} className="text-purple-600" />
    8 Lessons
  </li>
  <li className="flex items-center gap-2">
    <Calendar size={16} className="text-purple-600" />
    3 weeks
  </li>
  <li className="flex items-center gap-2">
    <Languages size={16} className="text-purple-600" />
    Language: English
  </li>
  <li className="flex items-center gap-2">
    <HelpCircle size={16} className="text-purple-600" />
    1 Quiz
  </li>
  <li className="flex items-center gap-2">
    <BarChart size={16} className="text-purple-600" />
    All levels
  </li>
</ul>
              <NavLink to="/Lectures/side">
              <button className="w-full bg-purple-600 text-white py-2 cursor-pointer rounded font-semibold hover:bg-purple-700 transition mb-2">
                Start Learning
              </button>
              </NavLink>
              <div className="flex justify-between text-sm text-gray-500">
                <button className="hover:text-purple-600">♡ Wishlist</button>
                <button className="flex items-center gap-1 hover:text-purple-600">
    <Share2 size={14} /> Share
  </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Container