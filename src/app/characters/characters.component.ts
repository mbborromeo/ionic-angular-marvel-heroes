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
  //private loading: boolean = true;
  
  constructor( private charactersService: MarvelApiCallService ) { }

  getCharacters(): void {    
    //object to help debug subscribe
    this.characters = []; //reset    

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

  searchCharacters( name: string ): void {
    this.characters = []; //reset
    console.log("chars.component: searchChars(name) name is: ", name);

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

    this.charactersService.searchCharacters( name )      
      .subscribe( myObserver );
  }

  clearSearch(): void {
    //reset search input
    //this.searchInput.nativeElement.value = '';
    //this.searchInput = undefined;

    this.getCharacters();
  }

  ngOnInit() {
    this.getCharacters();
  }

}
