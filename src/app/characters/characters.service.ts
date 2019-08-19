import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Character } from '../character/character';
import { MarvelApiCallService } from '../marvel-api-call.service';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private characters: Observable<Character[]>;

  constructor(
    private marvelAPI: MarvelApiCallService
  ) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => { //Promise<T>
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCharacters(): Observable<any> { //Character[]
    console.log("characters.service: getCharacters() this.characters are: ", this.characters);

    if( this.characters === undefined) {
      console.log("characters UNDEFINED");
      this.characters = this.marvelAPI.getCharacters();      
    }

    return this.characters;
  }

}
