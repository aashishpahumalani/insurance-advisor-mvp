'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { DollarSign, Users, TrendingUp, Loader2 } from 'lucide-react';
import { UserFormData } from '@/types';
import { validateAge, validateIncome, validateDependents } from '@/lib/utils';

interface InsuranceFormProps {
  onSubmit: (data: UserFormData) => Promise<void>;
  isLoading: boolean;
}

const InsuranceForm: React.FC<InsuranceFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      age: 30,
      income: 50000,
      dependents: 0,
      riskTolerance: 'medium',
    },
  });

  const onFormSubmit = async (data: UserFormData) => {
    try {
      // Ensure all numeric fields are properly converted to numbers
      const formData: UserFormData = {
        age: Number(data.age),
        income: Number(data.income),
        dependents: Number(data.dependents),
        riskTolerance: data.riskTolerance
      };
      
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Get Your Personalized Insurance Recommendation
        </h2>
        <p className="text-gray-600">
          Tell us about yourself and we'll recommend the best insurance options for your needs.
        </p>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Age */}
        <div>
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            id="age"
            type="number"
            {...register('age', { 
              required: 'Age is required',
              min: { value: 18, message: 'Age must be at least 18' },
              max: { value: 100, message: 'Age must be less than 100' },
              validate: (value) => validateAge(value) || 'Please enter a valid age',
              valueAsNumber: true
            })}
            className="form-input"
            placeholder="Enter your age"
          />
          {errors.age && <p className="form-error">{errors.age.message}</p>}
        </div>

        {/* Income and Dependents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="income" className="form-label">
              <DollarSign className="inline w-4 h-4 mr-2" />
              Annual Income
            </label>
            <input
              id="income"
              type="number"
              {...register('income', { 
                required: 'Income is required',
                min: { value: 0, message: 'Income cannot be negative' },
                max: { value: 10000000, message: 'Please enter a reasonable income amount' },
                validate: (value) => validateIncome(value) || 'Please enter a valid income',
                valueAsNumber: true
              })}
              className="form-input"
              placeholder="50000"
            />
            {errors.income && <p className="form-error">{errors.income.message}</p>}
          </div>

          <div>
            <label htmlFor="dependents" className="form-label">
              <Users className="inline w-4 h-4 mr-2" />
              Number of Dependents
            </label>
            <input
              id="dependents"
              type="number"
              {...register('dependents', { 
                required: 'Number of dependents is required',
                min: { value: 0, message: 'Dependents cannot be negative' },
                max: { value: 20, message: 'Please enter a reasonable number of dependents' },
                validate: (value) => validateDependents(value) || 'Please enter a valid number',
                valueAsNumber: true
              })}
              className="form-input"
              placeholder="0"
            />
            {errors.dependents && <p className="form-error">{errors.dependents.message}</p>}
          </div>
        </div>

        {/* Risk Tolerance */}
        <div>
          <label htmlFor="riskTolerance" className="form-label">
            <TrendingUp className="inline w-4 h-4 mr-2" />
            Risk Tolerance
          </label>
          <select
            id="riskTolerance"
            {...register('riskTolerance', { required: 'Risk tolerance is required' })}
            className="form-input"
          >
            <option value="low">Low - Conservative approach</option>
            <option value="medium">Medium - Balanced approach</option>
            <option value="high">High - Aggressive approach</option>
          </select>
          {errors.riskTolerance && <p className="form-error">{errors.riskTolerance.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Getting Your Recommendation...
              </>
            ) : (
              <>
                Get My Insurance Recommendation
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsuranceForm;
