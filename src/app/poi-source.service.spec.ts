import { TestBed } from '@angular/core/testing';

import { PoiSourceService } from './poi-source.service';

describe('PoiSourceService', () => {
  let service: PoiSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoiSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
