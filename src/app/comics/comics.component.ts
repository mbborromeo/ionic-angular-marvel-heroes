import { Component, OnInit } from '@angular/core';
//import { Comic } from '../comic/comic';
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
  public characterID: number;
  public characterName: string;
  
  //private comics: Comic[] = [];
  public marvelData: MarvelData;
  public loading: boolean = false;
  public loadingName: boolean = false;

  //vars for page buttons
  public totalItemsReturned: number;
  public offsetIndex: number;
  public itemsToDisplayLimit: number;
  public countOfItemsDisplayed: number;
  public offsetDistance: number;
  public pageNumber: number;
  public pagesTotal: number;

  constructor( 
    private route: ActivatedRoute,
    private location: Location,
    private marvelService: MarvelApiCallService
  ) { }
  
  getComicsOfCharacter( offset?: number ): void {
    this.characterID = +this.route.snapshot.paramMap.get('id'); //get ID from URL
    this.loading = true;
    
    const myObserver = {
      next: (res) => {
        this.marvelData = res; //res.data.results

        this.totalItemsReturned = res.data.total;
        this.offsetIndex = res.data.offset;
        this.countOfItemsDisplayed = res.data.count;
        this.itemsToDisplayLimit = res.data.limit;
        this.offsetDistance = this.itemsToDisplayLimit;
        this.pageNumber = Math.floor(this.offsetIndex / this.offsetDistance) + 1;
        this.pagesTotal = Math.floor(this.totalItemsReturned / this.offsetDistance) + 1;

        if( this.marvelData.data.results === undefined) {
          console.log("comics UNDEFINED");      
        }
      },
      error: (err) => console.error('Observer getComicsOfCharacter got an error: ' + err),
      complete: () => {
        console.log("this.marvelData when getComicsOfCharacter complete: ", this.marvelData);
        this.loading = false;    
      },
    };

    if( !offset ) {
      this.marvelService.getComicsOfCharacter( this.characterID )
        .subscribe( myObserver );
    }
    if( offset ) {
      this.marvelService.getComicsOfCharacter( this.characterID, offset )
        .subscribe( myObserver );
    }
  }

  nextPage( id: number=undefined ): void {
    let proposedOffsetIndex = this.offsetIndex + this.offsetDistance;

    if( proposedOffsetIndex <= this.totalItemsReturned ) {
      this.getComicsOfCharacter( proposedOffsetIndex );            
    }
  }

  prevPage( id: number=undefined ): void {
    let proposedOffsetIndex = this.offsetIndex - this.offsetDistance;

    if( proposedOffsetIndex >= 0 ){      
      this.getComicsOfCharacter( proposedOffsetIndex );
    }
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

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getCharacterName(); 
    this.getComicsOfCharacter();    
  }
}
