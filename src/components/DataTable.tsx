import React from 'react';
import { generateDistanceDataset } from '../utils/calculator';
import { Table, ArrowUpDown, Filter, Download } from 'lucide-react';

interface DataTableProps {
  currentKm: number;
  onSelectKm: (km: number) => void;
}

export const DataTable: React.FC<DataTableProps> = ({ currentKm, onSelectKm }) => {
  const [filterQuery, setFilterQuery] = React.useState('');
  const dataset = React.useMemo(() => generateDistanceDataset(20, 0.5), []);

  const filtered = React.useMemo(() => {
    if (!filterQuery) return dataset;
    return dataset.filter((row) => row.km.toString().includes(filterQuery));
  }, [dataset, filterQuery]);

  const handleExportCSV = () => {
    const headers = 'km,fare_usd,time_minutes,co2_saved_kg,calories\n';
    const rows = dataset.map((r) => `${r.km},${r.fare},${r.timeMinutes},${r.co2SavedKg},${r.calories}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'heather_train_application_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Table className="w-4 h-4 text-indigo-600" />
            Tidyverse Reactive Tibble (`DistanceData`)
          </h3>
          <p className="text-xs text-slate-500 font-medium">Interactive data frame generated across 0.5 km step increments</p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Search Filter */}
          <div className="relative">
            <Filter className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter km..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:border-indigo-500 font-mono w-32"
            />
          </div>

          {/* Export CSV */}
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto max-h-72 border border-slate-200 rounded-2xl">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead className="bg-slate-100 sticky top-0 border-b border-slate-200 text-slate-700">
            <tr>
              <th className="py-2.5 px-4 font-bold">
                <div className="flex items-center gap-1">
                  Distance (km) <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-2.5 px-4 font-bold">Fare ($ USD)</th>
              <th className="py-2.5 px-4 font-bold">Travel Time (mins)</th>
              <th className="py-2.5 px-4 font-bold">CO₂ Offset (kg)</th>
              <th className="py-2.5 px-4 font-bold">Calories (kcal)</th>
              <th className="py-2.5 px-4 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {filtered.map((row) => {
              const isSelected = row.km === currentKm;
              return (
                <tr
                  key={row.km}
                  onClick={() => onSelectKm(row.km)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-indigo-50/90 font-bold text-indigo-950 border-l-4 border-indigo-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-2 px-4">
                    <span className="flex items-center gap-1.5">
                      {isSelected && <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block" />}
                      {row.km.toFixed(1)} km
                    </span>
                  </td>
                  <td className="py-2 px-4">${row.fare.toFixed(2)}</td>
                  <td className="py-2 px-4">{row.timeMinutes} m</td>
                  <td className="py-2 px-4">{row.co2SavedKg} kg</td>
                  <td className="py-2 px-4">{row.calories} kcal</td>
                  <td className="py-2 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectKm(row.km);
                      }}
                      className={`px-2.5 py-0.5 rounded-lg text-[10px] font-sans font-bold transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                      }`}
                    >
                      {isSelected ? 'Active' : 'Select'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

