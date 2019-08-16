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
  
  constructor( private charactersService: CharactersService ) { }

  getCharacters(): void {
    console.log("characters.component: getCharacters()");

    this.charactersService.getCharacters()
      .subscribe( data => this.characters = data.results );
  }

  ngOnInit() {
    this.getCharacters();
    console.log( "characters.components: characters are ", this.characters );
  }

}
