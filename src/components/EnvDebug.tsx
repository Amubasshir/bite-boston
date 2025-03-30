import React from 'react';

const EnvDebug: React.FC = () => {
  // Check if environment variables are loaded
  const mapApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'Not found';
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'Not found';
  
  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-md z-50 text-sm opacity-90">
      <h3 className="font-bold mb-2">Environment Variables Debug</h3>
      <div className="space-y-2">
        <div>
          <span className="font-medium">Maps API Key:</span>{' '}
          <span className="font-mono">{mapApiKey === 'Not found' ? 'Not found' : mapApiKey.substring(0, 8) + '...'}</span>
        </div>
        <div>
          <span className="font-medium">Supabase URL:</span>{' '}
          <span className="font-mono">{supabaseUrl === 'Not found' ? 'Not found' : 'Present ✓'}</span>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          If keys show "Not found", your .env file may not be loading correctly.
        </div>
      </div>
    </div>
  );
};

export default EnvDebug;
