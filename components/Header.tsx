import React, { useState, useEffect, useRef } from 'react';
import type { Section } from '../types';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface HeaderProps {
  onHomeClick: () => void;
  onTestKnowledgeClick: () => void;
  onMyFeedbacksClick: () => void;
  sections: Section[];
  onSectionSelect: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick, onTestKnowledgeClick, onMyFeedbacksClick, sections, onSectionSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSectionClick = (id: string) => {
    onSectionSelect(id);
    setIsDropdownOpen(false);
  }

  const educationalSections = sections.filter(s => s.id !== 'introduccion');

  return (
    <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between z-20 relative">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
            <svg className="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
            </svg>
            <h1 className="text-lg font-bold text-slate-800 hidden sm:block">Centro de Aprendizaje de Calidad</h1>
        </div>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button onClick={onHomeClick} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-all duration-200 transform hover:-translate-y-0.5">
          Inicio
        </button>
        <button onClick={onMyFeedbacksClick} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-all duration-200 transform hover:-translate-y-0.5">
          Mis feedbacks
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-1 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span>Software Quality.</span>
            <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1">
              {educationalSections.map(section => (
                <a
                  key={section.id}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSectionClick(section.id);
                  }}
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-indigo-100"
                >
                  {section.title}
                </a>
              ))}
            </div>
          )}
        </div>
        
        <button 
          onClick={onTestKnowledgeClick}
          className="px-3 sm:px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5"
        >
          Prueba tu conocimiento
        </button>
      </div>
    </header>
  );
};

export default Header;
