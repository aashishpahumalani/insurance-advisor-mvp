'use client';

import React from 'react';
import { Loader2, Brain, Calculator, Shield } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="card max-w-md mx-auto text-center">
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-primary-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Analyzing Your Profile
          </h3>
          <p className="text-gray-600">
            Our smart recommendation engine is working to find the best insurance options for you.
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Brain className="w-4 h-4" />
            <span>Analyzing risk factors...</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Calculator className="w-4 h-4" />
            <span>Calculating optimal coverage...</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Matching insurance products...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
