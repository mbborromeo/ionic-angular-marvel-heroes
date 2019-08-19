import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss'],
})
export class ComicsComponent implements OnInit {

  constructor() { }

  
  getComicsOfCharacter( id: number ): void {
    console.log("comics.component: getComicsOfCharacter() - character ID is: ", id);

    //this.characterService.getComicsOfCharacter( id )
      //.subscribe( myObserver );
  }

  ngOnInit() {}

}
