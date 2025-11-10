import React, { useState, useMemo } from 'react';
import type { Section } from '../types';
import Challenge from './Challenge';
import BrainIcon from './icons/BrainIcon';

interface ChallengeViewProps {
  sections: Section[];
}

const ChallengeView: React.FC<ChallengeViewProps> = ({ sections }) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>('');

  const challengeSections = useMemo(() => sections.filter(s => s.id !== 'introduccion'), [sections]);
  const selectedSection = useMemo(() => sections.find(s => s.id === selectedSectionId), [sections, selectedSectionId]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSectionId(e.target.value);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2 tracking-tight">Área de Desafío</h2>
        <p className="text-lg text-slate-600">
          Selecciona un tema de la lista para generar un desafío y poner a prueba tus conocimientos.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-10">
        <label htmlFor="topic-select" className="block text-sm font-medium text-slate-700 mb-2">
          Módulo de conocimiento
        </label>
        <select
          id="topic-select"
          onChange={handleSelectChange}
          value={selectedSectionId}
          className="block w-full pl-3 pr-10 py-2.5 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
        >
          <option value="" disabled>
            -- Elige un módulo --
          </option>
          {challengeSections.map(section => (
            <option key={section.id} value={section.id}>
              {section.title}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mt-4">
        {selectedSection ? (
          <Challenge section={selectedSection} />
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center text-slate-500 border-2 border-dashed border-slate-200 animate-fade-in-up">
            <BrainIcon className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-4 text-lg font-medium">
              Por favor, selecciona un módulo para comenzar un desafío.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeView;