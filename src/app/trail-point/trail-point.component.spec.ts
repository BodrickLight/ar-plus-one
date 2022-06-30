import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailPointComponent } from './trail-point.component';

describe('TrailPointComponent', () => {
  let component: TrailPointComponent;
  let fixture: ComponentFixture<TrailPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrailPointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrailPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
