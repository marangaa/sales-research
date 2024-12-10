import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const URLSubmissionForm = () => {
  const [url, setUrl] = useState('');
  const [goals, setGoals] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, goals }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit research request');
      }

      // Handle successful submission
      const data = await response.json();
      // Navigate to research dashboard with the ID
      window.location.href = `/research/${data.researchId}`;
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white mb-2 text-center"
          >
            Company Research Assistant
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-center mb-8"
          >
            Enter a company URL to generate comprehensive sales intelligence
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://company-website.com"
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <textarea
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="Optional: What specific information are you looking for? (e.g., tech stack, decision makers, recent funding)"
                className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-xl 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent transition-all 
                         resize-none h-32"
              />
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              type="submit"
              disabled={isLoading || !url}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl 
                       font-medium flex items-center justify-center space-x-2 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:ring-offset-2 focus:ring-offset-gray-800 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200 ease-in-out"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <span>Start Research</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default URLSubmissionForm;