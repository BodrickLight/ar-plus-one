import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PoiData } from '../models/poi-data';
import { PoiDetails } from '../models/poi-details';
import { SelectedPoiService } from '../selected-poi.service';

@Component({
  selector: 'app-poi-details',
  templateUrl: './poi-details.component.html',
  styleUrls: ['./poi-details.component.scss']
})
export class PoiDetailsComponent {
  @Input() poi: PoiData | null = null;
  @Input() poiDetails: PoiDetails | null = null;

  constructor(private selectedPoi: SelectedPoiService) { }

  onClose() {
    this.selectedPoi.select(null);
  }
}
