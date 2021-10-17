import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mint-sea-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public counter: number;
  constructor() {
    this.counter = 0;
  }

  ngOnInit(): void {
    this.updateCount(this.counter, 10001);
  }

  updateCount(startValue: number, target: number) {
    const count = startValue;
    // steps of the counter
    const incrementOrder = target < 100 ? 1 : 10;
    if (count < target) {
      this.counter = count + incrementOrder;
      setTimeout(this.updateCount.bind(this), 0, this.counter, target);
    } else {
      this.counter = target;
    }
  };

}
