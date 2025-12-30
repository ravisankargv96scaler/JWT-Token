import React, { useState, useEffect } from 'react';
import { base64UrlEncode, mockSignature } from '../utils/jwtHelpers';

const TabAnatomy: React.FC = () => {
  const [headerJson, setHeaderJson] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [payloadJson, setPayloadJson] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "admin": true\n}');
  const [encodedJwt, setEncodedJwt] = useState({ header: '', payload: '', signature: '' });

  useEffect(() => {
    // Live encoding logic
    const safeEncode = (json: string) => {
        try {
            // Validate JSON to avoid crash, but encode string directly to allow typing
            JSON.parse(json); 
            return base64UrlEncode(json.replace(/\s/g, '')); // Minify before encoding for realism
        } catch(e) {
             return base64UrlEncode(json); // Fallback to raw string encoding
        }
    };

    const headerEnc = safeEncode(headerJson);
    const payloadEnc = safeEncode(payloadJson);
    const sigEnc = mockSignature(headerEnc, payloadEnc, "secret");

    setEncodedJwt({
      header: headerEnc,
      payload: payloadEnc,
      signature: sigEnc
    });
  }, [headerJson, payloadJson]);

  return (
    <div className="space-y-6">
      <div className="bg-jwt-card p-6 rounded-xl border border-slate-700 shadow-lg">
        <h3 className="text-xl font-bold mb-2 text-cyan-400">JWT Anatomy: Encoder</h3>
        <p className="text-slate-400 mb-6">
          A JWT is just three Base64Url encoded strings joined by dots. Edit the JSON below to see the token update in real-time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Header */}
          <div className="space-y-2">
            <h4 className="font-bold text-jwt-header">Header</h4>
            <p className="text-xs text-slate-500">Algorithm & Token Type</p>
            <textarea
              value={headerJson}
              onChange={(e) => setHeaderJson(e.target.value)}
              className="w-full h-40 bg-slate-900 border border-jwt-header/50 rounded-lg p-3 text-sm font-mono text-jwt-header focus:outline-none focus:ring-2 focus:ring-jwt-header"
            />
          </div>

          {/* Payload */}
          <div className="space-y-2">
            <h4 className="font-bold text-jwt-payload">Payload</h4>
            <p className="text-xs text-slate-500">Data (Claims)</p>
            <textarea
              value={payloadJson}
              onChange={(e) => setPayloadJson(e.target.value)}
              className="w-full h-40 bg-slate-900 border border-jwt-payload/50 rounded-lg p-3 text-sm font-mono text-jwt-payload focus:outline-none focus:ring-2 focus:ring-jwt-payload"
            />
          </div>

          {/* Signature */}
          <div className="space-y-2">
            <h4 className="font-bold text-jwt-signature">Signature</h4>
            <p className="text-xs text-slate-500">HMACSHA256(base64(h)+"."+base64(p), secret)</p>
            <div className="w-full h-40 bg-slate-900 border border-jwt-signature/50 rounded-lg p-3 text-sm font-mono text-jwt-signature flex items-center justify-center text-center opacity-75 cursor-not-allowed select-none">
              (Calculated Automatically based on Header + Payload + Secret)
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="mt-8">
          <h4 className="font-bold text-white mb-2">Encoded JWT Token</h4>
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-700 break-all font-mono text-lg leading-relaxed shadow-inner">
            <span className="text-jwt-header transition-colors duration-300">{encodedJwt.header}</span>
            <span className="text-slate-500">.</span>
            <span className="text-jwt-payload transition-colors duration-300">{encodedJwt.payload}</span>
            <span className="text-slate-500">.</span>
            <span className="text-jwt-signature transition-colors duration-300">{encodedJwt.signature}</span>
          </div>
          <p className="text-xs text-center mt-2 text-slate-500">
            Note: The dots (.) separate the three components.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TabAnatomy;