import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, AlertTriangle, CheckCircle, Shield } from 'lucide-react';

const TabSecurity: React.FC = () => {
  const [useHttps, setUseHttps] = useState(false);
  const [secretsInPayload, setSecretsInPayload] = useState(true);
  const [shortExpiry, setShortExpiry] = useState(false);

  const isSecure = useHttps && !secretsInPayload && shortExpiry;

  return (
    <div className="space-y-6">
      <div className="bg-jwt-card p-6 rounded-xl border border-slate-700 shadow-lg">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-cyan-400">Security Audit</h3>
            {isSecure ? (
                <span className="px-4 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500 rounded-full flex items-center gap-2 font-bold animate-pulse">
                    <CheckCircle size={16}/> Configuration Secure
                </span>
            ) : (
                <span className="px-4 py-1 bg-red-500/20 text-red-400 border border-red-500 rounded-full flex items-center gap-2 font-bold">
                    <AlertTriangle size={16}/> Configuration Insecure
                </span>
            )}
        </div>
        
        <p className="text-slate-300 mb-8">
          JWTs are powerful but dangerous if misconfigured. Adjust the server settings below to achieve a secure configuration.
        </p>

        <div className="space-y-4">
            {/* HTTPS Toggle */}
            <div className={`p-4 rounded-lg border flex items-center justify-between transition-colors ${useHttps ? 'bg-emerald-900/10 border-emerald-900' : 'bg-red-900/10 border-red-900'}`}>
                <div className="flex-1">
                    <h4 className="font-bold text-white mb-1">Transport Layer Security (HTTPS)</h4>
                    <p className="text-sm text-slate-400">Encrypts the token in transit so standard network sniffers cannot read it.</p>
                    {!useHttps && <p className="text-xs text-red-400 mt-2 flex items-center gap-1"><AlertTriangle size={12}/> Warning: High Risk of Interception</p>}
                </div>
                <button onClick={() => setUseHttps(!useHttps)} className="ml-4">
                    {useHttps ? <ToggleRight size={48} className="text-emerald-500" /> : <ToggleLeft size={48} className="text-slate-600" />}
                </button>
            </div>

            {/* Secrets in Payload Toggle */}
            <div className={`p-4 rounded-lg border flex items-center justify-between transition-colors ${!secretsInPayload ? 'bg-emerald-900/10 border-emerald-900' : 'bg-red-900/10 border-red-900'}`}>
                <div className="flex-1">
                    <h4 className="font-bold text-white mb-1">Sensitive Data in Payload</h4>
                    <p className="text-sm text-slate-400">Storing passwords, SSNs, or internal secrets in the JWT payload.</p>
                    {secretsInPayload && <p className="text-xs text-red-400 mt-2 flex items-center gap-1"><AlertTriangle size={12}/> Warning: Payload is Base64 encoded, not encrypted! Anyone can read it.</p>}
                </div>
                <button onClick={() => setSecretsInPayload(!secretsInPayload)} className="ml-4">
                    {secretsInPayload ? <ToggleRight size={48} className="text-red-500" /> : <ToggleLeft size={48} className="text-slate-600" />}
                </button>
            </div>

            {/* Expiry Toggle */}
            <div className={`p-4 rounded-lg border flex items-center justify-between transition-colors ${shortExpiry ? 'bg-emerald-900/10 border-emerald-900' : 'bg-orange-900/10 border-orange-900'}`}>
                <div className="flex-1">
                    <h4 className="font-bold text-white mb-1">Short Expiration Time (exp)</h4>
                    <p className="text-sm text-slate-400">Setting tokens to expire quickly (e.g., 15 mins) limits damage if stolen.</p>
                    {!shortExpiry && <p className="text-xs text-orange-400 mt-2 flex items-center gap-1"><AlertTriangle size={12}/> Warning: If stolen, this token works forever.</p>}
                </div>
                <button onClick={() => setShortExpiry(!shortExpiry)} className="ml-4">
                    {shortExpiry ? <ToggleRight size={48} className="text-emerald-500" /> : <ToggleLeft size={48} className="text-slate-600" />}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TabSecurity;