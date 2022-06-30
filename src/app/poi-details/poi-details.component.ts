import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PoiData } from '../models/poi-data';
import { PoiDetails } from '../models/poi-details';

@Component({
  selector: 'app-poi-details',
  templateUrl: './poi-details.component.html',
  styleUrls: ['./poi-details.component.scss']
})
export class PoiDetailsComponent {
  @Input() poi?: PoiData
  @Input() poiDetails?: PoiDetails

  constructor() { }
}
