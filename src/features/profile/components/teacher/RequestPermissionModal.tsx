import React, { useState } from 'react';
import { X } from 'lucide-react';
import FormSelect from '../../components/ui/FormSelect';
import FormTextArea from '../../components/ui/FormTextArea';

interface Props {
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

const RequestPermissionModal: React.FC<Props> = ({ onClose, onSubmit }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('Please provide a reason for your request.');
      return;
    }
    onSubmit(reason);
  };

  return (
    // --- FINAL FIX IS HERE: Classes now match the working ConfirmationModal ---
    <div className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Permission</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormSelect
            label="To"
            id="requestTo"
            name="requestTo"
            value="Admin"
            onChange={() => {}} 
            options={[{ value: 'Admin', label: 'Admin' }]}
            disabled 
          />
          <FormSelect
            label="Request"
            id="requestType"
            name="requestType"
            value="Edit Profile permission"
            onChange={() => {}} 
            options={[{ value: 'Edit Profile permission', label: 'Edit Profile permission' }]}
            disabled
          />
          <FormTextArea
            label="Reason"
            id="reason"
            name="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Please provide a reason for editing your profile..."
            required
          />
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-black text-white font-semibold rounded-lg px-8 py-3 transition-colors hover:bg-gray-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestPermissionModal;