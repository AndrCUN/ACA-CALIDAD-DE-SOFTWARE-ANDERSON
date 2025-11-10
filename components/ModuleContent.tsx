import React from 'react';
import type { Section } from '../types';

interface ModuleContentProps {
  section: Section | undefined;
}

const ModuleContent: React.FC<ModuleContentProps> = ({ section }) => {
  if (!section) {
    return <div className="p-8 text-center text-slate-500">Selecciona una sección para comenzar.</div>;
  }

  return (
    <div className="p-8">
      {section.id !== 'introduccion' && (
        <h2 className="text-3xl font-extrabold text-slate-800 mb-6 tracking-tight">{section.title}</h2>
      )}
      <div 
        className="text-slate-700 leading-relaxed space-y-4" 
        dangerouslySetInnerHTML={{ __html: section.content || '' }} 
      />
    </div>
  );
};

export default ModuleContent;
