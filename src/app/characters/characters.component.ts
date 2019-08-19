import { Component, OnInit } from '@angular/core';
import { Character } from '../character/character';
import { MarvelApiCallService } from '../marvel-api-call.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  characters: Character[];
  //private loading: boolean = true;
  
  constructor( private charactersService: MarvelApiCallService ) { }

  getCharacters(): void {    
    //object to help debug subscribe
    const myObserver = {
      next: (data) => {
        this.characters = data;

        if( this.characters === undefined) {
          console.log("characters UNDEFINED");      
        }
      },
      error: (err) => console.error('Observer got an error: ' + err),
      complete: () => console.log("this.characters when subscribe complete: ", this.characters),
    };

    this.charactersService.getCharacters()      
      .subscribe( myObserver );
  }

  ngOnInit() {
    this.getCharacters();
  }

}
