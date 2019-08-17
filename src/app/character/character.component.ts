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

  id: number;
  image: string;
  private character: Observable<Character>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private characterService: CharacterService
  ) { }

  getCharacter( i: number ): void {
    console.log("character.component: getCharacter()");

    // Create observer object
    const myObserver = {
      next: payload => {        
        console.log('Character Observer payload ', payload);
        console.log('Character Observer payload.data ', payload.data);
        console.log('Character Observer payload.data.results ', payload.data.results);
        console.log('Character Observer payload.data.results[0] ', payload.data.results[0]);
        this.character = payload.data.results[0];
        console.log("character.component: this.character inside subscribe are: ", this.character); 
      },
      error: err => console.error('Character Observer got an error: ' + err),
      complete: () => console.log("this.character when subscribe complete: ", this.character),
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
    return id;
  }
}
