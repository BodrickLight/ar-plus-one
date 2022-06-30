import { Component, Input, OnInit } from '@angular/core';
import { PoiData } from '../models/poi-data';
import { PoiSourceService } from '../poi-source.service';
import { SelectedPoiService } from '../selected-poi.service';

@Component({
  selector: '[app-poi-list]',
  templateUrl: './poi-list.component.html',
  styleUrls: ['./poi-list.component.scss']
})
export class PoiListComponent implements OnInit {
  public pois?: PoiData[];
  public selectedPoi?: PoiData
  constructor(private poiSource: PoiSourceService, private selectedPoiService: SelectedPoiService) { }

  ngOnInit(): void {
    this.poiSource.data.subscribe(pois => this.pois = pois);
    this.selectedPoiService.data.subscribe(poi => this.selectedPoi = poi);
  }
}
