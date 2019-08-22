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
  private characterName: string;
  
  //private comics: Comic[] = [];
  private marvelData: MarvelData;
  private loading: boolean = false;
  private loadingName: boolean = false;

  //vars for page buttons
  private totalItemsReturned: number;
  private offsetIndex: number;
  private itemsToDisplayLimit: number;
  private countOfItemsDisplayed: number;
  private offsetDistance: number;
  private pageNumber: number;
  private pagesTotal: number;

  constructor( 
    private route: ActivatedRoute,
    private location: Location,
    private marvelService: MarvelApiCallService
  ) { }
  
  getComicsOfCharacter( offset?: number ): void {
    this.characterID = +this.route.snapshot.paramMap.get('id'); //get ID from URL
    this.loading = true;
    console.log("comics.component: getComicsOfCharacter() - character ID is: ", this.characterID);

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

        console.log("---------CharsComponent this.marvelData: ", this.marvelData); 
        console.log("this.totalItemsReturned: ", this.totalItemsReturned);
        console.log("this.offsetIndex: ", this.offsetIndex);
        console.log("this.countOfItemsToDisplay: ", this.countOfItemsDisplayed);
        console.log("this.itemsToDisplayLimit: ", this.itemsToDisplayLimit);

        console.log("pageNumber ", this.pageNumber);
        console.log("pagesTotal", this.pagesTotal);

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
    else {
      console.log("CANNOT go to Next page, you are on last page");
    }    
  }

  prevPage( id: number=undefined ): void {
    let proposedOffsetIndex = this.offsetIndex - this.offsetDistance;

    if( proposedOffsetIndex >= 0 ){      
      this.getComicsOfCharacter( proposedOffsetIndex );
    }
    else {
      console.log("CANNOT go to Prev page, you are on the first page");
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
