import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MarvelApiCallService } from '../marvel-api-call.service';
//import { Observable, of } from 'rxjs';
import { Character } from '../character/character';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {

  private character: Character; //Observable<Character>
  private loading: boolean = false;
  
  /*
  confirmID: number;
  name: string;
  confirmDescription: string;
  */  

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private marvelService: MarvelApiCallService
  ) { }

  getCharacter(): void {
    let id = +this.route.snapshot.paramMap.get('id'); //get ID from URL
    this.loading = true;

    // Create observer object
    const myObserver = {
      next: (data) => {
        this.character = data;

        if( this.character === undefined) {
          console.log("character UNDEFINED");      
        } 
      },
      error: (err) => console.error('Character Observer got an error: ' + err),
      complete: () => {         
        this.loading = false;
        console.log("this.character when subscribe complete: ", this.character);
      },
    };

    this.marvelService.getCharacter( id )      
      .subscribe( myObserver );
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {    
    this.getCharacter();
  }
}
