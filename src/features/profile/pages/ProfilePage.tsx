import React, { useState } from 'react';
import { HelpCircle, Upload } from 'lucide-react';

// Import all the necessary components
import PersonalDetails from '../components/student/PersonalDetails';
import AcademicInfo from '../components/student/AcademicInfo';
import AdditionalInfo from '../components/student/AdditionalInfo';
import PasswordSettings from '../components/student/PasswordSettings';
import EditProfileForm from '../components/student/EditProfileForm';
import ConfirmationModal from '../components/ui/ConfirmationModal'; // Corrected path
import type { UserProfileData } from '../types/user';

const initialUserData: UserProfileData = {
  dateOfBirth: new Date('2005-01-26'),
  gender: 'Male',
  bloodGroup: 'A+',
  nationality: 'Indian',
  email: 'alex.doe@example.com',
  mobile: '+91 9876543210',
  alternateMobile: 'N/A',
  fatherName: 'John Doe',
  fatherOccupation: 'Software Engineer',
  motherName: 'Jane Doe',
  motherOccupation: 'Doctor',
  guardianName: 'John Doe',
  fullAddress: '123, Knowledge Park, Innovation City, 110001',
};

type Tab = "Personal Details" | "Academic Info" | "Additional Info" | "Password";
const TABS: Tab[] = ["Personal Details", "Academic Info", "Additional Info", "Password"];

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(TABS[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userData, setUserData] = useState<UserProfileData>(initialUserData);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleSave = (newFormData: UserProfileData) => {
    setUserData(newFormData);
    setIsEditing(false);
    setShowSuccessModal(true);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderContent = (): React.ReactNode => {
    switch (activeTab) {
      case "Personal Details":
        return isEditing ? <EditProfileForm initialData={userData} onSave={handleSave} onCancel={() => setIsEditing(false)} /> : <PersonalDetails userData={userData} />;
      case "Academic Info":
        // In a real app, this would also have a view/edit state
        return <AcademicInfo />;
      case "Additional Info":
        return <AdditionalInfo />;
      case "Password":
        return <PasswordSettings />;
      default:
        return <PersonalDetails userData={userData} />;
    }
  };

  return (
    <>
      {showSuccessModal && <ConfirmationModal onClose={() => setShowSuccessModal(false)} />}
      
      <div className="bg-[#F5F5F7] p-3 md:p-6 rounded-[14px]">
        {/* --- HEADER UPDATED HERE --- */}
        <header className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6">
          <div className="w-20 h-20 sm:w-[82px] sm:h-[82px] rounded-full border-[5px] border-white shadow-md flex items-center justify-center overflow-hidden" style={{ backgroundColor: profileImage ? 'transparent' : '#E2D5FF' }}>
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-medium text-[#5F33C4]">AD</span>
            )}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Alex Doe</h2>
            <p className="text-sm sm:text-base text-gray-500">Admission Number: 23262</p>
          </div>

          <div className="flex items-center gap-4">
              <label
                htmlFor="student-photo-upload"
                className="bg-black text-white font-medium rounded-lg px-4 py-2 flex items-center justify-center gap-2 cursor-pointer transition-opacity hover:opacity-90"
              >
                <Upload size={16} />
                <span>Upload Photo</span>
              </label>
              <input
                id="student-photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              {/* The Edit Profile button only shows when not editing and on the personal details tab */}
              {activeTab === 'Personal Details' && !isEditing && (
                <button onClick={() => setIsEditing(true)} className="bg-[#5F33C4] text-white font-medium rounded-lg px-6 py-3 transition-opacity hover:opacity-90">
                  Edit Profile
                </button>
              )}
          </div>
        </header>

        <main className="bg-white rounded-[14px] p-6">
          <div className="bg-black rounded-lg p-1 flex items-center justify-start max-w-max mb-6 overflow-x-auto">
            {TABS.map((tab) => (
              <button key={tab} onClick={() => { setActiveTab(tab); setIsEditing(false); }} className={`whitespace-nowrap px-4 sm:px-6 py-2 rounded-md text-sm transition-colors ${activeTab === tab ? 'bg-[#5F33C4] text-white' : 'text-white hover:bg-gray-700'}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="py-4">
            {renderContent()}
          </div>
        </main>
      </div>
      <div className="flex gap-2 mt-6 text-sm">
        <HelpCircle className="h-5 w-5 text-gray-500" />
        <span className="text-black">Need help with your account settings?</span>
        <a href="#" className="text-[#5F33C4] font-medium hover:underline">Contact Support</a>
      </div>
    </>
  );
};

export default ProfilePage;