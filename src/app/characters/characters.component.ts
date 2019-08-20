import { Component, OnInit } from '@angular/core';
import { Character } from '../character/character';
import { MarvelApiCallService } from '../marvel-api-call.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  private characters: Character[]; //Observable<Character[]>
  private loading: boolean = false;
  
  constructor( private marvelService: MarvelApiCallService ) { }

  getCharacters(): void {    
    //object to help debug subscribe
    this.characters = []; //reset    
    this.loading = true;

    const myObserver = {
      next: (data) => {
        this.characters = data;

        if( this.characters === undefined) {
          console.log("characters UNDEFINED");      
        }
      },
      error: (err) => console.error('Observer got an error: ' + err),
      complete: () => {
        console.log("this.characters when getCharacters complete: ", this.characters);
        this.loading = false;
      },
    };

    this.marvelService.getCharacters()      
      .subscribe( myObserver );
  }

  searchCharacters( name: string ): void {
    this.characters = []; //reset
    this.loading = true;

    const myObserver = {
      next: (data) => {
        this.characters = data;

        if( this.characters === undefined) {
          console.log("characters UNDEFINED");      
        }
      },
      error: (err) => console.error('Observer got an error: ' + err),
      complete: () => {
        console.log("this.characters when searchCharacters complete: ", this.characters);
        this.loading = false;    
      },
    };

    this.marvelService.searchCharacters( name )      
      .subscribe( myObserver );
  }

  clearSearch(): void {
    //reset search input

    this.getCharacters();
  }

  ngOnInit() {
    this.getCharacters();
  }

}
