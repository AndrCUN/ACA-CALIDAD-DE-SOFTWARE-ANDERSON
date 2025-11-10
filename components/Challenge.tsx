import React, { useState, useCallback } from 'react';
import { generateChallenge } from '../services/geminiService';
import type { 
  ChallengeQuestion, 
  Section, 
  MCQQuestion, 
  CheckboxQuestion, 
  MatchingQuestion 
} from '../types';
import CheckIcon from './icons/CheckIcon';
import XIcon from './icons/XIcon';

interface ChallengeProps {
  section: Section | undefined;
}

/**
 * Performs a simple equality check between two arrays.
 * This is used for checking checkbox answers and assumes arrays are pre-sorted.
 */
const deepEqual = (a: any[], b: any[]): boolean => {
  if (!a || !b || a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};


const Challenge: React.FC<ChallengeProps> = ({ section }) => {
  const [questions, setQuestions] = useState<ChallengeQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number | number[]>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateChallenge = useCallback(async () => {
    if (!section) return;
    setIsLoading(true);
    setError(null);
    setQuestions([]);
    setUserAnswers({});
    setIsSubmitted(false);

    try {
      const generatedQuestions = await generateChallenge(section.topic);
      setQuestions(generatedQuestions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
    } finally {
      setIsLoading(false);
    }
  }, [section]);

  const handleAnswer = (questionIndex: number, answer: number | number[]) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };
  
  const handleSubmit = () => {
    setIsSubmitted(true);
  };
  
  const score = questions.reduce((acc, q, qIndex) => {
    const userAnswer = userAnswers[qIndex];
    let isCorrect = false;
    switch (q.type) {
      case 'mcq':
        isCorrect = userAnswer === q.correctAnswerIndex;
        break;
      case 'checkbox':
        const correctCheckbox = q.correctAnswerIndices.slice().sort();
        const userCheckbox = ((userAnswer as number[]) || []).slice().sort();
        isCorrect = deepEqual(correctCheckbox, userCheckbox);
        break;
      case 'matching':
        const userMatching = userAnswer as number[] || [];
        if (userMatching.length !== q.correctMatches.length) {
            isCorrect = false;
        } else {
            isCorrect = q.correctMatches.every((val, idx) => val === userMatching[idx]);
        }
        break;
    }
    return isCorrect ? acc + 1 : acc;
  }, 0);

  if (!section) return null;

  const renderQuestion = (q: ChallengeQuestion, qIndex: number) => {
    const baseProps = {
        key: qIndex,
        q,
        qIndex,
        userAnswer: userAnswers[qIndex],
        isSubmitted,
        handleAnswer,
    };

    switch (q.type) {
        case 'mcq':
            return <MCQQuestionComponent {...baseProps} q={q} />;
        case 'checkbox':
            return <CheckboxQuestionComponent {...baseProps} q={q} />;
        case 'matching':
            return <MatchingQuestionComponent {...baseProps} q={q} />;
        default:
            return null;
    }
  };

  return (
    <div className="bg-slate-100/70">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-slate-800">Prueba tu Conocimiento</h3>
        <button
          onClick={handleGenerateChallenge}
          disabled={isLoading}
          className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-full shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
        >
          {isLoading ? 'Generando...' : 'Nuevo Desafío'}
        </button>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}

      {questions.length > 0 && (
        <div className="space-y-6">
          {questions.map((q, qIndex) => renderQuestion(q, qIndex))}
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all transform hover:-translate-y-0.5"
            >
              Enviar Respuestas
            </button>
          ) : (
             <div className="text-center bg-white p-6 rounded-lg shadow-sm animate-fade-in-up">
                <h4 className="text-xl font-bold text-slate-800">¡Desafío Completo!</h4>
                <p className="text-lg text-slate-600 mt-2">Tu puntuación es <span className="font-extrabold text-indigo-600">{score}</span> de <span className="font-extrabold text-indigo-600">{questions.length}</span>.</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
};

// --- Question Type Components ---

interface QuestionComponentProps<T extends ChallengeQuestion> {
  q: T;
  qIndex: number;
  userAnswer: number | number[] | undefined;
  isSubmitted: boolean;
  handleAnswer: (questionIndex: number, answer: number | number[]) => void;
}

const MCQQuestionComponent: React.FC<QuestionComponentProps<MCQQuestion>> = ({ q, qIndex, userAnswer, isSubmitted, handleAnswer }) => {
    return (
        <div style={{ animationDelay: `${qIndex * 100}ms` }} className="bg-white p-6 rounded-lg shadow-sm animate-fade-in-up">
            <p className="font-semibold text-slate-700 mb-4">{qIndex + 1}. {q.question}</p>
            <div className="space-y-2">
                {q.options.map((option, oIndex) => {
                    const isSelected = userAnswer === oIndex;
                    const isCorrect = q.correctAnswerIndex === oIndex;
                    let optionClass = 'border-slate-300 hover:border-indigo-400 hover:bg-indigo-50';
                    if (isSubmitted) {
                        if (isCorrect) optionClass = 'bg-green-100 border-green-400 text-green-800';
                        else if (isSelected && !isCorrect) optionClass = 'bg-red-100 border-red-400 text-red-800';
                        else optionClass = 'border-slate-300 opacity-70';
                    } else if (isSelected) {
                        optionClass = 'bg-indigo-100 border-indigo-500 ring-2 ring-indigo-300';
                    }

                    return (
                        <button
                            key={oIndex}
                            onClick={() => handleAnswer(qIndex, oIndex)}
                            disabled={isSubmitted}
                            className={`w-full text-left flex items-center p-3 border rounded-md transition-all duration-150 ${optionClass} ${!isSubmitted ? 'cursor-pointer' : 'cursor-default'}`}
                        >
                            <span className="flex-grow">{option}</span>
                            {isSubmitted && isCorrect && <CheckIcon className="h-5 w-5 text-green-600" />}
                            {isSubmitted && isSelected && !isCorrect && <XIcon className="h-5 w-5 text-red-600" />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const CheckboxQuestionComponent: React.FC<QuestionComponentProps<CheckboxQuestion>> = ({ q, qIndex, userAnswer, isSubmitted, handleAnswer }) => {
    const currentAnswers = (userAnswer as number[] || []);
    
    const onSelect = (optionIndex: number) => {
        const newAnswers = currentAnswers.includes(optionIndex)
            ? currentAnswers.filter(i => i !== optionIndex)
            : [...currentAnswers, optionIndex];
        handleAnswer(qIndex, newAnswers);
    };

    return (
        <div style={{ animationDelay: `${qIndex * 100}ms` }} className="bg-white p-6 rounded-lg shadow-sm animate-fade-in-up">
            <p className="font-semibold text-slate-700 mb-4">{qIndex + 1}. {q.question}</p>
            <div className="space-y-2">
                {q.options.map((option, oIndex) => {
                    const isSelected = currentAnswers.includes(oIndex);
                    const isCorrect = q.correctAnswerIndices.includes(oIndex);
                    let optionClass = 'border-slate-300 hover:border-indigo-400 hover:bg-indigo-50';
                    if (isSubmitted) {
                        if (isCorrect) optionClass = 'bg-green-100 border-green-400 text-green-800';
                        else if (isSelected && !isCorrect) optionClass = 'bg-red-100 border-red-400 text-red-800';
                        else optionClass = 'border-slate-300 opacity-70';
                    } else if (isSelected) {
                        optionClass = 'bg-indigo-100 border-indigo-500';
                    }

                    return (
                        <div key={oIndex} onClick={() => !isSubmitted && onSelect(oIndex)} className={`flex items-center p-3 border rounded-md transition-all duration-150 ${optionClass} ${!isSubmitted ? 'cursor-pointer' : 'cursor-default'}`}>
                           <div className="flex items-center h-5">
                               <input
                                   type="checkbox"
                                   checked={isSelected}
                                   disabled={isSubmitted}
                                   readOnly
                                   className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                               />
                           </div>
                           <div className="ml-3 text-sm">
                                <label className="font-medium">{option}</label>
                           </div>
                           <div className="ml-auto">
                                {isSubmitted && isCorrect && !isSelected && <CheckIcon className="h-5 w-5 text-green-600" />}
                                {isSubmitted && isSelected && !isCorrect && <XIcon className="h-5 w-5 text-red-600" />}
                           </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


const MatchingQuestionComponent: React.FC<QuestionComponentProps<MatchingQuestion>> = ({ q, qIndex, userAnswer, isSubmitted, handleAnswer }) => {
    const currentAnswers = userAnswer as number[] || [];

    const onSelect = (promptIndex: number, optionIndex: number) => {
        const newAnswers = [...currentAnswers];
        newAnswers[promptIndex] = optionIndex;
        handleAnswer(qIndex, newAnswers);
    };

    return (
        <div style={{ animationDelay: `${qIndex * 100}ms` }} className="bg-white p-6 rounded-lg shadow-sm animate-fade-in-up">
            <p className="font-semibold text-slate-700 mb-4">{qIndex + 1}. {q.question}</p>
            <div className="space-y-4">
                {q.prompts.map((prompt, pIndex) => {
                    const selectedOption = currentAnswers[pIndex];
                    const isCorrect = q.correctMatches[pIndex] === selectedOption;
                    let ringClass = 'focus:ring-indigo-500';
                     if (isSubmitted) {
                        if (isCorrect) ringClass = 'ring-2 ring-green-500 border-green-500';
                        else if(selectedOption !== undefined) ringClass = 'ring-2 ring-red-500 border-red-500';
                    }

                    return (
                        <div key={pIndex} className="grid grid-cols-2 gap-4 items-center">
                            <div className="text-slate-700 font-medium">{prompt}</div>
                            <div className="relative">
                                <select
                                    value={selectedOption ?? -1}
                                    onChange={(e) => onSelect(pIndex, parseInt(e.target.value))}
                                    disabled={isSubmitted}
                                    className={`block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none sm:text-sm rounded-md transition-all ${ringClass} ${isSubmitted ? '' : 'hover:border-indigo-400'}`}
                                >
                                    <option value={-1} disabled>Seleccionar...</option>
                                    {q.options.map((option, oIndex) => (
                                        <option key={oIndex} value={oIndex}>{option}</option>
                                    ))}
                                </select>
                                {isSubmitted && selectedOption !== undefined && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        {isCorrect ? <CheckIcon className="h-5 w-5 text-green-600" /> : <XIcon className="h-5 w-5 text-red-600" />}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


export default Challenge;