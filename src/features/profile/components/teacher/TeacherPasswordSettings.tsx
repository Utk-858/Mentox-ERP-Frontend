// src/features/teacher-profile/components/TeacherPasswordSettings.tsx

import React, { useState } from 'react';
import PasswordInput from '../../components/ui/PasswordInput';

const TeacherPasswordSettings: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword || !currentPassword) {
      // In a real app, you would use a more elegant notification system
      alert("Please fill out all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    
    // In a real app, you would send this to your backend API
    console.log({
      currentPassword,
      newPassword,
    });

    alert("Password updated successfully! (Check the console for data)");
    
    // Clear the fields after submission
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    // Set a max-width to keep the form from stretching too wide on large screens
    <div className="max-w-md mx-auto md:mx-0"> 
      <form onSubmit={handleSubmit} className="space-y-6">
        <PasswordInput
          label="Current password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter your current password"
        />
        <PasswordInput
          label="New Password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />
        <PasswordInput
          label="Confirm Password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
        />
        <div className="pt-2">
          {/* In the design, this button looks different from Next/Save.
              It's part of the form itself, so we place it here. */}
          <button
            type="submit"
            className="bg-[#5F33C4] text-white font-medium capitalize rounded-lg px-8 py-3 transition-opacity hover:opacity-90"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherPasswordSettings;