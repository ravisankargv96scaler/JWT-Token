import React, { useState } from 'react';
import { Layers, Box, PenTool, GitMerge, ShieldCheck, GraduationCap } from 'lucide-react';
import TabConcept from './components/TabConcept';
import TabAnatomy from './components/TabAnatomy';
import TabSignature from './components/TabSignature';
import TabFlow from './components/TabFlow';
import TabSecurity from './components/TabSecurity';
import TabQuiz from './components/TabQuiz';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: "Concept", icon: Layers, component: <TabConcept /> },
    { id: 1, label: "Anatomy", icon: Box, component: <TabAnatomy /> },
    { id: 2, label: "Signature", icon: PenTool, component: <TabSignature /> },
    { id: 3, label: "Flow", icon: GitMerge, component: <TabFlow /> },
    { id: 4, label: "Security", icon: ShieldCheck, component: <TabSecurity /> },
    { id: 5, label: "Quiz", icon: GraduationCap, component: <TabQuiz /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    <span className="font-bold text-white text-lg">JWT</span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    Masterclass
                </h1>
            </div>
            <div className="text-xs md:text-sm text-slate-500 font-mono hidden sm:block">
                JSON Web Token Interactive Guide
            </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Tab Navigation */}
        <nav className="flex overflow-x-auto gap-2 mb-8 pb-2 scrollbar-hide">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap
                            ${isActive 
                                ? 'bg-slate-800 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.1)] border border-cyan-900' 
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'}
                        `}
                    >
                        <Icon size={18} />
                        {tab.label}
                    </button>
                )
            })}
        </nav>

        {/* Content Area */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {tabs[activeTab].component}
        </div>

      </main>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-slate-600 text-sm">
        <p>Interactive Educational Tool &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default App;