import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { GpsPosition } from '../models/gps-position';

@Component({
  selector: '[app-trail-point]',
  templateUrl: './trail-point.component.html',
  styleUrls: ['./trail-point.component.scss']
})
export class TrailPointComponent implements OnChanges {
  @Input() model?: GpsPosition

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(): void {
    this.renderer.setAttribute(this.element.nativeElement, "gps-projected-entity-place",
    `latitude:${this.model?.latitude};longitude:${this.model?.longitude}`);
    this.renderer.setAttribute(this.element.nativeElement, "position", `0 ${this.model?.altitude} 0`);
  }
}
