import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import { Character } from '../character/character';
import { MarvelApiCallService } from '../marvel-api-call.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  characters: Character[];
  private loading: boolean = false;
  
  constructor( private charactersService: MarvelApiCallService ) { }

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

    this.charactersService.getCharacters()      
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

    this.charactersService.searchCharacters( name )      
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
