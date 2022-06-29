import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovingPoiComponent } from './moving-poi.component';

describe('MovingPoiComponent', () => {
  let component: MovingPoiComponent;
  let fixture: ComponentFixture<MovingPoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovingPoiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovingPoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
