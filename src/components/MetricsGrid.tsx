import React from 'react';
import { Clock, DollarSign, Leaf, Footprints, Gauge } from 'lucide-react';
import { calculateJourney } from '../utils/calculator';

interface MetricsGridProps {
  km: number;
  trainType: 'express' | 'commuter' | 'light_rail';
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({ km, trainType }) => {
  const stats = calculateJourney(km, trainType);

  const cards = [
    {
      id: 'time',
      title: 'Estimated Travel Time',
      value: `${stats.travelTimeMinutes}`,
      unit: 'mins',
      subtext: `At ~${stats.speed} km/h avg speed (${stats.estimatedStops} stops)`,
      icon: Clock,
      color: 'border-slate-200 bg-white text-slate-900',
      iconBg: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    },
    {
      id: 'fare',
      title: 'Estimated Train Fare',
      value: `$${stats.fare.toFixed(2)}`,
      unit: 'USD',
      subtext: `Tidymodel rate: $2.50 base + distance factor`,
      icon: DollarSign,
      color: 'border-slate-200 bg-white text-slate-900',
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    },
    {
      id: 'co2',
      title: 'Carbon Offset vs. Driving',
      value: `${stats.co2SavedKg}`,
      unit: 'kg CO₂',
      subtext: `Avoided standard auto emissions for ${km} km`,
      icon: Leaf,
      color: 'border-slate-200 bg-white text-slate-900',
      iconBg: 'bg-teal-50 text-teal-600 border border-teal-100',
    },
    {
      id: 'activity',
      title: 'Active Health Benefit',
      value: `${stats.calories}`,
      unit: 'kcal',
      subtext: `~${stats.steps.toLocaleString()} steps transit movement`,
      icon: Footprints,
      color: 'border-slate-200 bg-white text-slate-900',
      iconBg: 'bg-slate-100 text-slate-700 border border-slate-200',
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Gauge className="w-3.5 h-3.5 text-indigo-600" />
          Journey Metrics Breakdown
        </h3>
        <span className="text-xs text-slate-400 font-mono font-medium">tidymodels calculation engine</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`rounded-2xl border p-5 transition-all duration-200 hover:shadow-md ${card.color}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{card.title}</span>
                <div className={`p-2 rounded-xl ${card.iconBg}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline space-x-1.5 mb-1">
                <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">{card.value}</span>
                <span className="text-xs font-semibold text-slate-400">{card.unit}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight font-medium">{card.subtext}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

