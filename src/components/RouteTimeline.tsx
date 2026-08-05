import React from 'react';
import { ALL_STATIONS } from '../utils/calculator';
import { MapPin, Train } from 'lucide-react';

interface RouteTimelineProps {
  km: number;
}

export const RouteTimeline: React.FC<RouteTimelineProps> = ({ km }) => {
  const maxKm = 20;
  const trainPercentage = Math.min(100, Math.max(0, (km / maxKm) * 100));

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-600" />
            Interactive Train Corridor Simulator
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Stations automatically highlighted based on current slider target ({km.toFixed(1)} km)
          </p>
        </div>
        <div className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-200">
          {km.toFixed(1)} / 20.0 km
        </div>
      </div>

      {/* Visual Train Track Container */}
      <div className="relative py-8 px-2 my-2">
        {/* Track Base Line */}
        <div className="h-2.5 bg-slate-100 rounded-full w-full relative border border-slate-200/60">
          {/* Active Track Progress */}
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${trainPercentage}%` }}
          />
        </div>

        {/* Animated Train Icon position */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300 ease-out z-20"
          style={{ left: `calc(${trainPercentage}% + 8px)` }}
        >
          <div className="bg-slate-900 text-white px-2.5 py-1.5 rounded-xl shadow-lg border border-slate-700 flex items-center gap-1.5 transform hover:scale-110 transition-transform">
            <Train className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span className="text-[10px] font-mono font-extrabold">{km.toFixed(1)}km</span>
          </div>
        </div>

        {/* Stations along the track */}
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-between items-center pointer-events-none px-1">
          {ALL_STATIONS.map((station) => {
            const stationPercent = (station.distanceKm / maxKm) * 100;
            const isPassed = km >= station.distanceKm;
            const isExact = Math.abs(km - station.distanceKm) < 0.25;

            return (
              <div
                key={station.id}
                className="absolute transform -translate-x-1/2 flex flex-col items-center pointer-events-auto"
                style={{ left: `${stationPercent}%` }}
              >
                {/* Station Pin Indicator */}
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                    isExact
                      ? 'bg-indigo-600 border-indigo-900 ring-4 ring-indigo-100 scale-125'
                      : isPassed
                      ? 'bg-indigo-600 border-indigo-700'
                      : 'bg-white border-slate-300'
                  }`}
                >
                  {station.type === 'terminal' && (
                    <div className={`w-1.5 h-1.5 rounded-full ${isPassed ? 'bg-white' : 'bg-slate-400'}`} />
                  )}
                </div>

                {/* Station Name & Distance Tag */}
                <div className="mt-3 text-center max-w-[95px]">
                  <p
                    className={`text-[11px] font-semibold leading-tight truncate ${
                      isPassed ? 'text-slate-900' : 'text-slate-400'
                    }`}
                    title={station.name}
                  >
                    {station.name}
                  </p>
                  <span className="text-[10px] font-mono text-slate-400 font-medium">{station.distanceKm} km</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

