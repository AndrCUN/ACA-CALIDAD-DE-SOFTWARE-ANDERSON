import React, { useState, useMemo, useRef } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ModuleContent from './components/ModuleContent';
import { MODULE_STRUCTURE } from './constants';
import QualitativeTestOverlay from './components/QualitativeTestOverlay';
import ClipboardCheckIcon from './components/icons/ClipboardCheckIcon';
import ChallengeView from './components/ChallengeView';
import MyFeedbacksView from './components/MyFeedbacksView';
import type { Section } from './types';

const App: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>(MODULE_STRUCTURE[0].id);
  const [isTestOverlayVisible, setIsTestOverlayVisible] = useState(false);
  const [currentView, setCurrentView] = useState<'module' | 'challenge' | 'feedbacks'>('module');
  const mainContentRef = useRef<HTMLElement>(null);

  const activeSection = useMemo(() =>
    MODULE_STRUCTURE.find(section => section.id === activeSectionId),
    [activeSectionId]
  );
  
  const handleTestKnowledgeClick = () => {
    setCurrentView('challenge');
  };

  const handleMyFeedbacksClick = () => {
    setCurrentView('feedbacks');
  };
  
  const handleHomeClick = () => {
    setActiveSectionId('introduccion');
    setCurrentView('module');
    mainContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  const handleSectionSelect = (id: string) => {
    setActiveSectionId(id);
    setCurrentView('module');
  };

  const contextTitle = useMemo(() => (
    currentView === 'module' 
      ? activeSection?.topic
      : currentView === 'challenge' ? 'Área de Desafío' : 'Mis Feedbacks'
  ), [currentView, activeSection]);

  return (
    <div className="h-screen flex flex-col font-sans">
      <Header 
        onHomeClick={handleHomeClick}
        onTestKnowledgeClick={handleTestKnowledgeClick}
        onMyFeedbacksClick={handleMyFeedbacksClick}
        sections={MODULE_STRUCTURE}
        onSectionSelect={handleSectionSelect}
      />
      <div className="flex flex-1 overflow-hidden">
        {currentView === 'module' ? (
          <>
            <Sidebar
              sections={MODULE_STRUCTURE}
              activeSectionId={activeSectionId}
              onSectionSelect={handleSectionSelect}
            />
            <main ref={mainContentRef} className="flex-1 overflow-y-auto bg-slate-50 relative">
              <ModuleContent section={activeSection} />
            </main>
          </>
        ) : (
          <main className="flex-1 overflow-y-auto bg-slate-50 relative">
            {currentView === 'challenge' && <ChallengeView sections={MODULE_STRUCTURE} />}
            {currentView === 'feedbacks' && <MyFeedbacksView />}
          </main>
        )}
      </div>

       <button
        onClick={() => setIsTestOverlayVisible(true)}
        className="fixed bottom-6 right-6 bg-teal-500 text-white p-4 rounded-full shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-transform transform hover:scale-110"
        title="Enviar Feedback"
        aria-label="Enviar feedback sobre la página actual"
      >
        <ClipboardCheckIcon className="h-6 w-6" />
      </button>

      <QualitativeTestOverlay 
        isOpen={isTestOverlayVisible}
        onClose={() => setIsTestOverlayVisible(false)}
        pageTitle={contextTitle}
      />
    </div>
  );
};

export default App;
