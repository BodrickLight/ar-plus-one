import { GpsPosition } from "./gps-position";

export interface PoiDetails {
    origin: string;
    destination: string;
    image: string;
    trail: GpsPosition[];
}