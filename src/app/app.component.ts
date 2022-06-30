import { Component, OnInit } from '@angular/core';
import { PoiData } from './models/poi-data';
import { PoiSourceService } from './poi-source.service';
import { SelectedPoiService } from './selected-poi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ar-plus-one';
  public selectedPoi?: PoiData;
  constructor(public poiSource: PoiSourceService, private selectedPoiService: SelectedPoiService) {

  }
  ngOnInit(): void {
    this.selectedPoiService.data.subscribe(poi => this.selectedPoi = poi);
  }
}
