'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  onReset?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry, onReset }) => {
  return (
    <div className="card max-w-md mx-auto text-center">
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600">
            {message}
          </p>
        </div>
        
        <div className="space-y-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="btn-primary w-full flex items-center justify-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
          )}
          
          {onReset && (
            <button
              onClick={onReset}
              className="btn-secondary w-full flex items-center justify-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Start Over
            </button>
          )}
        </div>
        
        <div className="text-sm text-gray-500">
          <p>
            If the problem persists, please check your internet connection or contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
