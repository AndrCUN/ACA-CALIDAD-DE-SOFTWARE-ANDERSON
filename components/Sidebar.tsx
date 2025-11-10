import React from 'react';
import type { Section } from '../types';

interface SidebarProps {
  sections: Section[];
  activeSectionId: string;
  onSectionSelect: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sections, activeSectionId, onSectionSelect }) => {
  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 p-4 hidden md:block">
      <nav className="space-y-2">
        {sections.map((section, index) => (
          <a
            key={section.id}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSectionSelect(section.id);
            }}
            className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 transform ${
              activeSectionId === section.id
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-600 hover:bg-indigo-100 hover:text-indigo-700 hover:translate-x-1'
            }`}
          >
            <span
              className={`mr-3 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-colors duration-150 ${
                activeSectionId === section.id
                  ? 'bg-white text-indigo-600'
                  : 'bg-slate-200 text-slate-600 group-hover:bg-indigo-200'
              }`}
            >
              {index + 1}
            </span>
            <span>{section.title}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;