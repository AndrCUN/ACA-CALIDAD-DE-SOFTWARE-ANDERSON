import React, { useState, useEffect } from 'react';
import { getAllFeedbacks } from '../db';
import type { StoredFeedback } from '../types';
import ClipboardCheckIcon from './icons/ClipboardCheckIcon';

const MyFeedbacksView: React.FC = () => {
    const [feedbacks, setFeedbacks] = useState<StoredFeedback[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const data = await getAllFeedbacks();
                setFeedbacks(data);
            } catch (error) {
                console.error("Could not fetch feedbacks", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFeedbacks();
    }, []);

    const handleDownload = (feedback: StoredFeedback) => {
        const url = URL.createObjectURL(feedback.pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte-feedback-${feedback.pageTitle.replace(/[\s/:]/g, '_').toLowerCase()}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (isLoading) {
        return <div className="p-8 text-center text-slate-500">Cargando feedbacks...</div>;
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8 animate-fade-in-up">
                <h2 className="text-3xl font-extrabold text-slate-800 mb-2 tracking-tight">Mis Feedbacks</h2>
                <p className="text-lg text-slate-600">
                    Aquí encontrarás todos los reportes de feedback que has generado.
                </p>
            </div>

            {feedbacks.length === 0 ? (
                 <div className="bg-white p-8 rounded-lg shadow-md text-center text-slate-500 border-2 border-dashed border-slate-200 animate-fade-in-up delay-100">
                    <ClipboardCheckIcon className="mx-auto h-12 w-12 text-slate-300" />
                    <p className="mt-4 text-lg font-medium">
                        Aún no has generado ningún reporte.
                    </p>
                    <p className="text-sm text-slate-400 mt-1">Usa el botón de feedback en la esquina inferior derecha para empezar.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {feedbacks.map((fb, index) => (
                        <div 
                            key={fb.id} 
                            style={{ animationDelay: `${index * 100}ms` }}
                            className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between animate-fade-in-up"
                        >
                            <div className="overflow-hidden mr-4">
                                <p className="font-bold text-indigo-700 truncate">{fb.pageTitle}</p>
                                <p className="text-sm text-slate-500">Por: {fb.userName} - {fb.date.toLocaleDateString('es-ES')}</p>
                            </div>
                            <button
                                onClick={() => handleDownload(fb)}
                                className="px-4 py-2 bg-teal-500 text-white text-sm font-semibold rounded-full shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all transform hover:-translate-y-0.5 flex-shrink-0"
                            >
                                Descargar
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyFeedbacksView;
