import React from 'react';
import { AlertTriangle, Home, ArrowLeft, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
interface UnauthorizedPageProps {
  onGoBack?: () => void;
  onGoHome?: () => void;
  customMessage?: string;
  showContactInfo?: boolean;
}

const UnauthorizedPage: React.FC<UnauthorizedPageProps> = ({
  onGoBack,
  onGoHome,
  customMessage,
  showContactInfo = false
}) => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icon */}
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <Lock className="w-10 h-10 text-red-600" />
          </div>
          
          {/* Status Code */}
          <div className="text-6xl font-bold text-gray-800 mb-4">401</div>
          
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Unauthorized Access
          </h1>
          
          {/* Message */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {customMessage || 
              "You don't have permission to access this page. Please check your credentials or contact an administrator for assistance."
            }
          </p>
          
          {/* Warning Alert */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span className="text-amber-800 font-medium">Access Restricted</span>
            </div>
          </div>
          
          {/* Contact Info */}
          {showContactInfo && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">
                Need access? Contact your administrator or 
                <a href="mailto:support@yourwebsite.com" className="font-medium underline ml-1">
                  support team
                </a>
              </p>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {onGoBack && (
              <button
                onClick={onGoBack}
                className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Go Back</span>
              </button>
            )}
            
            {onGoHome && (
              <button
                onClick={onGoHome}
                className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
              >
                <Home className="w-4 h-4" />
                <span>Go Home</span>
              </button>
            )}
          </div>
          
          {/* Additional Actions */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">
              Still having trouble?
            </p>
            <div className="flex flex-col sm:flex-row gap-2 text-sm">
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Request Access
              </button>
              <span className="hidden sm:inline text-gray-400">•</span>
              <button
                className="text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => navigate('/login')} // Add this handler
              >
                Login Again
              </button>
              <span className="hidden sm:inline text-gray-400">•</span>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Help Center
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Error Code: 401 | Unauthorized Access
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;