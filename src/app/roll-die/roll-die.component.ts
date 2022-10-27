import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DiceRollingService } from '../dice-rolling.service';

@Component({
  selector: 'app-roll-die',
  templateUrl: './roll-die.component.html',
  styleUrls: ['./roll-die.component.css']
})
export class RollDieComponent implements OnInit {

  constructor(
    public diceRollingSvc: DiceRollingService
  ) { }

  ngOnInit(): void {
  }

  result = 0;

  roll = () => {

    // generate roll
    this.result = Math.floor(Math.random() * Number(this.sideCount)) + 1;

    // emit roll event
    this.dieRolled.emit({
      side: this.sideCount,
      result: this.result
    });

    // save result in service
    this.diceRollingSvc.addRollHistory({
      sides: this.sideCount,
      result: this.result
    });
  };

  @Input("side-count")
  sideCount = "6";

  @Output("die-rolled")
  dieRolled = new EventEmitter<{side: string, result: number}>();

}
