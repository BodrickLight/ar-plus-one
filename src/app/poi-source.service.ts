import { Injectable } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { LocationService } from './location.service';
import { PoiData } from './models/poi-data';
import { PoiDetails } from './models/poi-details';

@Injectable({
  providedIn: 'root',
})
export class PoiSourceService {
  private subject = new Subject<PoiData[]>();
  public data = this.subject.asObservable();

  constructor(private location: LocationService) {
    this.updatePoisAsync();
  }

  public async getPoiDetailsAsync(poiId: string): Promise<PoiDetails> {
      const endpoint = `https://api.codetabs.com/v1/proxy/?quest=https://data-live.flightradar24.com/clickhandler/
?flight=${poiId}&version:1.5`

      const response = await this.fetchWithTimeout(endpoint, {
        timeout: 5000,
      });
      const json = <DetailsResponse> await response.json();
      return {
        origin: json.airport.origin ? { code: json.airport.origin.code.iata, name: json.airport.origin.name } : undefined,
        destination: json.airport.destination ? { code: json.airport.destination.code.iata, name: json.airport.destination.name } : undefined,
        image: json.aircraft.images?.large[0]?.src,
        trail: json.trail.map(t => { return {
          longitude: t.lng,
          latitude: t.lat,
          altitude: t.alt / 3.281
        } }),
        description: `${json.airline.name} Flight ${json.identification.number.default}`
      };
  }

  private async updatePoisAsync(): Promise<void> {
    try {
      const position = await this.location.getLocationAsync();
      const endpoint = `https://api.codetabs.com/v1/proxy/?quest=https://data-live.flightradar24.com/zones/fcgi/feed.js
?bounds=${position.latitude+1},${position.latitude-1},${position.longitude-1},${position.longitude+1}`;

      const response = await this.fetchWithTimeout(endpoint, {
        timeout: 5000,
      });
      const json = await response.json();
      const pois:PoiData[] = Object.keys(json).map(key => {
        const data = json[key];
        return {
          id: key,
          name: data[13],
          time: data[10],
          position: {
            longitude: data[2],
            latitude: data[1],
            altitude: data[4] / 3.281
          },
          velocity: data[5] / 1.944,
          heading: data[3],
          verticalRate: data[15] / 196.9,
          origin: data[11] || null,
          destination: data[12] || null
        };
      }).filter(poi => poi.position.altitude > 1000);

      this.subject.next(pois);
    } finally {
      setTimeout(() => this.updatePoisAsync(), 10000);
    }
  }

  private async fetchWithTimeout(
    resource: RequestInfo,
    options: RequestInit & { timeout?: number } = {}
  ) {
    const { timeout = 8000 } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  }
}

interface DetailsResponse
{
  aircraft: {
    age: number;
    countryId: number;
    hex: string;
    images: {
      large: Image[];
      medium: Image[];
      thumbnails: Image[];
    }
    model: {
      code: string;
      text: string;
    }
    msg: string;
    registration: string;
  }
  airline: {
    code: Code;
    name: string;
    short: string;
    url: string;
  }
  airport: {
    destination: Airport;
    origin: Airport;
    real: unknown;
  }
  airspace: unknown;
  availability: string[];
  ems: unknown;
  firstTimestamp: number;
  flightHistory: unknown;
  identification: {
    callsign: string;
    id: string;
    number: {
      alternative: string;
      default: string;
    }
    row: number;
  }
  level: string;
  owner: unknown;
  promote: boolean;
  s: string;
  status: unknown;
  time: {
    estimated: {
      departure: number;
      arrival: number;
    }
    historical: unknown;
    other: {
      eta: number;
      updated: number;
    }
    real: {
      departure: number;
      arrival: number;
    }
    scheduled: {
      departure: number;
      arrival: number;
    }
  }
  trail: {
    alt: number;
    hd: number;
    lat: number;
    lng: number;
    spd: number;
    ts: number;
  }[]
}

interface Image {
  copyright: string;
  link: string;
  source: string;
  src: string;
}

interface Code {
  iata: string;
  icao: string;
}

interface Airport {
  code: Code;
  info: {
    baggage: string;
    gate: string;
    terminal: string;
  };
  name: string;
  position: {
    altitude: number;
    country: {
      code: string;
      id: string;
      name: string;
    };
    latitude: number;
    longitude: number;
    region: {
      city: string;
    };
  };
  timezone: {
    abbr: string;
    abbrName: string;
    isDst: boolean;
    name: string;
    offset: number;
    offsetHours: string;
  };
  visible: boolean;
  website: string;
}