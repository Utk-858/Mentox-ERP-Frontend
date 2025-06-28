import React, { useState } from 'react';
import PasswordInput from '../../components/ui/PasswordInput';

const PasswordSettings: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      alert("Please fill out all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    console.log({ currentPassword, newPassword });
    alert("Password updated successfully! (Check the console for data)");
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <PasswordInput
          label="Current password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="******"
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
        <div className="pt-4">
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

export default PasswordSettings;