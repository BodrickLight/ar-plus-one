import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { PoiData } from '../models/poi-data';

@Component({
  selector: '[app-moving-poi]',
  templateUrl: './moving-poi.component.html',
  styleUrls: ['./moving-poi.component.scss']
})
export class MovingPoiComponent implements OnInit {
  @Input() set model(value: PoiData)
  { 
    const dt = new Date().getTime() / 1000 - value.time;
    const gps = (<any> document.querySelector("a-camera")).components['gps-projected-camera'];
    const worldPosition = gps.latLonToWorld(value.position.latitude, value.position.longitude);

    const x0 = worldPosition[0];
    const y0 = (value.position.altitude || 0) * 1.5;
    const z0 = worldPosition[1];

    const heading = value.heading - 90;

    this.xSpeed = value.velocity * Math.cos(heading * Math.PI / 180) * 1.5;
    this.ySpeed = (value.verticalRate || 0) * 1.5;
    this.zSpeed = value.velocity * Math.sin(heading * Math.PI / 180) * 1.5;

    this.x = x0 + this.xSpeed * dt;
    this.y = y0 + this.ySpeed * dt;
    this.z = z0 + this.zSpeed * dt;
  }

  x: number = 0;
  y: number = 0;
  z: number = 0;
  xSpeed: number = 0;
  ySpeed: number = 0;
  zSpeed: number = 0;

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.setAttribute(this.element.nativeElement, "moving-poi",
    `x:${this.x};y:${this.y};z:${this.z};xSpeed:${this.xSpeed};ySpeed:${this.ySpeed};zSpeed:${this.zSpeed}`);
  }
}
