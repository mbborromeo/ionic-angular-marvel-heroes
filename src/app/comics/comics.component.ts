import { Component, OnInit } from '@angular/core';
import { Comic } from '../comic/comic';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MarvelApiCallService } from '../marvel-api-call.service';
import { MarvelData } from '../marvel-data';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss'],
})
export class ComicsComponent implements OnInit {
  private characterID: number;
  private characterName: string; //how to get this?
  
  //private comics: Comic[] = [];
  private marvelData: MarvelData;
  private loading: boolean = false;
  private loadingName: boolean = false;

  constructor( 
    private route: ActivatedRoute,
    private location: Location,
    private marvelService: MarvelApiCallService
  ) { }
  
  getComicsOfCharacter(): void {
    this.characterID = +this.route.snapshot.paramMap.get('id'); //get ID from URL
    this.loading = true;
    console.log("comics.component: getComicsOfCharacter() - character ID is: ", this.characterID);

    const myObserver = {
      next: (res) => {
        this.marvelData = res; //res.data.results

        if( this.marvelData === undefined) {
          console.log("comics UNDEFINED");      
        }
      },
      error: (err) => console.error('Observer getComicsOfCharacter got an error: ' + err),
      complete: () => {
        console.log("this.marvelData when getComicsOfCharacter complete: ", this.marvelData);
        this.loading = false;    
      },
    };

    this.marvelService.getComicsOfCharacter( this.characterID )
      .subscribe( myObserver );
  }

  getCharacterName(): void {
    let id = +this.route.snapshot.paramMap.get('id'); //get ID from URL
    this.loadingName = true;

    // Create observer object
    const myObserver = {
      next: (res) => {
        this.characterName = res.name; //filter out the name only

        if( this.characterName === undefined) {
          console.log("characterName UNDEFINED");      
        } 
      },
      error: (err) => console.error('Character Observer got an error: ' + err),
      complete: () => {         
        this.loadingName = false;
        console.log("this.characterName when subscribe complete: ", this.characterName);
      },
    };

    this.marvelService.getCharacter( id )      
      .subscribe( myObserver );
  }

  ngOnInit() {
    this.getCharacterName(); 
    this.getComicsOfCharacter();    
  }
}
