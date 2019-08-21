import { Component, OnInit } from '@angular/core';
import { Character } from '../character/character';
import { MarvelData } from '../marvel-data';
import { MarvelApiCallService } from '../marvel-api-call.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  private loading: boolean = false;
  private marvelData: MarvelData;

  //vars for page buttons
  private totalItemsReturned: number;
  private offsetIndex: number;
  private itemsToDisplayLimit: number;
  private countOfItemsDisplayed: number;
  private offsetDistance: number;
  private pageNumber: number;
  private pagesTotal: number;
  
  constructor( private marvelService: MarvelApiCallService ) { }

  /* include optional params for next and previous */
  getCharacters( name: string=undefined, offset?: number ): void {    
    this.loading = true;

    //object to help debug subscribe
    const myObserver = {
      next: (res) => {
        this.marvelData = res;

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

        if( this.marvelData.data.results === undefined) {
          console.log("characters UNDEFINED");      
        }
      },
      error: (err) => console.error('Observer got an error: ' + err),
      complete: () => {
        console.log("when getCharacters complete this.marvelData: ", this.marvelData);        
        this.loading = false;
      },
    };

    if( !offset ) {
      this.marvelService.getCharacters( name )      
        .subscribe( myObserver );
    }  
    if( offset ) {
      this.marvelService.getCharacters( name, offset )      
        .subscribe( myObserver );
    }
  }

  nextPage( name: string=undefined ): void {
    let proposedOffsetIndex = this.offsetIndex + this.offsetDistance;

    if( proposedOffsetIndex <= this.totalItemsReturned ) {
      this.getCharacters( name, proposedOffsetIndex );            
    }
    else {
      console.log("CANNOT go to Next page, you are on last page");
    }    
  }

  prevPage( name: string=undefined ): void {
    let proposedOffsetIndex = this.offsetIndex - this.offsetDistance;

    if( proposedOffsetIndex >= 0 ){      
      this.getCharacters( name, proposedOffsetIndex );
    }
    else {
      console.log("CANNOT go to Previous page, you are on the first page");
    }    
  }

  clearSearch(): void {
    //reset search input if needed
    this.getCharacters();
  }

  ngOnInit() {
    this.getCharacters();
  }

}
