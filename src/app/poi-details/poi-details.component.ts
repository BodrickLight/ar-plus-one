import { Component, Input, OnInit } from '@angular/core';
import { PoiData } from '../models/poi-data';

@Component({
  selector: 'app-poi-details',
  templateUrl: './poi-details.component.html',
  styleUrls: ['./poi-details.component.scss']
})
export class PoiDetailsComponent implements OnInit {
  @Input() poi?: PoiData

  constructor() { }

  ngOnInit(): void {
  }
}
