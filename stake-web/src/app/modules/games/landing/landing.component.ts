import { Component, OnInit } from '@angular/core';
import { Game } from '../games.types';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  ngOnInit(): void {

  }
  games: Game[] = [
    {
      title: 'mines',
      link: '/games/mines',
      image: '/assets/images/games/mines.webp',
    }
  ];
}
