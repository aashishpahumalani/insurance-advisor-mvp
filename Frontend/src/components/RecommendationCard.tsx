'use client';

import React from 'react';
import { 
  Shield, 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  FileText,
  RefreshCw
} from 'lucide-react';
import { InsuranceRecommendation } from '@/types';
import { formatCurrency, getRiskColor, getInsuranceTypeColor } from '@/lib/utils';

interface RecommendationCardProps {
  recommendation: InsuranceRecommendation;
  onReset: () => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, onReset }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Personalized Insurance Recommendation
        </h2>
        <p className="text-gray-600">
          Based on your profile, here's what we recommend for your insurance needs.
        </p>
      </div>

      {/* Primary Recommendation */}
      <div className="card">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <Shield className="w-6 h-6 text-primary-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Primary Recommendation</h3>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(recommendation.riskAssessment)}`}>
            {recommendation.riskAssessment}
          </span>
        </div>
        
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${getInsuranceTypeColor(recommendation.primaryRecommendation)}`}>
            <h4 className="text-lg font-semibold mb-2">
              {recommendation.primaryRecommendation}
            </h4>
            <p className="text-sm opacity-90">
              {recommendation.reasoning}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Estimated Annual Premium</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency(recommendation.estimatedPremium)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Coverage Amount</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency(recommendation.coverageAmount)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Recommendations */}
      {recommendation.secondaryRecommendations.length > 0 && (
        <div className="card">
          <div className="flex items-center mb-4">
            <FileText className="w-6 h-6 text-primary-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">
              Additional Recommendations
            </h3>
          </div>
          
          <div className="space-y-3">
            {recommendation.secondaryRecommendations.map((rec, index) => (
              <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">{rec}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Consider this additional coverage to enhance your protection.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Benefits */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Why This Recommendation Works for You
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Tailored to Your Risk Profile</h4>
              <p className="text-sm text-gray-600">
                Your {recommendation.riskAssessment.toLowerCase()} profile matches well with this insurance type.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Optimal Coverage Amount</h4>
              <p className="text-sm text-gray-600">
                The recommended coverage of {formatCurrency(recommendation.coverageAmount)} provides 
                comprehensive protection for your financial situation.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Affordable Premium</h4>
              <p className="text-sm text-gray-600">
                At {formatCurrency(recommendation.estimatedPremium)} annually, this fits within 
                a reasonable budget while providing excellent value.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="card bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <h3 className="text-xl font-semibold text-primary-900 mb-4">
          Next Steps
        </h3>
        
        <div className="space-y-3 text-primary-800">
          <div className="flex items-start">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium mr-3 mt-0.5">
              1
            </span>
            <p>Review this recommendation with a licensed insurance agent</p>
          </div>
          
          <div className="flex items-start">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium mr-3 mt-0.5">
              2
            </span>
            <p>Compare quotes from multiple insurance providers</p>
          </div>
          
          <div className="flex items-start">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium mr-3 mt-0.5">
              3
            </span>
            <p>Consider your specific health and financial situation</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="btn-secondary flex items-center justify-center"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Get Another Recommendation
        </button>
      </div>

      {/* Disclaimer */}
      <div className="text-center text-sm text-gray-500 p-4 bg-gray-50 rounded-lg">
        <p>
          <strong>Disclaimer:</strong> This is a general recommendation based on the information provided. 
          Please consult with a licensed insurance professional for personalized advice. 
          Actual premiums may vary based on health underwriting and other factors.
        </p>
      </div>
    </div>
  );
};

export default RecommendationCard;
