import { Component, OnInit } from '@angular/core';
import { PoiData } from './models/poi-data';
import { PoiDetails } from './models/poi-details';
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
  public selectedPoiDetails?: PoiDetails;
  constructor(public poiSource: PoiSourceService, private selectedPoiService: SelectedPoiService) {

  }
  ngOnInit(): void {
    this.selectedPoiService.data.subscribe(async poi => {
      this.selectedPoi = poi;
      this.selectedPoiDetails = await this.poiSource.getPoiDetailsAsync(poi.id);
    });
  }
}
