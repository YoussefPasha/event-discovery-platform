'use client';

interface SuccessModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  redirectingText: string;
}

export default function SuccessModal({ isOpen, title, message, redirectingText }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-scale-up">
        {/* Success Icon with Animation */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          {/* Outer ring */}
          <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
          {/* Inner circle */}
          <div className="relative w-20 h-20 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-12 h-12 text-white animate-check-mark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-3 bg-linear-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">{message}</p>
        
        {/* Loading Indicator */}
        <div className="flex items-center justify-center gap-3 text-sm text-gray-500 bg-gray-50 rounded-lg px-4 py-3">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
          <span className="font-medium">{redirectingText}</span>
        </div>
      </div>
    </div>
  );
}

