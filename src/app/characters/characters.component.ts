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
    
    // Create observer object
    const myObserver = {
      next: (payload) => {
        this.characters = payload.data.results;
      },
      error: (err) => console.error('Observer got an error: ' + err),
      complete: () => console.log("this.characters when subscribe complete: ", this.characters),
    };

    this.charactersService.getCharacters()      
      .subscribe( myObserver );
      /*
      .subscribe( payload => {
          this.characters = payload.data.results;
        }
      );
      */      
  }

  ngOnInit() {
    this.getCharacters();
  }

}
