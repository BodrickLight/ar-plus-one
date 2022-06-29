import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LocationService } from './location.service';
import { PoiData } from './models/poi-data';

@Injectable({
  providedIn: 'root',
})
export class PoiSourceService {
  private subject = new Subject<PoiData[]>();
  public data = this.subject.asObservable();

  constructor(private location: LocationService) {
    this.updatePoisAsync();
  }

  private async updatePoisAsync(): Promise<void> {
    try {
      const position = await this.location.getLocationAsync();
      const endpoint = `https://opensky-network.org/api/states/all
?lamax=${position.latitude + 0.2}
&lamin=${position.latitude - 0.2}
&lomax=${position.longitude + 0.4}
&lomin=${position.longitude - 0.4}`;

      const response = await this.fetchWithTimeout(endpoint, {
        timeout: 5000,
      });
      const json = await response.json();
      const data = json.states
        .filter((state: any[]) => state[3] && state[7] < 1000)
        .map(
          (state: any[]) =>
            <PoiData>{
              id: state[0],
              name: state[1],
              time: state[3],
              position: {
                longitude: state[5],
                latitude: state[6],
                altitude: state[7],
              },
              velocity: state[9],
              heading: state[10],
              verticalRate: state[11],
            }
        );

      this.subject.next(data);
    } finally {
      setTimeout(() => this.updatePoisAsync(), 5000);
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
