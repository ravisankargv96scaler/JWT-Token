import React, { useState } from 'react';
import { User, Server, Database, ArrowRight, FileKey, Shield } from 'lucide-react';

const TabFlow: React.FC = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { title: "Idle", desc: "User is not logged in." },
    { title: "Login Request", desc: "Client sends credentials (username/password) to Auth Server." },
    { title: "Token Issuance", desc: "Auth Server validates credentials, signs a JWT, and returns it." },
    { title: "Resource Request", desc: "Client requests data, sending JWT in the Authorization header." },
    { title: "Access Granted", desc: "API validates the JWT signature and returns the protected data." },
  ];

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const reset = () => setStep(0);

  return (
    <div className="space-y-6">
      <div className="bg-jwt-card p-6 rounded-xl border border-slate-700 shadow-lg min-h-[500px] flex flex-col">
        <h3 className="text-xl font-bold mb-4 text-cyan-400">Authentication Flow</h3>
        
        {/* Controls */}
        <div className="flex justify-between items-center mb-8 bg-slate-900 p-4 rounded-lg">
            <div>
                <span className="text-slate-400 text-sm uppercase tracking-wider">Step {step} of 4</span>
                <h4 className="text-lg font-bold text-white">{steps[step].title}</h4>
                <p className="text-sm text-slate-400">{steps[step].desc}</p>
            </div>
            <div className="flex gap-2">
                <button onClick={reset} className="px-4 py-2 text-slate-400 hover:text-white">Reset</button>
                <button 
                    onClick={nextStep} 
                    disabled={step === 4}
                    className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all"
                >
                    {step === 4 ? "Done" : "Next Step"}
                </button>
            </div>
        </div>

        {/* Diagram Area */}
        <div className="flex-1 relative bg-slate-900/50 rounded-lg border border-slate-800 p-8 flex justify-between items-center px-12 overflow-hidden">
            
            {/* Actors */}
            <div className="flex flex-col items-center z-10">
                <div className={`p-4 rounded-full bg-slate-800 border-2 ${step > 0 ? 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'border-slate-600'}`}>
                    <User size={40} className="text-white" />
                </div>
                <span className="mt-2 font-bold text-slate-300">Client</span>
                {step >= 2 && (
                    <div className="mt-2 flex items-center gap-1 bg-slate-800 px-2 py-1 rounded border border-purple-500 animate-fade-in-up">
                        <FileKey size={14} className="text-purple-400" />
                        <span className="text-[10px] text-purple-400 font-mono">JWT</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center z-10">
                <div className={`p-4 rounded-full bg-slate-800 border-2 ${step === 1 || step === 2 ? 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'border-slate-600'}`}>
                    <Shield size={40} className="text-white" />
                </div>
                <span className="mt-2 font-bold text-slate-300">Auth Server</span>
            </div>

            <div className="flex flex-col items-center z-10">
                <div className={`p-4 rounded-full bg-slate-800 border-2 ${step >= 3 ? 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'border-slate-600'}`}>
                    <Server size={40} className="text-white" />
                </div>
                <span className="mt-2 font-bold text-slate-300">Resource API</span>
            </div>

            {/* Animations / Connections */}
            
            {/* Step 1: Login */}
            {step === 1 && (
                <div className="absolute top-1/3 left-[15%] w-[35%] h-1 bg-cyan-900 overflow-hidden">
                    <div className="w-full h-full bg-cyan-400 animate-slide-right"></div>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-cyan-400 font-mono">POST /login</span>
                </div>
            )}

            {/* Step 2: JWT Return */}
            {step === 2 && (
                <div className="absolute top-1/2 left-[15%] w-[35%] h-1 bg-purple-900/50 overflow-hidden transform rotate-180">
                    <div className="w-full h-full bg-purple-500 animate-slide-right"></div>
                    <span className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-purple-400 font-mono transform rotate-180">Return JWT</span>
                </div>
            )}

             {/* Step 3: Request with Token */}
             {step === 3 && (
                <div className="absolute top-1/3 right-[15%] w-[35%] h-1 bg-cyan-900 overflow-hidden">
                    <div className="w-full h-full bg-cyan-400 animate-slide-right"></div>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-cyan-400 font-mono">GET /data (Auth: Bearer JWT)</span>
                </div>
            )}

             {/* Step 4: Data Return */}
             {step === 4 && (
                <div className="absolute top-1/2 right-[15%] w-[35%] h-1 bg-emerald-900/50 overflow-hidden transform rotate-180">
                    <div className="w-full h-full bg-emerald-500 animate-slide-right"></div>
                    <span className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-emerald-400 font-mono transform rotate-180">200 OK (JSON Data)</span>
                </div>
            )}

        </div>
      </div>
      <style>{`
        @keyframes slide-right {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        .animate-slide-right {
            animation: slide-right 1.5s infinite linear;
        }
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TabFlow;