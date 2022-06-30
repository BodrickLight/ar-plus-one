import { TestBed } from '@angular/core/testing';

import { SelectedPoiService } from './selected-poi.service';

describe('SelectedPoiService', () => {
  let service: SelectedPoiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedPoiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
