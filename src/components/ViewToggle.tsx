import React from 'react';

interface ViewToggleProps {
  activeView: 'list' | 'map';
  onViewChange: (view: 'list' | 'map') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ activeView, onViewChange }) => {
  return (
    <div className="flex justify-center my-6">
      <div className="bg-gray-100 rounded-full p-1 flex shadow-sm">
        <button
          onClick={() => onViewChange('list')}
          className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeView === 'list'
              ? 'bg-white text-primary shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          aria-label="List view"
        >
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            List View
          </div>
        </button>
        <button
          onClick={() => onViewChange('map')}
          className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeView === 'map'
              ? 'bg-white text-primary shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          aria-label="Map view"
        >
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 20L3.5 17V6L9 9M9 20V9M9 20L15 17M9 9L15 6M15 17V6M15 17L20.5 20V9L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Map View
          </div>
        </button>
      </div>
    </div>
  );
};

export default ViewToggle;
