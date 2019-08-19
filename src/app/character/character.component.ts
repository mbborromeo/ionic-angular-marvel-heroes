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
  private character: Observable<Character>;
  private loading: boolean = true;
  
  /*
  confirmID: number;
  name: string;
  confirmDescription: string;
  */  

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private characterService: CharacterService
  ) { }

  getCharacter(): void {
    console.log("character.component: getCharacter()");
    this.id = +this.route.snapshot.paramMap.get('id'); //get ID from URL

    // Create observer object
    const myObserver = {
      next: (payload) => {        
        console.log('Character Observer payload ', payload);
        console.log('Character Observer payload.data ', payload.data);
        console.log('Character Observer payload.data.results ', payload.data.results);
        console.log('Character Observer payload.data.results[0] ', payload.data.results[0]);
        this.character = payload.data.results[0];
        console.log("character.component: this.character inside subscribe is: ", this.character); 

        /*
        console.log("character.component: this.character inside subscribe is NAME IS-----: ", this.character['name']); 
        console.log("character.component: this.character inside subscribe is ID IS-----: ", this.character['id']);
        this.name = payload.data.results[0].name;
        this.confirmID = payload.data.results[0].id;
        this.confirmDescription = payload.data.results[0].description;
        */
      },
      error: (err) => console.error('Character Observer got an error: ' + err),
      complete: () => {         
        this.loading = false;      
      },
    };

    this.characterService.getCharacter( this.id )      
      .subscribe( myObserver );
  }

  /*
  goBack(): void {
    this.location.back();
  }
  */

  ngOnInit() {    
    this.getCharacter();
  }
}
