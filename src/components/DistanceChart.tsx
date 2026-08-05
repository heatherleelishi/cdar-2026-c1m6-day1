import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceDot,
} from 'recharts';
import { generateDistanceDataset, calculateJourney } from '../utils/calculator';
import { TrendingUp, BarChart2 } from 'lucide-react';

interface DistanceChartProps {
  currentKm: number;
}

export const DistanceChart: React.FC<DistanceChartProps> = ({ currentKm }) => {
  const [metric, setMetric] = React.useState<'fare' | 'timeMinutes' | 'co2SavedKg'>('fare');
  const data = React.useMemo(() => generateDistanceDataset(20, 0.5), []);
  const currentStats = React.useMemo(() => calculateJourney(currentKm, 'commuter'), [currentKm]);

  const metricConfigs = {
    fare: {
      label: 'Estimated Ticket Fare ($ USD)',
      color: '#4f46e5', // indigo-600
      gradientId: 'fareGradient',
      unit: '$',
      value: currentStats.fare,
    },
    timeMinutes: {
      label: 'Travel Time (Minutes)',
      color: '#2563eb', // blue-600
      gradientId: 'timeGradient',
      unit: 'm',
      value: currentStats.travelTimeMinutes,
    },
    co2SavedKg: {
      label: 'CO₂ Emissions Offset (kg)',
      color: '#0d9488', // teal-600
      gradientId: 'co2Gradient',
      unit: 'kg',
      value: currentStats.co2SavedKg,
    },
  };

  const activeConfig = metricConfigs[metric];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-indigo-600" />
            Tidyverse Trend Model Curve
          </h3>
          <p className="text-xs text-slate-500 font-medium">Continuous reactive curve across 0 – 20 km spectrum</p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs">
          <button
            onClick={() => setMetric('fare')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              metric === 'fare' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Fare ($)
          </button>
          <button
            onClick={() => setMetric('timeMinutes')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              metric === 'timeMinutes'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Time (min)
          </button>
          <button
            onClick={() => setMetric('co2SavedKg')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              metric === 'co2SavedKg'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            CO₂ Offset (kg)
          </button>
        </div>
      </div>

      {/* Chart container */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={activeConfig.gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={activeConfig.color} stopOpacity={0.35} />
                <stop offset="95%" stopColor={activeConfig.color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="km"
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tick={{ fill: '#64748b', fontSize: 11 }}
              unit=" km"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px',
                fontFamily: 'monospace',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(val: number) => [`${val} ${activeConfig.unit}`, activeConfig.label]}
              labelFormatter={(lbl: number) => `Distance: ${lbl} km`}
            />
            <Area
              type="monotone"
              dataKey={metric}
              stroke={activeConfig.color}
              strokeWidth={2.5}
              fillOpacity={1}
              fill={`url(#${activeConfig.gradientId})`}
            />
            {/* Reference dot for currently selected slider km */}
            <ReferenceDot
              x={currentKm}
              y={activeConfig.value}
              r={6}
              fill="#0f172a"
              stroke={activeConfig.color}
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3 font-medium">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
          <span>Active marker dot at <strong className="text-slate-900">{currentKm.toFixed(1)} km</strong> ({activeConfig.unit}{activeConfig.value})</span>
        </div>
        <span className="font-mono text-[11px] text-slate-400">Step resolution: 0.5 km</span>
      </div>
    </div>
  );
};

