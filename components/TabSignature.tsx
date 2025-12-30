import React, { useState, useEffect } from 'react';
import { base64UrlEncode, mockSignature } from '../utils/jwtHelpers';
import { ShieldAlert, ShieldCheck, Lock, Unlock } from 'lucide-react';

const TabSignature: React.FC = () => {
  // Initial Valid State
  const secret = "mySuperSecretKey";
  const [role, setRole] = useState("user");
  const [header] = useState('{"alg":"HS256","typ":"JWT"}');
  
  // State for the simulation
  const [tamperedRole, setTamperedRole] = useState("user");
  const [status, setStatus] = useState<'valid' | 'invalid' | 'unchecked'>('valid');

  // Derived values
  const encodedHeader = base64UrlEncode(header);
  
  // The "Official" valid signature stored on the token
  const validPayload = JSON.stringify({ role: "user" });
  const validEncodedPayload = base64UrlEncode(validPayload);
  const validSignature = mockSignature(encodedHeader, validEncodedPayload, secret);

  // The "Current" values based on what the hacker has changed
  const currentPayload = JSON.stringify({ role: tamperedRole });
  const currentEncodedPayload = base64UrlEncode(currentPayload);
  
  // We keep the signature FIXED to the original valid one to simulate tampering
  // i.e., the hacker changed the payload but cannot compute a new valid signature without the secret
  const displayedToken = `${encodedHeader}.${currentEncodedPayload}.${validSignature}`;

  const handleTamper = () => {
    setTamperedRole("admin");
    setStatus('unchecked');
  };

  const handleVerify = () => {
    // Server recalculates signature based on the received payload and its secret
    const calculatedSignature = mockSignature(encodedHeader, currentEncodedPayload, secret);
    
    // Compare calculated vs attached
    if (calculatedSignature === validSignature) {
        setStatus('valid');
    } else {
        setStatus('invalid');
    }
  };

  const handleReset = () => {
    setTamperedRole("user");
    setStatus('valid');
  };

  return (
    <div className="space-y-6">
      <div className="bg-jwt-card p-6 rounded-xl border border-slate-700 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-cyan-400">Signature Verification & Tampering</h3>
        <p className="text-slate-300 mb-6">
          The signature protects the token integrity. If a hacker changes the payload (e.g., giving themselves admin rights), they cannot generate a matching signature without the server's secret key.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Hacker View */}
            <div className="p-4 bg-slate-900 rounded-lg border border-red-900/50">
                <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                    <Unlock size={18}/> Hacker Action
                </h4>
                <div className="mb-4">
                    <p className="text-sm text-slate-400 mb-1">Payload Content:</p>
                    <div className="font-mono bg-black p-2 rounded text-jwt-payload">
                        {`{ "role": "${tamperedRole}" }`}
                    </div>
                </div>
                <button 
                    onClick={handleTamper}
                    disabled={tamperedRole === "admin"}
                    className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded font-bold transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                >
                    Tamper Payload (Set Admin)
                </button>
            </div>

            {/* Server View */}
            <div className="p-4 bg-slate-900 rounded-lg border border-emerald-900/50">
                <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2">
                    <Lock size={18}/> Server Validation
                </h4>
                <div className="mb-4">
                    <p className="text-sm text-slate-400 mb-1">Server Secret:</p>
                    <div className="font-mono bg-black p-2 rounded text-yellow-500 flex justify-between items-center">
                        <span>************</span>
                        <span className="text-xs text-slate-500">(Hidden)</span>
                    </div>
                </div>
                <button 
                    onClick={handleVerify}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded font-bold transition-all shadow-[0_0_15px_rgba(5,150,105,0.5)]"
                >
                    Verify Token Signature
                </button>
            </div>
        </div>

        {/* The Token Display */}
        <div className="bg-black p-4 rounded-lg border border-slate-700 mb-6">
            <p className="text-xs text-slate-500 mb-2">Token sent to server:</p>
            <div className="font-mono break-all text-lg">
                <span className="text-jwt-header opacity-50">{encodedHeader}</span>
                <span className="text-slate-600">.</span>
                <span className={`transition-all duration-300 ${tamperedRole === 'admin' ? 'text-red-500 font-bold bg-red-900/30' : 'text-jwt-payload'}`}>
                    {currentEncodedPayload}
                </span>
                <span className="text-slate-600">.</span>
                <span className="text-jwt-signature">{validSignature}</span>
            </div>
        </div>

        {/* Validation Result */}
        {status === 'invalid' && (
            <div className="bg-red-900/30 border border-red-500 p-4 rounded-lg flex items-center gap-4 animate-pulse">
                <ShieldAlert size={48} className="text-red-500" />
                <div>
                    <h4 className="text-xl font-bold text-red-400">INVALID SIGNATURE DETECTED</h4>
                    <p className="text-red-200">The server recalculated the signature using the payload "admin" and the secret key. It did NOT match the signature attached to the token. Request Rejected.</p>
                </div>
                <button onClick={handleReset} className="ml-auto underline text-red-300 hover:text-white">Reset</button>
            </div>
        )}

        {status === 'valid' && tamperedRole === 'user' && (
             <div className="bg-emerald-900/30 border border-emerald-500 p-4 rounded-lg flex items-center gap-4">
             <ShieldCheck size={48} className="text-emerald-500" />
             <div>
                 <h4 className="text-xl font-bold text-emerald-400">Signature Verified</h4>
                 <p className="text-emerald-200">The token is authentic and has not been altered.</p>
             </div>
         </div>
        )}
      </div>
    </div>
  );
};

export default TabSignature;