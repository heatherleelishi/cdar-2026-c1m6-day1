import { useState } from 'react';
import { Header } from './components/Header';
import { SliderControl } from './components/SliderControl';
import { ReadoutCard } from './components/ReadoutCard';
import { MetricsGrid } from './components/MetricsGrid';
import { RouteTimeline } from './components/RouteTimeline';
import { DistanceChart } from './components/DistanceChart';
import { DataTable } from './components/DataTable';
import { RCodeModal } from './components/RCodeModal';
import { Train, Info } from 'lucide-react';

export default function App() {
  const [km, setKm] = useState<number>(5.0);
  const [userId, setUserId] = useState<string>('user 00');
  const [trainType, setTrainType] = useState<'express' | 'commuter' | 'light_rail'>('commuter');
  const [showRCode, setShowRCode] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* App Header */}
      <Header
        userId={userId}
        setUserId={setUserId}
        trainType={trainType}
        setTrainType={setTrainType}
        showRCode={showRCode}
        setShowRCode={setShowRCode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Section: Interactive Readout & Slider Control */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Shiny Readout (Hero Banner) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <ReadoutCard km={km} userId={userId} />

            {/* Quick Summary Banner */}
            <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-4 flex items-start space-x-3 text-indigo-950 text-xs">
              <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold mb-0.5 uppercase text-[10px] tracking-wider text-indigo-700">R Shiny Reactive Engine</p>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Adjusting the slider instantly re-executes the server text renderer. Output preserves exact <code className="bg-white border border-indigo-200/80 px-1 py-0.5 rounded font-mono text-indigo-900 font-bold">paste0</code> string concatenation.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Distance Slider Control */}
          <div className="lg:col-span-7 flex flex-col">
            <SliderControl km={km} setKm={setKm} min={0} max={20} step={0.5} />
          </div>
        </div>

        {/* Middle Section: Metrics Grid */}
        <MetricsGrid km={km} trainType={trainType} />

        {/* Corridor Simulator */}
        <RouteTimeline km={km} />

        {/* Analytics & Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DistanceChart currentKm={km} />
          <DataTable currentKm={km} onSelectKm={setKm} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-slate-700 font-semibold">
            <Train className="w-4 h-4 text-indigo-600" />
            <span>Heather's Application // Train • Powered by React & R Shiny Engine</span>
          </div>
          <p className="text-slate-400 font-mono text-[11px]">
            Shiny UI Architecture: <code className="font-mono bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-700">fluidPage + titlePanel + sliderInput + textOutput</code>
          </p>
        </div>
      </footer>

      {/* R Code Modal */}
      <RCodeModal isOpen={showRCode} onClose={() => setShowRCode(false)} />
    </div>
  );
}

