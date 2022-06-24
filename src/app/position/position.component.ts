import { Component, OnInit } from '@angular/core';
import { PositionService } from '../position.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {

  constructor(private position: PositionService) { }

  ngOnInit(): void {
    this.position.rotationChanged.subscribe(rotation => {
      this.alpha = rotation.alpha;
      this.beta = rotation.beta;
      this.gamma = rotation.gamma;
    })
  }

  public alpha: number = 0;
  public beta: number = 0;
  public gamma: number = 0;
}
