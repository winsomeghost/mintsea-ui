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
    const speed: number = 1536;
    const updateCount = () => {
      const target = parseInt("7529");
      const count = this.counter;
      const increment = Math.trunc(target / speed);
      if (count < target) {
        this.counter = count + increment;
        setTimeout(updateCount, 1);
      } else {
        this.counter = target;
      }
    };
    updateCount();
  }

}
