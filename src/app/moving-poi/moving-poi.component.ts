import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2 } from '@angular/core';
import { PoiData } from '../models/poi-data';
import { PoiSourceService } from '../poi-source.service';

@Component({
  selector: '[app-moving-poi]',
  templateUrl: './moving-poi.component.html',
  styleUrls: ['./moving-poi.component.scss']
})
export class MovingPoiComponent implements OnChanges {
  @Output() select = new EventEmitter<void>();
  @Input() selected: boolean = false;
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

  private x: number = 0;
  private y: number = 0;
  private z: number = 0;
  private xSpeed: number = 0;
  private ySpeed: number = 0;
  private zSpeed: number = 0;

  constructor(private element: ElementRef, private renderer: Renderer2, private pois: PoiSourceService) { }

  ngOnChanges(): void {
    this.renderer.setAttribute(this.element.nativeElement, "moving-poi",
    `x:${this.x};y:${this.y};z:${this.z};xSpeed:${this.xSpeed};ySpeed:${this.ySpeed};zSpeed:${this.zSpeed}`);
    this.renderer.setAttribute(this.element.nativeElement.children[0].children[1], "material",
    `shader: flat; color: ${this.selected ? 'red' : '#333'}`);
  }

  onClick(): void {
    this.select.emit();
    console.log(`${this.x}, ${this.y}, ${this.z}; ${this.xSpeed}, ${this.ySpeed}, ${this.zSpeed}`)
  }
}
