import { GpsPosition } from "./gps-position";

export interface PoiData {
  id: string;
  position: GpsPosition;
  velocity: number;
  heading: number;
  name: string;
  verticalRate: number | null;
  time: number;
  origin?: string;
  destination?: string;
}
