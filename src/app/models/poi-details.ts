import { GpsPosition } from "./gps-position";

export interface PoiDetails {
    origin?: Location;
    destination?: Location;
    image: string;
    trail: GpsPosition[];
    description: string;
}

export interface Location {
    code: string;
    name: string;
}