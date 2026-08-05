import React from 'react';
import { X, Copy, Check, FileCode2, Sparkles } from 'lucide-react';
import { ORIGINAL_R_CODE } from '../utils/calculator';

interface RCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RCodeModal: React.FC<RCodeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(ORIGINAL_R_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 w-full max-w-3xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center space-x-2">
            <FileCode2 className="w-5 h-5 text-indigo-400" />
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-tight">Original R Shiny Codebase</h2>
              <p className="text-xs text-slate-400 font-mono">pacman :: p_load(tidyverse, tidymodels, shiny)</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy R Code</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-x-auto max-h-[60vh] font-mono text-xs bg-slate-950 text-indigo-300 leading-relaxed border-b border-slate-800">
          <pre className="whitespace-pre">{ORIGINAL_R_CODE}</pre>
        </div>

        {/* Modal Footer / R Shiny Breakdown */}
        <div className="bg-slate-900 p-5 text-xs text-slate-400 space-y-3">
          <div className="flex items-center gap-1.5 text-slate-200 font-bold uppercase tracking-wider text-[11px]">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            R Shiny Translation Architecture
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-indigo-400 font-mono font-bold block mb-1">UI Component (`sliderInput`)</span>
              Maps to reactive slider state (range 0–20km, step 0.5, default 5km).
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-indigo-400 font-mono font-bold block mb-1">Server Function (`renderText`)</span>
              Executes <code className="text-slate-200 font-mono bg-slate-800 px-1 py-0.5 rounded">paste0("Hello, user 00 ", input$km, "km.")</code> upon state updates.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

