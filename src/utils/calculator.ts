import { DistanceDataPoint, RouteStation } from '../types';

export const ALL_STATIONS: RouteStation[] = [
  { id: 'st-0', name: 'Central Union Station', distanceKm: 0, reached: true, type: 'terminal' },
  { id: 'st-1', name: 'Civic Center & Museum', distanceKm: 2.5, reached: false, type: 'minor' },
  { id: 'st-2', name: 'West Park Station', distanceKm: 5.0, reached: false, type: 'major' },
  { id: 'st-3', name: 'University Heights', distanceKm: 8.5, reached: false, type: 'minor' },
  { id: 'st-4', name: 'Tech Quarter', distanceKm: 12.0, reached: false, type: 'major' },
  { id: 'st-5', name: 'North End Boulevard', distanceKm: 15.5, reached: false, type: 'minor' },
  { id: 'st-6', name: 'Suburban Gateway Terminal', distanceKm: 20.0, reached: false, type: 'terminal' },
];

export function calculateJourney(km: number, trainType: 'express' | 'commuter' | 'light_rail' = 'commuter') {
  // Speed in km/h
  const speeds = {
    express: 65,
    commuter: 45,
    light_rail: 30,
  };

  const speed = speeds[trainType];
  
  // Time in minutes = (km / speed) * 60 + fixed dwell time factor (1.5 min per stop)
  const estimatedStops = Math.floor(km / 2.5);
  const travelTimeMinutes = Math.round(((km / speed) * 60 + estimatedStops * 1.5) * 10) / 10;

  // Tidymodels linear/poly simulation for Fare: Base $2.50 + $0.32/km + $0.005*(km^1.2)
  const baseFare = 2.50;
  const fare = Math.round((baseFare + km * 0.32 + Math.pow(km, 1.2) * 0.08) * 100) / 100;

  // CO2 savings compared to standard gas car (approx 120g CO2/km driving vs 35g CO2/km electric train)
  // Saved per km = (120 - 35)g = 85g = 0.085 kg CO2
  const co2SavedKg = Math.round((km * 0.085) * 100) / 100;

  // Calories burned (walking to/from station + train transit energy) ~ 28 kcal/km
  const calories = Math.round(km * 28);

  // Steps equivalent
  const steps = Math.round(km * 1350);

  return {
    travelTimeMinutes,
    fare,
    co2SavedKg,
    calories,
    steps,
    speed,
    estimatedStops,
  };
}

export function generateDistanceDataset(maxKm: number = 20, step: number = 0.5): DistanceDataPoint[] {
  const points: DistanceDataPoint[] = [];
  for (let km = 0; km <= maxKm; km += step) {
    const roundedKm = Math.round(km * 10) / 10;
    const stats = calculateJourney(roundedKm, 'commuter');
    points.push({
      km: roundedKm,
      fare: stats.fare,
      timeMinutes: stats.travelTimeMinutes,
      co2SavedKg: stats.co2SavedKg,
      calories: stats.calories,
    });
  }
  return points;
}

export const ORIGINAL_R_CODE = `#dependencies ----

installed.packages("shiny")
library(shiny)

pacman::p_load(tidyverse, 
               tidymodels, 
               shiny)


# User Interface ----

# minimalist user interface 
ui <- 
  fluidPage(
    titlePanel("Heather's Application\\nTrain"),
    #input
    sliderInput("km",
                "Distance(km)",
                min = 0, max = 20, 
                value = 5, # default value 
                step = 0.5
                ), 
    #output
    textOutput("readout")
  )

# Server ----

server <- 
  function(input, output, session)
  {
    output$readout <- 
      renderText(
        {
          paste0("Hello, user 00 ", # paste0 has no spacing 
                 input$km,
                 "km.")
        }
      )
  }

# Initialize Shiny App ----

shinyApp(ui, server)
`;
