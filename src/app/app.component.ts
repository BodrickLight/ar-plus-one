import { Component, OnInit } from '@angular/core';
import { PoiData } from './models/poi-data';
import { PoiSourceService } from './poi-source.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ar-plus-one';
  constructor(public poiSource: PoiSourceService) { }
}
