'use client';

import React, { useState } from 'react';
import { UserFormData, InsuranceRecommendation, ApiError } from '@/types';
import { insuranceApi } from '@/lib/api';
import InsuranceForm from '@/components/InsuranceForm';
import RecommendationCard from '@/components/RecommendationCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { Shield, TrendingUp, Users, Award } from 'lucide-react';

type AppState = 'form' | 'loading' | 'recommendation' | 'error';

const HomePage: React.FC = () => {
  const [state, setState] = useState<AppState>('form');
  const [recommendation, setRecommendation] = useState<InsuranceRecommendation | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (formData: UserFormData) => {
    setIsLoading(true);
    setState('loading');
    setError('');

    try {
        console.log('Submitting form data:', formData);
        
      const response = await insuranceApi.getRecommendation(formData);
      setRecommendation(response.data);
      setState('recommendation');
    } catch (err) {
      console.error('Error getting recommendation:', err);
      
      if (err && typeof err === 'object' && 'message' in err) {
        setError((err as ApiError).message);
      } else {
        setError('Failed to get recommendation. Please try again.');
      }
      setState('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setState('form');
    setRecommendation(null);
    setError('');
  };

  const handleRetry = () => {
    setState('form');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="gradient-bg text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Insurance Advisor
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Get personalized insurance recommendations tailored to your unique needs and financial situation.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Smart Analysis</h3>
                <p className="text-sm text-primary-100">
                  Advanced algorithms analyze your risk profile and financial needs
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Personalized</h3>
                <p className="text-sm text-primary-100">
                  Recommendations tailored to your age, income, and family situation
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Expert Backed</h3>
                <p className="text-sm text-primary-100">
                  Based on industry best practices and professional expertise
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {state === 'form' && (
            <InsuranceForm 
              onSubmit={handleFormSubmit} 
              isLoading={isLoading}
            />
          )}
          
          {state === 'loading' && <LoadingSpinner />}
          
          {state === 'recommendation' && recommendation && (
            <RecommendationCard 
              recommendation={recommendation}
              onReset={handleReset}
            />
          )}
          
          {state === 'error' && (
            <ErrorMessage 
              message={error}
              onRetry={handleRetry}
              onReset={handleReset}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <Shield className="w-8 h-8 text-primary-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Insurance Advisor</h3>
            <p className="text-gray-400 mb-4">
              Making insurance decisions simple and informed.
            </p>
            
            <div className="border-t border-gray-700 pt-4">
              <p className="text-sm text-gray-500">
                © 2025 Insurance Advisor. This tool provides general recommendations only. 
                Please consult with a licensed insurance professional for personalized advice.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
