import React, { useState, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import { EVALUATION_CRITERIA } from '../constants';
import type { Ratings } from '../types';
import XIcon from './icons/XIcon';
import { addFeedback } from '../db';

interface QualitativeTestOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  pageTitle: string | undefined;
}

const experienceLevels = [
  { value: 1, label: 'Muy Malo', emoji: '😞' },
  { value: 2, label: 'Malo', emoji: '😐' },
  { value: 3, label: 'Regular', emoji: '😊' },
  { value: 4, label: 'Bueno', emoji: '😄' },
  { value: 5, label: 'Excelente', emoji: '😍' },
];

const OverallExperienceRating: React.FC<{ value: number; onChange: (value: number) => void }> = ({ value, onChange }) => (
  <div className="flex items-center justify-center space-x-2 sm:space-x-4 bg-slate-50 p-3 rounded-lg">
    {experienceLevels.map(level => (
      <button
        key={level.value}
        type="button"
        onClick={() => onChange(level.value)}
        className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          value === level.value ? 'bg-indigo-100' : 'hover:bg-slate-200'
        }`}
        aria-pressed={value === level.value}
        aria-label={level.label}
      >
        <span className="text-3xl" aria-hidden="true">{level.emoji}</span>
        <span className={`text-xs mt-1 font-medium ${value === level.value ? 'text-indigo-700' : 'text-slate-500'}`}>{level.label}</span>
      </button>
    ))}
  </div>
);


const StarRating: React.FC<{ count: number; value: number; onChange: (value: number) => void }> = ({ count, value, onChange }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(count)].map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          className={`h-7 w-7 transition-colors ${i < value ? 'text-amber-400' : 'text-slate-300 hover:text-amber-300'}`}
          aria-label={`Calificación ${i + 1} de ${count}`}
        >
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.445a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118l-3.365-2.445a1 1 0 00-1.175 0l-3.365 2.445c-.784.57-1.838-.197-1.539-1.118l1.286-3.955a1 1 0 00-.364-1.118L2.07 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

const QualitativeTestOverlay: React.FC<QualitativeTestOverlayProps> = ({ isOpen, onClose, pageTitle }) => {
  const initialRatings = EVALUATION_CRITERIA.reduce((acc, criterion) => {
    acc[criterion.key] = 0;
    return acc;
  }, {} as Ratings);

  const [ratings, setRatings] = useState<Ratings>(initialRatings);
  const [userName, setUserName] = useState('');
  const [overallExperience, setOverallExperience] = useState(0);
  const [positiveFeedback, setPositiveFeedback] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [evaluatedUrl, setEvaluatedUrl] = useState('');


  const resetForm = useCallback(() => {
    setRatings(initialRatings);
    setUserName('');
    setOverallExperience(0);
    setPositiveFeedback('');
    setSuggestions('');
    setTargetUrl('');
    setEvaluatedUrl('');
  }, [initialRatings]);
  
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetUrl(e.target.value);
    if (e.target.value.startsWith('http://') || e.target.value.startsWith('https://')) {
        setEvaluatedUrl(e.target.value);
    } else {
        setEvaluatedUrl('');
    }
  };

  const handleGeneratePdf = async () => {
    const doc = new jsPDF();
    const evaluatedTitle = targetUrl || pageTitle || 'Página Actual';
    const selectedExperience = experienceLevels.find(l => l.value === overallExperience);

    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Reporte de Feedback de Calidad', 105, 20, { align: 'center' });
    doc.setLineWidth(0.5);
    doc.line(14, 25, 196, 25);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text(`Página Evaluada:`, 14, 35);
    doc.text(`Evaluador:`, 14, 42);
    doc.text(`Fecha:`, 14, 49);
    doc.setTextColor(0);
    doc.setFont('helvetica', 'bold');
    doc.text(evaluatedTitle, 50, 35);
    doc.text(userName || 'Anónimo', 50, 42);
    doc.text(new Date().toLocaleString('es-ES'), 50, 49);

    let y = 65;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Experiencia General', 14, y);
    y += 8;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(selectedExperience ? `${selectedExperience.label} (${overallExperience}/5)` : 'No calificado', 14, y);
    y += 15;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Evaluación Detallada', 14, y);
    y += 10;
    doc.setFontSize(12);
    EVALUATION_CRITERIA.forEach(criterion => {
      const rating = ratings[criterion.key];
      doc.setFont('helvetica', 'bold');
      doc.text(`${criterion.label}:`, 14, y);
      doc.setFont('helvetica', 'normal');
      doc.text(`${rating} / 5`, 70, y);
      y += 8;
    });

    const renderComments = (title: string, content: string) => {
      y += 5;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(title, 14, y);
      y += 8;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      const splitText = doc.splitTextToSize(content || 'Sin comentarios.', 180);
      doc.text(splitText, 14, y);
      y += splitText.length * 5 + 5;
    };

    renderComments('Feedback Positivo', positiveFeedback);
    renderComments('Sugerencias de Mejora', suggestions);

    doc.setLineWidth(0.2);
    doc.line(14, 280, 196, 280);
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text(`Reporte generado desde: ${window.location.href}`, 105, 285, { align: 'center' });

    const pdfBlob = doc.output('blob');
    
    try {
        await addFeedback({
            userName: userName || 'Anónimo',
            pageTitle: evaluatedTitle,
            date: new Date(),
            pdfBlob: pdfBlob,
        });
    } catch (error) {
        console.error("Failed to save feedback:", error);
        alert('Error: No se pudo guardar el feedback. El reporte solo será descargado.');
    }
    
    doc.save(`reporte-feedback-${evaluatedTitle.replace(/[\s/:]/g, '_').toLowerCase()}.pdf`);
    
    onClose();
    resetForm();
  };
  
  const handleRatingChange = (key: string, value: number) => {
    setRatings(prev => ({ ...prev, [key]: value }));
  };

  const handleClose = () => {
    resetForm();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
        <header className="flex items-center justify-between p-4 border-b border-slate-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-800">Feedback de Calidad</h2>
          <button onClick={handleClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <XIcon className="h-6 w-6" />
            <span className="sr-only">Cerrar</span>
          </button>
        </header>

        <div className="flex-1 grid md:grid-cols-2 gap-x-6 overflow-hidden">
          <main className="p-6 overflow-y-auto space-y-8">
            <div className="space-y-6">
                <div>
                  <label htmlFor="target-url" className="text-md font-medium text-slate-700 mb-2 block">Página a Evaluar (URL)</label>
                  <input
                    type="url"
                    id="target-url"
                    value={targetUrl}
                    onChange={handleUrlChange}
                    placeholder="https://ejemplo.com"
                    className="w-full p-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  />
                  <p className="text-xs text-slate-500 mt-1">Nota: Algunos sitios pueden no cargar en el visor por sus políticas de seguridad.</p>
                </div>
                <div>
                    <label htmlFor="evaluator-name" className="text-md font-medium text-slate-700 mb-2 block">Tu Nombre (Opcional)</label>
                    <input
                      type="text"
                      id="evaluator-name"
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                      placeholder="Ej: Ada Lovelace"
                      className="w-full p-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    />
                </div>
             </div>
          
            <div>
              <label className="text-md font-medium text-slate-700 mb-3 block text-center">Experiencia General</label>
              <OverallExperienceRating value={overallExperience} onChange={setOverallExperience} />
            </div>

            <div className="space-y-6 border-t pt-6">
              <h3 className="text-md font-medium text-slate-700 text-center">Evaluación Detallada</h3>
              {EVALUATION_CRITERIA.map(criterion => (
                <div key={criterion.key} className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <label className="text-md font-medium text-slate-700 mb-2 sm:mb-0">{criterion.label}</label>
                  <StarRating count={5} value={ratings[criterion.key]} onChange={(value) => handleRatingChange(criterion.key, value)} />
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t pt-6">
              <div>
                <label htmlFor="positive-feedback" className="text-md font-medium text-slate-700 mb-2 block">Feedback Positivo</label>
                <textarea
                  id="positive-feedback"
                  value={positiveFeedback}
                  onChange={e => setPositiveFeedback(e.target.value)}
                  rows={3}
                  placeholder="¿Qué te ha gustado o funcionado bien?"
                  className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="suggestions" className="text-md font-medium text-slate-700 mb-2 block">Sugerencias de Mejora</label>
                <textarea
                  id="suggestions"
                  value={suggestions}
                  onChange={e => setSuggestions(e.target.value)}
                  rows={3}
                  placeholder="¿Qué podríamos mejorar? ¿Encontraste algún problema?"
                  className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>
          </main>

          <aside className="hidden md:block bg-slate-100 rounded-lg m-6 overflow-hidden border">
              {evaluatedUrl ? (
                <iframe src={evaluatedUrl} className="w-full h-full border-0" title="Página a evaluar" sandbox="allow-scripts allow-same-origin"></iframe>
              ) : (
                <div className="flex items-center justify-center h-full text-center p-4 text-slate-500 bg-slate-50">
                    <p>Ingresa una URL válida en el formulario <br/> para previsualizar la página aquí.</p>
                </div>
              )}
          </aside>
        </div>

        <footer className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end space-x-3 flex-shrink-0">
          <button 
            onClick={handleClose}
            className="px-5 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 transition-colors">
            Cancelar
          </button>
          <button 
            onClick={handleGeneratePdf}
            className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
            Guardar y Generar PDF
          </button>
        </footer>
      </div>
      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale { animation: fadeInScale 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default QualitativeTestOverlay;
