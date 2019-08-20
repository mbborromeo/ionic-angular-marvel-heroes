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
  //private characters: Character[]; //Observable<Character[]>
  private marvelData: MarvelData; //need this to get .data.count and .data.offset, may need to use .data.results
  
  constructor( private marvelService: MarvelApiCallService ) { }

  getCharacters(): void {    
    //object to help debug subscribe
    //this.characters = []; //reset    
    this.loading = true;

    const myObserver = {
      next: (res) => {
        //this.characters = res.data.results;
        this.marvelData = res;        

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

    this.marvelService.getCharacters()      
      .subscribe( myObserver );
  }

  searchCharacters( name: string ): void {
    if( name ) {
      this.marvelData.data.results = []; //reset
      this.loading = true;

      const myObserver = {
        next: (res) => {
          this.marvelData.data.results = res;

          if( this.marvelData.data.results === undefined) {
            console.log("characters UNDEFINED");      
          }
        },
        error: (err) => console.error('Observer got an error: ' + err),
        complete: () => {
          console.log("this.marvelData.data.results when searchCharacters complete: ", this.marvelData.data.results);
          this.loading = false;    
        },
      };

      this.marvelService.searchCharacters( name )      
        .subscribe( myObserver );
    }
    else {
      console.log("search term is blank!");
    }
  }

  clearSearch(): void {
    //reset search input

    this.getCharacters();
  }

  ngOnInit() {
    this.getCharacters();
  }

}
