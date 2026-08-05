import React from 'react';
import { Terminal, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ReadoutCardProps {
  km: number;
  userId: string;
}

export const ReadoutCard: React.FC<ReadoutCardProps> = ({ km, userId }) => {
  const [copied, setCopied] = React.useState(false);

  const formattedKmStr = km.toString();
  const readoutText = `Hello, ${userId} ${formattedKmStr}km.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(readoutText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-sm border border-slate-200 relative overflow-hidden flex flex-col justify-between">
      {/* Decorative Radial Grid Background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Header bar */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-[0.18em]">
            Primary Telemetry Readout
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Status: Active
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            title="Copy string"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Output</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hero Display Box */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 my-2 relative z-10 text-center shadow-2xs">
        <div className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-400 mb-2">
          Reactive Output (`renderText`)
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={readoutText}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug"
          >
            Hello, {userId} <span className="text-indigo-600 font-extrabold">{formattedKmStr}</span>km.
          </motion.div>
        </AnimatePresence>

        <div className="h-1 w-24 bg-indigo-600 mx-auto rounded-full mt-3" />
      </div>

      {/* Footer Info */}
      <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-500 relative z-10 gap-2 border-t border-slate-100 pt-3">
        <div className="flex items-center space-x-1.5 font-mono text-[11px]">
          <Terminal className="w-3.5 h-3.5 text-indigo-600" />
          <span>paste0("Hello, user 00 ", input$km, "km.")</span>
        </div>
        <span className="text-[11px] font-semibold text-slate-400">R-Shiny Reactive Binding</span>
      </div>
    </div>
  );
};

