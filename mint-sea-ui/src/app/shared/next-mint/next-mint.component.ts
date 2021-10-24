import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-next-mint',
  templateUrl: './next-mint.component.html',
  styleUrls: ['./next-mint.component.css']
})
export class NextMintComponent implements OnInit {
  public timeForNextMint: any;

  constructor() {
    this.timeForNextMint = ""
  }

  ngOnInit(): void {
    // Set the date we're counting down to
    var countDownDate = new Date("2022-10-30T13:14:15").getTime();

    // Update the count down every 1 second
    var intervalRef = setInterval(() => {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      this.timeForNextMint = days + " day(s) " + hours + " hour(s) " + minutes + " minute(s) " + seconds + " second(s)";

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(intervalRef);
        this.timeForNextMint = "EXPIRED";
      }
    }, 1000);
  }

}
