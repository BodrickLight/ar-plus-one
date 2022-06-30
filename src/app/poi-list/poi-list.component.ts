import { Component, OnInit } from '@angular/core';
import { PoiData } from '../models/poi-data';
import { PoiSourceService } from '../poi-source.service';

@Component({
  selector: '[app-poi-list]',
  templateUrl: './poi-list.component.html',
  styleUrls: ['./poi-list.component.scss']
})
export class PoiListComponent implements OnInit {
  public pois?: PoiData[];
  public selectedPoiId?: string | null
  constructor(public poiSource: PoiSourceService) { }

  ngOnInit(): void {
    this.poiSource.data.subscribe(pois => this.pois = pois)
  }

  onSelect(poi: PoiData) {
    this.selectedPoiId = poi.id;
  }
}
