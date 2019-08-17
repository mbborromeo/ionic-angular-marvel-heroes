import { Component, OnInit } from '@angular/core';
import { Character } from '../character/character';
import { CharactersService } from './characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  characters: Character[];
  //private loading: boolean = true;
  
  constructor( private charactersService: CharactersService ) { }

  getCharacters(): void {
    console.log("characters.component: getCharacters()");

    // Create observer object
    const myObserver = {
      next: payload => {        
        console.log('Observer got a next value ', payload);
        console.log('Observer results is ', payload.data.results);
        this.characters = payload.data.results;
        console.log("characters.component: this.characters inside subscribe are: ", this.characters); 
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log("this.characters when subscribe complete: ", this.characters),
    };

    this.charactersService.getCharacters()      
      .subscribe( myObserver );
      /*
      .subscribe( data => {
          this.characters = data.results;
          console.log("characters.component: this.characters inside subscribe are: ", this.characters); 
        }
      );
      */      
  }

  ngOnInit() {
    this.getCharacters();   
    console.log("characters.component: characters on ngOnInit are: ", this.characters); 
  }

}
