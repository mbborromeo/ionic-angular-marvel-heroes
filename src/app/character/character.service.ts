import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Character } from '../character/character';
import { MarvelApiCallService } from '../marvel-api-call.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private character: Observable<Character>;

  constructor(
    private marvelAPI: MarvelApiCallService,
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

  getCharacter( id: number ): Observable<any> {
    console.log("character.service: getCharacter()");

    if( this.character === undefined) {
      console.log("character UNDEFINED");
      this.character = this.marvelAPI.getCharacter( id );      
    }

    console.log("character value: ", this.character);

    return this.character;
  }
}
