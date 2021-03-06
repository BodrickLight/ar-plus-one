import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiDetailsComponent } from './poi-details.component';

describe('PoiDetailsComponent', () => {
  let component: PoiDetailsComponent;
  let fixture: ComponentFixture<PoiDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoiDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
