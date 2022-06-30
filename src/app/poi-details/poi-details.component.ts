import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AirlineRouteService } from '../airline-route.service';
import { AirlineRoute } from '../models/airline-route';
import { PoiData } from '../models/poi-data';

@Component({
  selector: 'app-poi-details',
  templateUrl: './poi-details.component.html',
  styleUrls: ['./poi-details.component.scss']
})
export class PoiDetailsComponent implements OnChanges {
  @Input() poi?: PoiData
  public route?: AirlineRoute;

  constructor(private airlineRoutes: AirlineRouteService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.route = undefined;
    if(this.poi) {
      this.airlineRoutes.getRouteAsync(this.poi.name).then(route => this.route = route);
    }
  }
}
