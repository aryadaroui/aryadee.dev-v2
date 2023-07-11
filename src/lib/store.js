import { writable } from 'svelte/store';

export const PlotlyLib = writable(null);
export const plotly_status = writable('loading Plotly.js');