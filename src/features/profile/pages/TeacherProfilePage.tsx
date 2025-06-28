import React, { useState } from 'react';
import type { TeacherProfileData } from '../types/teacher';
import { SkipBack, SkipForward, Upload,HelpCircle } from 'lucide-react';

// Import all form components
import TeacherPersonalDetailsForm from '../components/teacher/TeacherPersonalDetailsForm';
import TeacherEducationForm from '../components/teacher/TeacherEducationForm';
import TeacherDocumentsForm from '../components/teacher/TeacherDocumentsForm';
import TeacherBankingForm from '../components/teacher/TeacherBankingForm';
import TeacherTeachingForm from '../components/teacher/TeacherTeachingForm';
import TeacherPasswordSettings from '../components/teacher/TeacherPasswordSettings';

// Import all view components
import ViewPersonalDetails from '../components/teacher/ViewPersonalDetails';
import ViewEducationDetails from '../components/teacher/ViewEducationDetails';
import ViewDocumentsDetails from '../components/teacher/ViewDocumentsDetails';
import ViewBankingDetails from '../components/teacher/ViewBankingDetails';
import ViewTeachingDetails from '../components/teacher/ViewTeachingDetails';
import RequestPermissionModal from '../components/teacher/RequestPermissionModal';

// --- IMPORT THE CONFIRMATION MODAL ---
import ConfirmationModal from '../components/ui/ConfirmationModal';


type ProfileTab = "Personal Details" | "Education" | "Documents" | "Banking" | "Teaching Details" | "Password";
const TABS: ProfileTab[] = ["Personal Details", "Education", "Documents", "Banking", "Teaching Details", "Password"];

const initialTeacherData: TeacherProfileData = {
  personalDetails: { dateOfBirth: new Date('1985-05-20'), gender: 'Male', bloodGroup: 'A+', nationality: 'Indian', email: 'alex.doe@example.com', mobile: '+91 98765 43210', alternateMobile: '', maritalStatus: 'Married', religion: 'Hindu', fatherName: 'Richard Doe', fatherMobile: '+91 98765 43211', fatherOccupation: 'Engineer', motherName: 'Mary Doe', motherMobile: '+91 98765 43212', motherOccupation: 'Homemaker', spouseName: 'Anna Doe', spouseMobile: '+91 98765 43213', spouseOccupation: 'Architect', currentAddress: { line1: '123, Knowledge Park', line2: 'Innovation City', city: 'Metropolis', state: 'State', country: 'India', pincode: '110001' }, permanentAddress: { line1: '', line2: '', city: '', state: '', country: '', pincode: '' }, isPermanentSameAsCurrent: true, },
  educationDetails: { highestQualification: 'Post-Graduate', university: 'Tech University', yearOfPassing: '2010', percentage: '8.82 CGPA', specialization: 'Artificial Intelligence', additionalDegrees: 'M.Tech, PhD', professionalQualifications: 'B.Ed', researchQualifications: 'Ph.D.', certificateFile: null, certificateUrl: '#', },
  documentDetails: { aadhaarNumber: 'XXXX-XXXX-8754', aadhaarFile: null, aadhaarUrl: '#', panNumber: 'ABCDE1234F', panFile: null, panUrl: '#' },
  bankingDetails: { bankName: 'HDFC Bank', bankBranch: 'Delhi Main Branch', accountNumber: '************5678', accountHolderName: 'Alex Doe', ifscCode: 'HDFC0001234', accountType: 'Savings', pfNumber: 'PF7890123', pfUanNumber: 'UAN9876543' },
  teachingDetails: { department: 'Computer Science', designation: 'Professor', employmentType: 'Permanent', joiningDate: new Date('2012-08-15'), subjects: 'Computer Networks, AI, Machine Learning', classes: '11-A, 12-B, 12-C', }
};

const TeacherProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>(TABS[0]);
  const [teacherData, setTeacherData] = useState<TeacherProfileData>(initialTeacherData);
  const [isEditing, setIsEditing] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
  
  const handlePermissionSubmit = (reason: string) => {
    console.log("Permission requested for reason:", reason);
    setShowPermissionModal(false);
    alert("Permission request submitted. For this demo, editing will be enabled now.");
    setIsEditing(true);
  };

  const renderActiveTab = () => {
    if (!isEditing) {
      switch (activeTab) {
        case 'Personal Details': return <ViewPersonalDetails data={teacherData.personalDetails} />;
        case 'Education': return <ViewEducationDetails data={teacherData.educationDetails} />;
        case 'Documents': return <ViewDocumentsDetails data={teacherData.documentDetails} />;
        case 'Banking': return <ViewBankingDetails data={teacherData.bankingDetails} />;
        case 'Teaching Details': return <ViewTeachingDetails data={teacherData.teachingDetails} />;
        case 'Password': return <div className="p-8 text-center text-gray-500">To change your password, please request permission to edit.</div>;
        default: return null;
      }
    }

    switch (activeTab) {
      case 'Personal Details': return <TeacherPersonalDetailsForm formData={teacherData.personalDetails} setFormData={(data) => setTeacherData(p => ({...p, personalDetails: data}))} />;
      case 'Education': return <TeacherEducationForm formData={teacherData.educationDetails} setFormData={(update) => setTeacherData(p => ({ ...p, educationDetails: { ...p.educationDetails, ...update }}))} />;
      case 'Documents': return <TeacherDocumentsForm formData={teacherData.documentDetails} setFormData={(update) => setTeacherData(p => ({ ...p, documentDetails: { ...p.documentDetails, ...update }}))} />;
      case 'Banking': return <TeacherBankingForm formData={teacherData.bankingDetails} setFormData={(update) => setTeacherData(p => ({ ...p, bankingDetails: { ...p.bankingDetails, ...update }}))} />;
      case 'Teaching Details': return <TeacherTeachingForm formData={teacherData.teachingDetails} setFormData={(update) => setTeacherData(p => ({ ...p, teachingDetails: { ...p.teachingDetails, ...update }}))} />;
      case 'Password': return <TeacherPasswordSettings />;
      default: return null;
    }
  };

  const handleNext = () => {
      const currentIndex = TABS.indexOf(activeTab);
      if(currentIndex < TABS.length - 1) {
          setActiveTab(TABS[currentIndex + 1]);
      }
  };

  const handlePrevious = () => {
    const currentIndex = TABS.indexOf(activeTab);
    if(currentIndex > 0) {
        setActiveTab(TABS[currentIndex - 1]);
    }
  };

  const handleSave = () => {
      console.log("Saving all data...", teacherData);
      setShowSuccessModal(true); // Show the success modal
      setIsEditing(false); // Exit editing mode
  };

  return (
    <>
      {/* --- RENDER BOTH MODALS BASED ON THEIR STATE --- */}
      {showSuccessModal && <ConfirmationModal onClose={() => setShowSuccessModal(false)} />}
      {showPermissionModal && (
        <RequestPermissionModal
          onClose={() => setShowPermissionModal(false)}
          onSubmit={handlePermissionSubmit}
        />
      )}

      <div className="bg-[#F5F5F7] p-3 md:p-6 rounded-[14px]">
        <header className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6">
          <div className="w-20 h-20 sm:w-[82px] sm:h-[82px] rounded-full border-[5px] border-white shadow-md flex items-center justify-center overflow-hidden bg-[#E2D5FF]">
              {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                  <span className="text-3xl font-medium text-[#5F33C4]">AD</span>
              )}
          </div>
          <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Alex Doe</h2>
              <p className="text-sm sm:text-base text-gray-500">Employee ID: 23262</p>
          </div>
          <div className="flex items-center gap-4">
            {isEditing ? (
              <>
                 <button onClick={() => { setIsEditing(false); }} className="bg-black text-white font-medium rounded-lg px-6 py-3 transition-opacity hover:opacity-90">
                    Cancel
                 </button>
                 <button onClick={handleSave} className="bg-[#5F33C4] text-white font-medium rounded-lg px-6 py-3 transition-opacity hover:opacity-90">
                    Save Changes
                 </button>
              </>
            ) : (
              <>
                <label
                  htmlFor="teacher-photo-upload"
                  className="bg-black text-white font-medium rounded-lg px-4 py-2 flex items-center justify-center gap-2 cursor-pointer transition-opacity hover:opacity-90"
                >
                  <Upload size={16} />
                  <span>Upload Photo</span>
                </label>
                <input
                  id="teacher-photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <button onClick={() => setShowPermissionModal(true)} className="text-sm text-blue-600 font-medium hover:underline">
                  Request to Edit
                </button>
              </>
            )}
          </div>
        </header>

        <main className="bg-white rounded-[14px] p-6">
          <div className="bg-black rounded-lg p-1 inline-flex items-center justify-start max-w-full mb-6 overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap px-4 sm:px-6 py-2 rounded-md text-sm transition-colors ${activeTab === tab ? 'bg-[#5F33C4] text-white' : 'text-white hover:bg-gray-700'}`}
                >
                  {tab}
                </button>
              ))}
          </div>

          <div className="py-4">
            {renderActiveTab()}
          </div>
          
          <div className="flex justify-end items-center mt-8 pt-6 border-t gap-3">
              {TABS.indexOf(activeTab) > 0 && (
                <button
                  onClick={handlePrevious}
                  className="bg-black text-white font-medium rounded-md px-4 py-2 flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                >
                  <SkipBack size={20} />
                  <span className="leading-none">Previous</span>
                </button>
              )}

              {TABS.indexOf(activeTab) < TABS.length - 1 && (
                <button
                  onClick={handleNext}
                  className="bg-blueviolet text-white font-medium rounded-md px-4 py-2 flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                >
                  <span className="leading-none">Next</span>
                  <SkipForward size={20} />
                </button>
              )}
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

export default TeacherProfilePage;