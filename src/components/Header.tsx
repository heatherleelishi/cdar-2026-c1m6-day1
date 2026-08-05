import React from 'react';
import { Train, Code2, User, Sparkles } from 'lucide-react';

interface HeaderProps {
  userId: string;
  setUserId: (id: string) => void;
  trainType: 'express' | 'commuter' | 'light_rail';
  setTrainType: (type: 'express' | 'commuter' | 'light_rail') => void;
  showRCode: boolean;
  setShowRCode: (show: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  userId,
  setUserId,
  trainType,
  setTrainType,
  setShowRCode,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Title */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-xs">
            <Train className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-slate-800 uppercase">
                Heather's Application <span className="text-indigo-600 font-extrabold">//</span> Train
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-indigo-600" /> Shiny App Engine
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Precision Distance Readout & Journey Analytics • R Shiny Engine
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* User selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700">
            <User className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-semibold text-slate-500 uppercase text-[10px] tracking-wider">User:</span>
            <select
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="bg-transparent font-bold text-slate-900 focus:outline-hidden cursor-pointer"
            >
              <option value="user 00">user 00</option>
              <option value="user 01">user 01</option>
              <option value="user 02">user 02</option>
              <option value="Heather A.">Heather A.</option>
            </select>
          </div>

          {/* Train Mode selector */}
          <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-lg p-1 text-xs">
            <button
              onClick={() => setTrainType('commuter')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                trainType === 'commuter'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Commuter (45 km/h)
            </button>
            <button
              onClick={() => setTrainType('express')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                trainType === 'express'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Express (65 km/h)
            </button>
          </div>

          {/* R Shiny Code View button */}
          <button
            onClick={() => setShowRCode(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
          >
            <Code2 className="w-3.5 h-3.5 text-indigo-600" />
            View R Shiny Code
          </button>
        </div>
      </div>
    </header>
  );
};

