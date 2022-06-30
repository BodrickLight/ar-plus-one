import { Injectable } from '@angular/core';
import { AirlineRoute } from './models/airline-route';

@Injectable({
  providedIn: 'root',
})
export class AirlineRouteService {
  constructor() {}

  public async getRouteAsync(callsign: string): Promise<AirlineRoute> {
    const resp = await fetch(
      `https://opensky-network.org/api/routes?callsign=${callsign}`, {
        mode: "no-cors"
      }
    );
    const data = <RouteResponse>await resp.json();
    return {
      from: data.route[0],
      to: data.route[1],
    };
  }
}

interface RouteResponse {
  callsign: string;
  flightNumber: number;
  operatorIata: string;
  route: string[2];
  updateTime: number;
}
