import React, { useState } from 'react';
import { Server, User, Database, CheckCircle, XCircle } from 'lucide-react';

const TabConcept: React.FC = () => {
  const [servers, setServers] = useState<number[]>([1]);

  const addServer = () => {
    if (servers.length < 4) {
      setServers([...servers, servers.length + 1]);
    }
  };

  const resetServers = () => setServers([1]);

  return (
    <div className="space-y-8">
      <div className="bg-jwt-card p-6 rounded-xl border border-slate-700 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-cyan-400">The Scaling Problem</h3>
        <p className="text-slate-300 mb-6">
          Compare how traditional Sessions and JWTs handle scaling when you add more servers.
        </p>
        
        <div className="flex gap-4 mb-6">
          <button 
            onClick={addServer}
            disabled={servers.length >= 4}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <Server size={18} /> Add Server Node
          </button>
          <button 
            onClick={resetServers}
            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Session Based */}
          <div className="border border-slate-600 rounded-lg p-4 bg-slate-900/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
            <h4 className="font-bold text-red-400 mb-4 flex items-center gap-2">
              <Database size={20} /> Session Based (Stateful)
            </h4>
            <div className="space-y-2">
              <p className="text-sm text-slate-400 mb-4">User data is stored in Server 1's RAM/DB. Other servers don't know about it.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                {servers.map((id) => (
                  <div key={id} className={`relative p-4 rounded-lg border-2 flex flex-col items-center w-32 transition-all duration-500 ${id === 1 ? 'border-emerald-500 bg-emerald-900/20' : 'border-red-500 bg-red-900/20'}`}>
                    <Server size={32} className="text-slate-200 mb-2" />
                    <span className="text-xs font-mono text-slate-400">Server #{id}</span>
                    <div className={`mt-2 text-xs font-bold ${id === 1 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {id === 1 ? 'Data Found' : 'Missing Data'}
                    </div>
                    {id !== 1 && (
                      <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 shadow-lg shadow-red-500/50">
                        <XCircle size={16} className="text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <div className="flex flex-col items-center animate-bounce">
                  <User size={32} className="text-cyan-300" />
                  <span className="text-xs text-cyan-300 mt-1">Client (SessionID: 123)</span>
                </div>
              </div>
              <p className="text-center text-xs text-red-300 mt-2 bg-red-900/20 p-2 rounded">
                Client is stuck to Server #1. If routed to Server #{servers.length > 1 ? '2' : '1'}, auth fails unless we use sticky sessions or Redis.
              </p>
            </div>
          </div>

          {/* JWT Based */}
          <div className="border border-slate-600 rounded-lg p-4 bg-slate-900/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
            <h4 className="font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <CheckCircle size={20} /> Token Based (Stateless)
            </h4>
            <div className="space-y-2">
              <p className="text-sm text-slate-400 mb-4">User data is inside the Token. Any server can verify the signature.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                {servers.map((id) => (
                  <div key={id} className="relative p-4 rounded-lg border-2 border-emerald-500 bg-emerald-900/20 flex flex-col items-center w-32 transition-all duration-500">
                    <Server size={32} className="text-slate-200 mb-2" />
                    <span className="text-xs font-mono text-slate-400">Server #{id}</span>
                    <div className="mt-2 text-xs font-bold text-emerald-400">
                      Valid Sig
                    </div>
                    <div className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-1 shadow-lg shadow-emerald-500/50">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <div className="flex flex-col items-center animate-bounce">
                  <User size={32} className="text-purple-300" />
                  <span className="text-xs text-purple-300 mt-1">Client (Holds JWT)</span>
                </div>
              </div>
              <p className="text-center text-xs text-emerald-300 mt-2 bg-emerald-900/20 p-2 rounded">
                Client sends JWT. Any server can mathematically verify it without checking a database.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabConcept;