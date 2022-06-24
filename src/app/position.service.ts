import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Rotation
{
  alpha: number;
  beta: number;
  gamma: number;
}

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  public rotationChanged = new Subject<Rotation>();

  constructor() {
    window.addEventListener('deviceorientation', evt => this.handleDeviceOrientation(evt));
  }

  handleDeviceOrientation(event: DeviceOrientationEvent) {
    if (event.alpha !== null && event.beta !== null && event.gamma !== null) {
      this.rotationChanged.next({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
      });
    }
  }
}
