import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CharacterService } from './character.service';
import { Observable, of } from 'rxjs';
import { Character } from '../character/character';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {

  id: number; //id doesn't seem to get updated
  image: string;
  private character: Observable<Character>;
  confirmID: number;
  name: string;
  confirmDescription: string;

  private loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private characterService: CharacterService
  ) { }

  getCharacter( i: number ): void {
    console.log("character.component: getCharacter( i ) !!!! i is: " + i);

    // Create observer object
    const myObserver = {
      next: payload => {        
        console.log('Character Observer payload ', payload);
        console.log('Character Observer payload.data ', payload.data);
        console.log('Character Observer payload.data.results ', payload.data.results);
        console.log('Character Observer payload.data.results[0] ', payload.data.results[0]);
        this.character = payload.data.results[0];
        console.log("character.component: this.character inside subscribe is: ", this.character); 
        // console.log("character.component: this.character inside subscribe is NAME IS: ", this.character[name]); 
        // console.log("character.component: this.character inside subscribe is ID IS: ", this.character[id]);
        console.log("character.component: this.character inside subscribe is payload.data.results[0].NAME is: ", payload.data.results[0].name);         
        console.log("character.component: this.character inside subscribe is payload.data.results[0].ID is: ", payload.data.results[0].id);

        this.name = payload.data.results[0].name;
        this.confirmID = payload.data.results[0].id;
        this.confirmDescription = payload.data.results[0].description;
      },
      error: err => console.error('Character Observer got an error: ' + err),
      complete: () => { 
        console.log("this.character when subscribe complete: ", this.character);
        this.loading = false;      
      },
    };

    this.characterService.getCharacter( i )      
      .subscribe( myObserver );
  }

  ngOnInit() {
    this.id = this.getCharacterID();
    this.getCharacter( this.id );
  }

  getCharacterID(): number {    
    const id = +this.route.snapshot.paramMap.get('id');
    console.log("character.component: getCharacterID() ID is ---------" + id);
    return id;
  }
}
