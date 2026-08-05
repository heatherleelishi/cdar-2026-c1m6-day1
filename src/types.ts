export interface AppState {
  km: number;
  userId: string;
  showRCode: boolean;
  trainType: 'express' | 'commuter' | 'light_rail';
}

export interface MetricCardData {
  id: string;
  label: string;
  value: string;
  unit: string;
  subtext: string;
  iconName: string;
  color: string;
}

export interface RouteStation {
  id: string;
  name: string;
  distanceKm: number;
  reached: boolean;
  type: 'major' | 'minor' | 'terminal';
}

export interface DistanceDataPoint {
  km: number;
  fare: number;
  timeMinutes: number;
  co2SavedKg: number;
  calories: number;
}
