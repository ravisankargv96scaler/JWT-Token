import React, { useState } from 'react';
import { HelpCircle, Check, X, RefreshCw } from 'lucide-react';

const questions = [
  {
    question: "Is the information inside a JWT payload encrypted by default?",
    options: ["Yes, completely secure", "No, it's just Base64 encoded", "Only the header is encrypted"],
    correct: 1,
    explanation: "Correct! The payload is Base64Url encoded, meaning anyone who intercepts the token can decode and read it. Never put secrets like passwords in the payload."
  },
  {
    question: "Which part of the JWT is used to verify that the token hasn't been tampered with?",
    options: ["The Header", "The Payload", "The Signature"],
    correct: 2,
    explanation: "Correct! The signature is calculated using the header, payload, and a secret key. If any part changes, the signature won't match."
  },
  {
    question: "Where is the best place to store the secret key used to sign tokens?",
    options: ["In the Client's local storage", "On the Server only", "In the Token payload"],
    correct: 1,
    explanation: "Correct! The secret key must stay on the server. If a client gets it, they can mint their own fake tokens with admin privileges."
  }
];

const TabQuiz: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === questions[currentQ].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="bg-jwt-card p-8 rounded-xl border border-slate-700 shadow-lg text-center flex flex-col items-center justify-center min-h-[400px]">
        <h3 className="text-2xl font-bold mb-4 text-white">Quiz Complete!</h3>
        <div className="text-6xl mb-6 font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            {score} / {questions.length}
        </div>
        <p className="text-slate-400 mb-8">
            {score === 3 ? "Perfect Score! You are a JWT Master." : "Good effort! Review the sections to get a perfect score."}
        </p>
        <button onClick={reset} className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-bold transition-all">
            <RefreshCw size={20}/> Try Again
        </button>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="bg-jwt-card p-6 rounded-xl border border-slate-700 shadow-lg min-h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
            <HelpCircle /> Question {currentQ + 1} of {questions.length}
        </h3>
        <span className="text-slate-400 text-sm">Score: {score}</span>
      </div>

      <h4 className="text-lg text-white mb-6 font-medium">{q.question}</h4>

      <div className="space-y-3 mb-8">
        {q.options.map((opt, idx) => {
            let btnClass = "w-full text-left p-4 rounded-lg border transition-all ";
            if (selected === null) {
                btnClass += "border-slate-600 hover:bg-slate-800 hover:border-cyan-500 text-slate-300";
            } else if (idx === q.correct) {
                btnClass += "bg-emerald-900/30 border-emerald-500 text-emerald-400";
            } else if (selected === idx) {
                btnClass += "bg-red-900/30 border-red-500 text-red-400";
            } else {
                btnClass += "border-slate-700 text-slate-500 opacity-50";
            }

            return (
                <button 
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={selected !== null}
                    className={btnClass}
                >
                    <div className="flex justify-between items-center">
                        <span>{opt}</span>
                        {selected !== null && idx === q.correct && <Check size={20} />}
                        {selected === idx && idx !== q.correct && <X size={20} />}
                    </div>
                </button>
            )
        })}
      </div>

      {selected !== null && (
        <div className="animate-fade-in">
            <div className="bg-slate-900 p-4 rounded-lg border-l-4 border-cyan-500 mb-6 text-slate-300 text-sm">
                <span className="font-bold text-cyan-400 block mb-1">Explanation:</span>
                {q.explanation}
            </div>
            <div className="flex justify-end">
                <button 
                    onClick={nextQuestion}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg font-bold"
                >
                    {currentQ === questions.length - 1 ? "See Results" : "Next Question"}
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default TabQuiz;