
import React from 'react';
import BrainIcon from './icons/BrainIcon';

interface ThinkingModeToggleProps {
  isThinkingMode: boolean;
  setIsThinkingMode: (value: boolean) => void;
}

const ThinkingModeToggle: React.FC<ThinkingModeToggleProps> = ({ isThinkingMode, setIsThinkingMode }) => {
  return (
    <div className="flex items-center space-x-3 bg-slate-100 p-2 rounded-lg">
      <BrainIcon className={`h-6 w-6 transition-colors duration-300 ${isThinkingMode ? 'text-indigo-500' : 'text-slate-400'}`} />
      <div className="flex flex-col">
        <label htmlFor="thinking-mode-toggle" className="font-medium text-sm text-slate-700">
          Pro Mode
        </label>
        <p className="text-xs text-slate-500">For more complex queries</p>
      </div>
      <button
        id="thinking-mode-toggle"
        onClick={() => setIsThinkingMode(!isThinkingMode)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          isThinkingMode ? 'bg-indigo-600' : 'bg-slate-300'
        }`}
        role="switch"
        aria-checked={isThinkingMode}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            isThinkingMode ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

export default ThinkingModeToggle;
