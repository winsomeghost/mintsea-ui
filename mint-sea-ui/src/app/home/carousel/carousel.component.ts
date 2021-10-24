import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mint-sea-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  images: any;
  responsiveOptions: any;

  constructor() {
    this.responsiveOptions = [{
      breakpoint: '1560px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }];
  }

  ngOnInit(): void {
    this.images = [
      { random: 'Random', desc: "some description 01", picture: 'https://picsum.photos/id/944/900/500' },
      { random: 'Samoa', desc: "some description 02", picture: 'https://picsum.photos/id/1011/900/500' },
      { random: 'Tonga', desc: "some description 03", picture: 'https://picsum.photos/id/984/900/500' },
      { random: 'Cook Island', desc: "some description 04", picture: 'https://picsum.photos/id/944/900/500' },
      { random: 'Niue', desc: "some description 05", picture: 'https://picsum.photos/id/1011/900/500' },
      { random: 'American Samoa', desc: "some description 06", picture: 'https://alethea.ai/media/character_images/Mad_Scientist.jpg' }
    ];
  }

}
