import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}

  getLocationAsync(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (x) => {
          resolve(x.coords);
        },
        reject,
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 27000,
        }
      );
    });
  }
}
