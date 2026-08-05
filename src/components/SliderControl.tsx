import React from 'react';
import { Sliders, Plus, Minus, RotateCcw } from 'lucide-react';

interface SliderControlProps {
  km: number;
  setKm: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const SliderControl: React.FC<SliderControlProps> = ({
  km,
  setKm,
  min = 0,
  max = 20,
  step = 0.5,
}) => {
  const presets = [1, 5, 10, 15, 20];

  const handleIncrement = () => {
    setKm(Math.min(max, Math.round((km + step) * 10) / 10));
  };

  const handleDecrement = () => {
    setKm(Math.max(min, Math.round((km - step) * 10) / 10));
  };

  const percentage = ((km - min) / (max - min)) * 100;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-100">
            <Sliders className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Session Distance (km)</h2>
            <p className="text-xs text-slate-500 font-medium">Shiny Slider Input • Range 0 – 20 km (Step: 0.5)</p>
          </div>
        </div>

        {/* Current distance highlight */}
        <div className="flex items-baseline gap-1 bg-indigo-50 border border-indigo-200/80 px-3.5 py-1.5 rounded-2xl">
          <span className="text-2xl font-black font-mono text-indigo-600">{km.toFixed(1)}</span>
          <span className="text-xs font-bold text-indigo-900">km</span>
        </div>
      </div>

      {/* Main Range Slider with Indigo Polish */}
      <div className="space-y-4 my-6">
        <div className="relative flex items-center">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={km}
            onChange={(e) => setKm(parseFloat(e.target.value))}
            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-hidden"
            style={{
              background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`,
            }}
          />
        </div>

        {/* Slider Ticks & Labels */}
        <div className="flex justify-between text-xs text-slate-400 font-mono font-semibold px-0.5">
          <span>0 km</span>
          <span>5 km</span>
          <span>10 km</span>
          <span>15 km</span>
          <span>20 km</span>
        </div>
      </div>

      {/* Adjuster controls & presets */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDecrement}
            disabled={km <= min}
            className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 transition-all cursor-pointer"
            title="Decrease 0.5 km"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={handleIncrement}
            disabled={km >= max}
            className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 transition-all cursor-pointer"
            title="Increase 0.5 km"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setKm(5)}
            className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 active:scale-95 text-slate-600 transition-all cursor-pointer"
            title="Reset to default 5km"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center space-x-1.5">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider text-[10px] mr-1">Presets:</span>
          {presets.map((val) => (
            <button
              key={val}
              onClick={() => setKm(val)}
              className={`px-3 py-1 text-xs rounded-xl font-mono font-bold border transition-all cursor-pointer ${
                km === val
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm shadow-indigo-200'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {val} km
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

