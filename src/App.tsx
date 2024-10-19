import React, { useState } from 'react';
import { BusinessModelOutput, User } from './types';
import { generateBusinessModelOutput } from './services/geminiService';
import BusinessModelCard from './components/BusinessModelCard';
import { Search } from 'lucide-react';

const App: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [skills, setSkills] = useState('');
  const [budget, setBudget] = useState('');
  const [modelOutput, setModelOutput] = useState<BusinessModelOutput | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user] = useState<User>({ isPro: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const output = await generateBusinessModelOutput({
        name: businessName,
        skills: skills.split(',').map(skill => skill.trim()),
        budget: {
          min: parseInt(budget.split('-')[0].trim()),
          max: parseInt(budget.split('-')[1].trim())
        }
      });
      setModelOutput(output);
    } catch (err) {
      setError('Failed to generate business model output. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-8">
          WACE Business Model Finder
        </h1>
        
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium">
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="skills" className="block text-sm font-medium">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="budget" className="block text-sm font-medium">
              Budget Range (e.g., 1000-5000)
            </label>
            <input
              type="text"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Generate Business Model
          </button>
        </form>

        {loading && (
          <div className="text-center">
            <div className="spinner"></div>
            <p className="mt-2">Generating business model output...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {modelOutput && (
          <BusinessModelCard model={modelOutput} user={user} />
        )}
      </div>
    </div>
  );
};

export default App;