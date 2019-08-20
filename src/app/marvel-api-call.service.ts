import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Character } from './character/character';
import { Comic } from './comic/comic';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import md5 from 'crypto-js/md5';

/*
interface MarvelResponse {
  data: {};
  readonly items: Character[];
}
*/

@Injectable({
  providedIn: 'root'
})
export class MarvelApiCallService {

  constructor(
    private http: HttpClient
  ) { }

  //Auth signing: https://github.com/brix/crypto-js  
  private publicKey = '071a199f0748e4784ec9d1a918a6c22a';
  private privateKey = '5a074608a129b10cb01e080985b97624e4b46187';  
  private ts = new Date().getTime();
  private hash = md5( this.ts + this.privateKey + this.publicKey );
  private marvelAPIBase = 'https://gateway.marvel.com:443/v1/public/';
  
  private limit: number = 20; //limit search results
  //private pageOffset: number = 0;
  //private authSign;
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCharacters( offset?: number ): Observable<Character[]> {
    let marvelAPIQueryString;

    if( !offset ){
      marvelAPIQueryString = `${ this.marvelAPIBase }characters?limit=${ this.limit }&ts=${ this.ts }&apikey=${ this.publicKey }&hash=${ this.hash }`;
    }
    if( offset ){
      marvelAPIQueryString = `${ this.marvelAPIBase }characters?limit=${ this.limit }&offset=${ offset }&ts=${ this.ts }&apikey=${ this.publicKey }&hash=${ this.hash }`;
    }

    return this.http.get<any>(marvelAPIQueryString)
      .pipe(
        tap( payload => console.log('fetched characterS data is ', payload), ),
        catchError(this.handleError<Character[]>('getCharacters', [])
      )
    );
  }

  getCharacter( id: number ): Observable<Character> {
    let marvelAPIQueryString = `${ this.marvelAPIBase }characters/${ id }?ts=${ this.ts }&apikey=${ this.publicKey }&hash=${ this.hash }`;

    return this.http.get<any>(marvelAPIQueryString)
      .pipe(
        tap( payload => console.log('fetched character data is ', payload), ),
        map( payload => payload.data.results[0] ),         
        catchError(this.handleError<Character>('getCharacter')
      )
    );
  }

  searchCharacters( name: string, offset?: number ): Observable<Character[]> {    
    let marvelAPIQueryString;
    
    if( !offset ){
      marvelAPIQueryString = `${ this.marvelAPIBase }characters?nameStartsWith=${ name }&limit=${ this.limit }&ts=${ this.ts }&apikey=${ this.publicKey }&hash=${ this.hash }`;
    }
    /*
    if( offset ) {
      marvelAPIQueryString = `${ this.marvelAPIBase }characters?nameStartsWith=${ name }&limit=${ this.limit }&offset=${ offset }&ts=${ this.ts }&apikey=${ this.publicKey }&hash=${ this.hash }`;
    }
    */

    return this.http.get<any>(marvelAPIQueryString)
      .pipe(
        tap( payload => console.log('fetched searchCharacters data is ', payload), ),
        catchError(this.handleError<Character[]>('searchCharacters', [])
      )
    );
  }

  getComicsOfCharacter( id: number ): Observable<Comic[]> {
    let marvelAPIQueryString = `${ this.marvelAPIBase }characters/${ id }/comics?limit=${ this.limit }&ts=${ this.ts }&apikey=${ this.publicKey }&hash=${ this.hash }`;
    
    return this.http.get<any>(marvelAPIQueryString)
      .pipe(
        tap( payload => console.log('fetched getComicsOfCharacter data is ', payload), ),
        //map( payload => payload.data.results ),
        catchError(this.handleError<Comic[]>('getComicsOfCharacter', [])
      )
    );
  }

  getComic( id: number ): Observable<Comic> {
    let marvelAPIQueryString = `${ this.marvelAPIBase }comics/${ id }?ts=${ this.ts }&apikey=${ this.publicKey }&hash=${ this.hash }`;

    return this.http.get<any>(marvelAPIQueryString)
      .pipe(
        tap( payload => console.log('fetched getComic data is ', payload), ),
        map( payload => payload.data.results[0] ),
        catchError(this.handleError<Comic>('getComic')
      )
    );
  }
}
