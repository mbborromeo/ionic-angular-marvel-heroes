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

    this.charactersService.getCharacters()      
      .subscribe( 
        data => {
          this.characters = data.results;
          //this.loading = false;
          console.log("characters.component: this.characters inside subscribe are: ", this.characters); 
        }
      );
      
      console.log("characters.component: this.characters after subscribe are: ", this.characters); 
  }

  ngOnInit() {
    this.getCharacters();   
    console.log("characters.component: characters on ngOnInit are: ", this.characters); 
  }

}
