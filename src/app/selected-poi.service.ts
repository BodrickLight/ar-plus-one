import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PoiData } from './models/poi-data';

@Injectable({
  providedIn: 'root'
})
export class SelectedPoiService {
  private subject = new Subject<PoiData | null>();
  public data = this.subject.asObservable();

  constructor() { }

  select(poi: PoiData | null) {
    this.subject.next(poi);
  }
}
